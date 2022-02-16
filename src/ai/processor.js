import _ from 'lodash';
import { getLetterCounts, newFilledArray, printMethods } from '../helpers';
import run from './run';

export default class Processor {
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

  static allWords = []
  static wordLen = WORD_LEN

  static get allWords5() {
    return this.allWords[this.wordLen]
  }

  static set allWords5(value) {
    return this.allWords[this.wordLen] = value
  }

  static init(
    [puzzleWords, allWords],
    isPuzzleWord,
    wordLen = WORD_LEN,
    maxGuesses = MAX_GUESSES
  ) {
    this.wordLen = wordLen
    this.allWords5 =
      this.allWords5 || [...allWords]

    const dict = isPuzzleWord
      ? puzzleWords
      : this.allWords5

    const p = new this(
      [...dict],
      wordLen,
      maxGuesses
    )

    p.sortByWordRank()
    return p
  }

  get l() {
    return printMethods(this.print > 0).l
  }

  sortByWordRank(sortAll = false) {
    this._sortLetterFrequency(sortAll)
    this._sortLetterPerPositionFrequency(sortAll)
    return this._sortUniqueLetters(
      sortAll ? Processor.allWords5 : this.words
    )
  }

  get unknown() {
    return this.known.filter(c => !c).length
  }

  next(word, result) {
    let { words, known, unknown, wordLen } = this

    const arr = result.map((c, i) => [word[i], c])

    arr.forEach(([c, r], i) => {
      if (r === GREEN) {
        known[i] = c
        words = words.filter(w => w[i] === c)
      } else if (r === GRAY) {
        words = words.filter(w => w[i] !== c)
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

    const knownCounts = getLetterCounts(known)
    const yellowGreenCounts = getLetterCounts(
      arr
        .filter(x => x[1] === YELLOW || x[1] == GREEN)
        .map(x => x[0])
    )

    arr.forEach(([c, r], i) => {
      if (r !== YELLOW) {
        return
      }

      words = words.filter(w => w[i] !== c)

      if (!knownCounts[c]) {
        words = words.filter(w => w.includes(c))
      } else if (yellowGreenCounts[c] > knownCounts[c]) {
        this.decisiveGuesses.delete(c)

        words = words.filter(w => {
          for (let i = 0; i < knownCounts[c]; i++) {
            w = w.replace(c, '_')
          }

          return w.includes(c)
        })
      }
    })

    for (let i = 0; i < wordLen; i++) {
      if (known[i]) {
        continue;
      }

      if (words.every(w => w[i] === words[0][i])) {
        known[i] = words[0][i]
      }
    }

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
    const allWords = Processor.allWords5

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

    let decisive = allWords
      .filter(w =>
        !guessed.has(w) &&
        w.some(c => possibleLetters.has(c))
      )
      .map(w => [w, countUsefulLetters(w)])
      .filter(x => x[1])
      .sort((a, b) => b[1] - a[1])
      .filter((x, _, a) => x[1] === a[0][1])
      .map(x => x[0])

    if (SHUFFLE_DECISIVE) {
      decisive.shuffle()
    }

    if (GO_BALLS_DEEP) {
      if (words.length < 15) {
        decisive = decisive
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
    }

    const word = decisive[0]

    if (!word) {
      return null
    }

    word.forEach(c => decisiveGuesses.add(c))
    return word
  }

  _sortLetterFrequency(sortAll = false) {
    const { words } = this
    const allWords = Processor.allWords5
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

    const nextWords =
      (sortAll ? allWords : words)
        .map(w => [w, calcRank(w)])
        .sort((a, b) => a[1] - b[1])
        .map(x => x[0])

    if (sortAll) {
      return Processor.allWords5 = nextWords
    } else {
      return this.words = nextWords
    }
  }

  _sortLetterPerPositionFrequency(sortAll = false) {
    const { words, wordLen } = this
    const allWords = Processor.allWords5
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

    const nextWords =
      (sortAll ? allWords : words)
        .map(w => [w, calcRank(w)])
        .sort((a, b) => a[1] - b[1])
        .map(x => x[0])

    if (sortAll) {
      return Processor.allWords5 = nextWords
    } else {
      return this.words = nextWords
    }
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
}

const calcRanks = counts =>
  Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map((e, i) => [e[0], i])
  )
