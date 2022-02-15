const moment = require('moment')

const WORDLE_DAY_0_TIME = moment('2022-02-02')
  .subtract(228, 'days')
  .toDate()
  .getTime()

module.exports = {
  WORD_LEN: 5,
  MAX_GUESSES: 6,
  GREEN: '🟩',
  YELLOW: '🟨',
  GRAY: '⬜️',
  RUN_ALL: false,
  GO_BALLS_DEEP: false,
  SHUFFLE_DECISIVE: false,
  WORDLE_DAY_0_TIME,
}