import { createContext } from 'react'

const wordContext = createContext({
  word: '',
  puzzleWords: [],
  allWords: [],
  puzzleNumber: null,
  results: {
    guessResults: []
  }
})

export default wordContext