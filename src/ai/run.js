import { printMethods, tryWord } from './helpers';
import Processor from './processor';

const run = (
  todaysWord,
  options = {}
) => {
  const {
    random = false,
    preferDecisive = false,
    maxGuesses = MAX_GUESSES,
    print = true,
    onResult = () => {},
    decisiveThreshold = 2,
    isPuzzleWord = false,
    doShuffle = true,
    forceHardMode = false,
    excludePrevious,
    wholeDictionary = false,
    tryToLose = false,
  } = options

  const { l, lj, ljs, lje, ljn } = printMethods(print)

  let {
    dictionaries,
    nextTry = null,
    processor = null,
    anyFirstWord = false,
  } = options

  if (wholeDictionary) {
    dictionaries[0] = dictionaries[1].slice()
  } else if (isPuzzleWord && excludePrevious) {
    dictionaries = [
      dictionaries[0].slice(
        dictionaries[0].indexOf(todaysWord) - 1
      ),
      dictionaries[1],
    ]
  }

  let hardMode = true

  const wordLen = todaysWord.length

  todaysWord = todaysWord.toUpperCase()

  const tw = tryWord.bind(null, todaysWord)

  const SUCCESS = GREEN.repeat(wordLen)
  const guessResults = []

  let lucky = false
  let luckyAt = Infinity

  l('Word: ' + todaysWord)

  processor = processor || Processor.init(
    dictionaries,
    isPuzzleWord,
    wordLen,
    maxGuesses
  )

  let words = processor.words
  let padLength = 0

  let shuffled = false;
  l('Guesses:')

  for (let i = 0; ; i++) {
    i === maxGuesses && l(
      '-'.repeat(wordLen * 3 + 2) + ' | Failed ☠️'
    )

    anyFirstWord = anyFirstWord && !i

    const useDecisive =
      !nextTry &&
      !random &&
      !anyFirstWord &&
      !forceHardMode &&
      !tryToLose &&
      i < maxGuesses - 1 && (
        preferDecisive
          ? words.length > 1
          : processor.unknown <= decisiveThreshold &&
            words.length > maxGuesses - i
      )

    if (anyFirstWord) {
      processor.sortByWordRank(true)
      hardMode = dictionaries[0]
        .includes(Processor.allWords5[0])
    }

    const word =
      nextTry ? nextTry :
      useDecisive ? processor.getDecisiveWord(i) :
      random ? words.chooseRandom() :
      anyFirstWord ? Processor.allWords5[0] :
      tryToLose ? words.last :
      words[0]

    nextTry = null

    if (useDecisive) {
      lucky = false
      luckyAt = Infinity
      shuffled = false
      hardMode = hardMode && words.includes(word)
    }

    if (!word) {
      throw new Error(
        'No word returned, likely from getDecisiveWord()'
      )
    }

    processor.guessed.add(word)

    const result = tw(word);
    guessResults.push([ word, result ])

    if (result.join('') === SUCCESS) {
      ljs(
        word,
        SUCCESS,
        '|',
        i < maxGuesses
          ? 'Success!'
          : 'Done',
        lucky
          ? i < maxGuesses
            ? 'lucky'
            : 'unlucky'
          : ''
      )

      if (words.length < 21) {
        l(words)
      }

      return {
        guessResults,
        lucky,
        luckyAt,
        wordsLeft: words.length - 1,
        hardMode,
      }
    }

    words = processor.next(word, result)
    guessResults.last.push(words.length)

    onResult({
      guessResults,
      lucky,
      wordsLeft: words.length,
      hardMode,
    })

    !i && (padLength = words.length.toString().length)

    ljs(
      word,
      result.join(''),
      '|',
      words.length.toString().padStart(padLength),
      words.length === 1 ? 'word' : 'words',
      'left'
    )

    if (!words.includes(todaysWord)) {
      l('Removed today\'s word 😵')
      throw new Error('Removed today\'s word 😵')
    }

    if (!words.length) {
      l('No words? 🤨')
      throw new Error('No words? 🤨')
    }

    if (!shuffled && processor.unknown === 1) {
      shuffled = true
      if (words.length >= maxGuesses - i) {
        lucky = true
        luckyAt = Math.min(luckyAt, i + 1)
      }

      doShuffle && words.shuffle()
    } else if (!shuffled) {
      words = processor.sortByWordRank()
    }
  }
};

export default run;

export const runAll = dictionaries => {
  const words = dictionaries[0]
    //.slice(Math.floor(.55 * dictionaries[0].length))

  const fivePercent = words.length / 20
  let next = fivePercent
  let comp = 0
  const runs = words
    .map((w, i) => {
      if (i > next) {
        while (i > next) {
          next += fivePercent
          comp += 5
        }

        l(`${comp}%`)
      }

      return [
        w,
        run(w, {
          dictionaries,
          print: false,
          doShuffle: false,
          isPuzzleWord: true,
        })
      ]
    })

  const nums = runs.map(([w, r]) => {
    const num = r.guessResults.length

    if (r.lucky) {
      l(`${w} ${num}/6`)
      let luckWords = num - r.luckyAt + r.wordsLeft
      let loseNum = r.luckyAt - 6 + luckWords
      let winNum = 6 - r.luckyAt

      l(`Win%: ${winNum / (winNum + loseNum) * 100}`)
    } else if (num > 6) {
      l(`${w} ${num}/6`)
      l('Deterministic failure')
    }

    return num
  })

  const luckOrFail =
    runs.filter(([, r], i) =>
      r.lucky || nums[i] > 6
    ).length

  l('')
  l(`Failed: ${nums.filter(n => n > 6).length}`)
  l(`Lucky or failed: ${luckOrFail}`)
  l(`Win%: ${
    (nums.length - luckOrFail) / nums.length * 100
  }`)
  l(`Max: ${Math.max(...nums)}`)
  l(`Mean: ${Math.avg(nums)}`)
}