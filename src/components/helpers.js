import moment from 'moment'

export const WORDLE_DAY_0 =
  moment('2022-02-02').subtract(228, 'days')

export const getPuzzleNumber = (puzzleWords, word) => {
  const puzzleWordIdx = puzzleWords.indexOf(word)
  const puzzleDay =
    WORDLE_DAY_0.add(puzzleWordIdx, 'days')
  const pastPuzzle = moment().endOf('day') >= puzzleDay
  
  return pastPuzzle && puzzleWordIdx
}