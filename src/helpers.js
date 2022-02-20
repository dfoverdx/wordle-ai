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

const getCurrentPuzzleNumber = () =>
  moment().endOf('day').diff(_WORDLE_DAY_0, 'days')

module.exports = {
  get WORDLE_DAY_0() {
    return _WORDLE_DAY_0.clone()
  },
  getCurrentPuzzleNumber,
  getPuzzleNumber,
}