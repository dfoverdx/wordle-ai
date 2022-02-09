import moment from 'moment'

export const WORDLE_DAY_0 =
  moment('2022-02-02').subtract(228, 'days')

export const CURRENT_PUZZLE_NUMBER =
  moment().diff(WORDLE_DAY_0, 'days');

export const getPuzzleNumber = (puzzleWords, word) => {
  const puzzleWordIdx = puzzleWords.indexOf(word)
  
  if (puzzleWordIdx === -1) {
    return null
  }
  
  const puzzleDay =
    WORDLE_DAY_0.clone().add(puzzleWordIdx, 'days')
  const pastPuzzle = moment().endOf('day') >= puzzleDay
  
  return pastPuzzle && puzzleWordIdx
}