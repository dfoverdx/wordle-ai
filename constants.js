const moment = require('moment')

const RUNNING_ON_MOBILE = process.platform === 'ios'
const RUNNING_ON_DESKTOP = !RUNNING_ON_MOBILE

module.exports = {
  WORD_LEN: 5,
  MAX_GUESSES: 6,
  GREEN: '🟩',
  YELLOW: '🟨',
  GRAY: '⬜️',
  RUN_ALL: false,
  GO_BALLS_DEEP: false,
  SHUFFLE_DECISIVE: false,
  RUNNING_ON_MOBILE,
  RUNNING_ON_DESKTOP,
}