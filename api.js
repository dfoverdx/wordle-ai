require('./src/extensions')
const fs = require('fs')
const path = require('path')

const { Router } = require('express')

// global.WORDLE_DAY_0_TIME =
//   require('./constants').WORDLE_DAY_0_TIME

// const h = require('./src/helpers')

// const dataPath = path.resolve(__dirname, 'data')
// const puzzleWordsPath =
//   path.join(dataPath, 'puzzle-words.txt')
// const allWordsPath =
//   path.join(dataPath, 'all-words.txt')

const router = module.exports = new Router()
  .post('/today/:word', (req, res) => {
    const cur = fs.readFileSync(puzzleWordsPath)
      .toString()
      .splitNL()
      .
    fs.appendFileSync(
      puzzleWordsPath,
      '\n' + req.params.word
    )
  })