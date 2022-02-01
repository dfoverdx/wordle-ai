import { 
  WORD_LEN,
  MAX_GUESSES,
  GRAY,
  BLACK,
  YELLOW,
  GREEN,
} from './constants'
import _ from 'lodash'

const goBallsDeep = false

export const run = (
  todaysWord,
  options = {}
) => {
  const {
    random = false,
    preferDecisive = false,
    maxGuesses = MAX_GUESSES,
    print = true,
    dictionary = [],
    onResult = () => {}
  } = options
  
  const { l, lj, ljs, lje } = printMethods(print)
  
  let {
    nextTry = null,
    processor = null,
  } = options

  const wordLen = todaysWord.length
  
  l.count = 0
  todaysWord = todaysWord.toUpperCase()

  const tw = tryWord.bind(null, todaysWord)
  const SUCCESS = GREEN.repeat(wordLen)
  const guessResults = []
  
  let lucky = false
  
  l('Word: ' + todaysWord)
  
  processor = processor || Processor.init(
    wordLen,
    maxGuesses,
    dictionary
  )
  
  let words = processor.words
  let PAD = 0
  
  if (!words.includes(todaysWord)) {
    l('Word not in dictionary 😵‍💫')
    return {} // addAndRerun(todaysWord)
  }

  let shuffled = false;
  l('Guesses:')
  
  for (let i = 0; ; i++) {
    i === maxGuesses && l(
      '-'.repeat(wordLen * 3 + 2) + ' | Failed ☠️'
    )
    
    const useDecisive =
      !nextTry &&
      i < maxGuesses - 1 && (
        preferDecisive
          ? words.length > 1
          : processor.unknown <= 2 &&
            words.length > maxGuesses - i
      )

    let word = nextTry ||
      (useDecisive
        ? processor.getDecisiveWord(i)
        : random
          ? words.chooseRandom()
          : words[0])
    
    nextTry = null
    
    lucky = !useDecisive && lucky
    if (!word) {
      word = words.chooseRandom()
      lucky = true
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
      
      return {
        guessResults,
        lucky,
        wordsLeft: words.length - 1,
      }
    }
    
    onResult({
      guessResults,
      lucky,
      wordsLeft: words.length - 1,
    })
  
    words = processor.next(word, result)
    !i && (PAD = words.length.toString().length)
    
    ljs(
      word,
      result.join(''),
      '|',
      words.length.toString().padStart(PAD),
      words.length === 1 ? 'word' : 'words',
      'left'
    )
    
    if (!words.includes(todaysWord)) {
      l('Removed today\'s word 😵')
    }
    
    if (!words.length) {
      l('No words? 🤨')
      break
    }

    if (!shuffled && processor.unknown === 1) {
      shuffled = true
      if (words.length >= maxGuesses - i) {
        lucky = true
      }
      
      words.shuffle()
    } else if (!shuffled) {
      words = processor.sortByWordRank()
    }
  }
};

export const tryWord = (todaysWord, guess) => {
  if (guess === todaysWord) {
    return newFilledArray(
      todaysWord.length,
      () => GREEN
    )
  }
  
  const counts = getLetterCounts(todaysWord)
  
  return guess
    .map((c, i) => {
      if (c === todaysWord[i]) {
        counts[c]--
        return GREEN
      } else {
        return c
      }
    })
    .map((c, i) => {
      if (c === GREEN) {
        return c
      }
      
      if (counts[c]) {
        counts[c]--
        return YELLOW
      }
      
      return GRAY
    })
}

const getLetterCounts = w => {
  const counts = {}
  w.forEach(c => counts[c] = (counts[c] || 0) + 1)
  return counts
}

export class Processor {
  constructor(
    words, 
    wordLen = WORD_LEN,
    maxGuesses = MAX_GUESSES
  ) {
    this.words = words
    this.known = newFilledArray(wordLen)
    this.wordLen = wordLen
    this.maxGuesses = maxGuesses
    this.turn = 1
    this.guessed = new Set()
    this.decisiveGuesses = new Set()
    this.print = 3
  }
  
  static words = []
  
  static init(
    wordLen = WORD_LEN,
    maxGuesses = MAX_GUESSES,
    dictionary = []
  ) {
    if (this.words[wordLen]) {
      return new this(
        [...this.words[wordLen]],
        wordLen,
        maxGuesses
      )
    }
    
    const p = new this(
      dictionary.length
        ? dictionary
        : getNLetterWords(wordLen),
      wordLen,
      maxGuesses
    )
    
    p.sortByWordRank()
    this.words[wordLen] = [...p.words]
    return p
  }
  
  get l() {
    return printMethods(this.print > 0).l
  }
  
  sortByWordRank(slow = false) {
    slow ? this._sortSlow() : this._sortFast()
    return this.words
  }
  
  get unknown() {
    return this.known.filter(c => !c).length
  }
  
  next(word, result) {
    let { words, known, unknown } = this
    
    const arr = result.map((c, i) => [word[i], c])

    arr.forEach(([c, r], i) => {
      if (r === GREEN) {
        known[i] = c
        words = words.filter(w => w[i] === c)
      }
    })

    const yellows = new Set(arr
      .filter(x => x[1] === YELLOW)
      .map(x => x[0])
    )
    
    const noneOfThese =
      arr
        .filter(([c, r], i) =>
          r === GRAY &&
          !yellows.has(c) &&
          !arr.slice(i + 1)
            .map(x => x[0])
            .filter((_, i) => !known[i])
            .includes(c)
        )
        .map(x => x[0])

    words = words.filter(w => 
      !noneOfThese.some(c => 
        this.getUnknown(w).includes(c)
      )
    )

    arr.forEach(([c, r], i) => {
      if (r !== YELLOW) {
        return
      }
      
      words = words
        .filter(w => w[i] !== c)
        .filter(w => w.includes(c))
    })

    this.words = words
    return words
  }
  
  getUnknown(word) {
    return word.filter((_, i) => !this.known[i])
  }
  
  getDecisiveWord(turn) {
    const { 
      words, 
      maxGuesses, 
      guessed, 
      decisiveGuesses,
      wordLen,
      known,
      l,
    } = this

    const knownCounts = getLetterCounts(known)
    const allWords = Processor.words[wordLen]
    
    if (turn >= maxGuesses - 1) {
      throw 'Cannot get remaining letters on last guess'
    }
    
    const possibleLetters = new Set(
      words.flatMap(w => this.getUnknown(w))
    )
    
    const countUsefulLetters = w =>
      new Set(w.filter(c =>
        possibleLetters.has(c) &&
        !decisiveGuesses.has(c) &&
        getLetterCounts(w)[c] > (knownCounts[c] || 0)
      )).size
    
    let decisiveValues = allWords
      .filter(w =>
        !guessed.has(w) &&
        w.some(c => possibleLetters.has(c))
      )
      .map(w => [w, countUsefulLetters(w)])
      .filter(x => x[1])
      .sort((a, b) => b[1] - a[1])
      .filter((x, _, a) => x[1] === a[0][1])
      .map(x => x[0])
      
    if (words.length < 15 && goBallsDeep) {
      decisiveValues = decisiveValues
        .map((g, i) => {
          const val = words.reduce((a, w) => {
            const p = _.cloneDeep(this);
            p.print = this.print - 1
            
            const {
              guessResults,
              lucky,
              wordsLeft
            } = run(w, { 
              processor: p, 
              print: false,
              nextTry: g
            })
            
            return a + lucky ? 1 / wordsLeft : 1
          }, 0)

          return [ g, val ]
        })
        .sort((a, b) => b[1] - a[1])
        .map(x => x[0])
    }
    
    const word = decisiveValues[0]

    if (!word) {
      return null
    }
    
    word.forEach(c => decisiveGuesses.add(c))
    return word
  }
  
  _sortFast() {
    this._sortLetterFrequency()
    this._sortLetterPerPositionFrequency()
    return this._sortUniqueLetters()
  }
  
  _sortLetterFrequency() {
    const { words } = this
    const counts = {}

    words.forEach(w =>
      w.forEach(
        c => counts[c] = (counts[c] || 0) + 1
      )
    )
    
    const ranks = calcRanks(counts)

    const calcRank = w => 
      w.reduce(
        (a, c) => a + ranks[c],
        0
      )

    return this.words = words
      .map(w => [w, calcRank(w)])
      .sort((a, b) => a[1] - b[1])
      .map(x => x[0])
  }
  
  _sortLetterPerPositionFrequency() {
    const { words, wordLen } = this
    const counts = 
      newFilledArray(wordLen, () => ({}))
    
    words.forEach(w => w.forEach((c, i) =>
      counts[i][c] = (counts[i][c] || 0) + 1
    ))
    
    const ranks = counts.map(calcRanks)
    const calcRank = w => w.reduce(
      (a, c, i) => a + ranks[i][c],
      0
    )
    
    return this.words = words
      .map(w => [w, calcRank(w)])
      .sort((a, b) => a[1] - b[1])
      .map(x => x[0])
  }
  
  _sortUniqueLetters(words = this.words) {
    const unique = new Set(
      words.filter(w =>
        !w.some((l, i, a) => a.includes(l, i + 1))
      )
    )
    
    const uniqueCompValue =
      w => unique.has(w) ? -1 : 1

    return words.sort((a, b) => 
      uniqueCompValue(a) - uniqueCompValue(b)
    )
  }
  
  _sortSlow() {
    let { words, known } = this;
    
    const calcRulesOut = word => {
      const notWord = words.filter(w => w !== word)
      const tmp = new Processor([ ...notWord ])
      const reset = () => {
        tmp.words = [ ...notWord ]
        tmp.known = [ ...known ]
      }

      return notWord.reduce((a, w) => {
        reset()
        return a + 
          words.length - 
          tmp.next(word, tryWord(w, word)).length
      }, 0)
    }
    
    const rulesOut = Object.fromEntries(
      words.map(w => [w, calcRulesOut(w)])
    )
    
    words.sort((a, b) => rulesOut[b] - rulesOut[a])
    return words
  }
}

const noop = () => {}
noop.x = () => {}
export const printMethods = print => print
  ? { l, lj, ljs, lje }
  : { l: noop, lj: noop, ljs: noop, lje: noop }

export const fArr = x => Array.from(x)
export const newFilledArray = (n, cb = () => null) =>
  new Array(n).fill().map(cb)

//const getNLetterWords = async (n = WORD_LEN) => {
//  wPath = wordsPath(n)
//  if (fs.existsSync(wPath)) {
//    return fs.readFileSync(wPath)
//      .toString()
//      .toUpperCase()
//      .split(/\r?\n/)
//  }
//    
//  const text = fs.readFileSync(dictPath)
//    .toString()
//    .toUpperCase()
//  const regex = new RegExp(`^[A-Z]${n}$`)
//  const filtered = text
//    .split(/\r?\n/)
//    .filter(s => regex.test(s))
//      
//  fs.writeFileSync(wPath, filtered.join('\n'))
//  return filtered
//}
  
//const addAndRerun = (word, options) => {
//  const text = fs.readFileSync(dictPath)
//    .toString()
//    .toUpperCase()
//    
//  fs.writeFileSync(
//    dictPath, 
//    text.split(/\r?\n/g)
//      .concat(word.toUpperCase())
//      .sort()
//      .join('\n')
//  )
//    
//  delete Processor.words
//  fs.unlinkSync(wordsPath(word.length))
//  return run(word, options)
//}

const calcRanks = counts =>
  Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map((e, i) => [e[0], i])
  )

/*
const stats = async (
  wordLen = WORD_LEN,
  maxGuesses = MAX_GUESSES
) => {
  await Processor.init(wordLen, maxGuesses)
  const words = Processor.words[wordLen]
  const results = []
  let luckyCount = 0
  
  for (let i = 0; i < 5; i++) {
    const word = words.chooseRandom()
    l(word)
    const [g, l] = await run(
      word,
      { print: false }
    )
    
    results.push(g)
    l && luckyCount++
  }
    
  const sum = arr => arr.reduce((a, n) => a + n, 0)
  const avg = arr => avg(arr) / arr.length
  const roundPercent = (n, d = 3) =>
    `${Math.roundTo(n, d) * 100}%`

  const histo = results.reduce((a, n) =>
    (++a[n], a),
    new Array(wordLen + 1).fill(0)
  )
    
  const { wins, losses } = results.reduce((a, n) =>
    (++a[n <= maxGuesses ? 'wins' : 'losses'], a),
    { wins: 0, losses: 0 }
  )
    
  l(Math.roundTo(avg(r), 3))
  l(`Wins:   ${wins}`)
  l(`Losses: ${losses}`)
  l(`Ratio:  ${Math.roundTo(wins / losses)}`)
  l(`Win%:   ${roundPercent(wins / r.length)}`)
  l(`Lose%:  ${roundPercent(losses / r.length)}`)
  l(`Lucky%: ${roundPercent(luckyCount / r.length)}`)
    
  l('\nDistrobution:')
  l(Object.entries(histo)
    .map(x => x.join(': '))
    .join('\n')
  )
}
*/

export const list = (word, last = Infinity) => {
  const words = loadWordleHistory()
  if (word) {
    addWordToHistory(word, words)
  }
  
  for (const w of words.slice(-last)) {
    lje(
      w, ': ',
      run(w, { 
        print: last <= 3, 
        addToHistory: false,
      })
    )
  }
}

//const loadWordleHistory = () => {
//  if (!fs.existsSync(historyPath)) {
//    // hopefully never gets here
//    saveWordleHistory([])
//  }
//  
//  return fs.readFileSync(historyPath)
//    .toString()
//    .split(/\r?\n/)
//}

//const addWordToHistory = (word, words) => {
//  word = word.toUpperCase()
//  words = words || loadWordleHistory()
//  words = words.map(w => w.toUpperCase())
//  
//  if (!words.includes(word)) {
//    words.push(word)
//    saveWordleHistory(words)
//  }
//}
//
//const saveWordleHistory = words =>
//  fs.writeFileSync(historyPath, words.join('\n'))

//export const history = {
//  load: loadWordleHistory,
//  save: saveWordleHistory,
//  addWord: addWordToHistory,
//}