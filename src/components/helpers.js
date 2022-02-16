const moment = require('moment')

const _WORDLE_DAY_0 = moment(WORDLE_DAY_0_TIME)

const getPuzzleNumber = (puzzleWords, word) => {
  const puzzleWordIdx = puzzleWords.indexOf(word)
  
  if (puzzleWordIdx === -1) {
    return null
  }
  
  const puzzleDay =
    _WORDLE_DAY_0.clone().add(puzzleWordIdx, 'days')
  const pastPuzzle = moment().endOf('day') >= puzzleDay
  
  return pastPuzzle && puzzleWordIdx
}

module.exports = {
  get _WORDLE_DAY_0() {
    return WORDLE_DAY_0.clone()
  },
  get CURRENT_PUZZLE_NUMBER() {
    return moment().diff(WORDLE_DAY_0, 'days')
  },
  getPuzzleNumber,
}