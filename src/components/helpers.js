import moment from 'moment'

const WORDLE_DAY_0 = moment('2022-02-02')
  .subtract(228, 'days')
  
export const WORDLE_PUZZLE_NUMBER = 
  moment().diff(WORDLE_DAY_0, 'days')