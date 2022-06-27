import React, { useContext } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { IconButton } from '@mui/material'
import { getCurrentPuzzleNumber } from '../helpers'
import wordContext from '../contexts/word-context'

const ShareButton = () => {
  const {
    results: { guessResults: r, hardMode },
    puzzleNumber,
  } = useContext(wordContext)
  
  const data = getData(r, hardMode, puzzleNumber)

  return r.length && navigator.canShare?.(data)
    ? <IconButton
        onClick={() =>
          navigator.share(data)
            .then(() => l('success'))
            .catch(e => l(e.message))
        }
      >
        <ShareIcon />
      </IconButton>
    : null
}

export default ShareButton

const getData = (r, hardMode, puzzleNumber) => ({
  text: `Wordle ${puzzleNumber} ${
    r.length > MAX_GUESSES ? 'X' : r.length
  }/${MAX_GUESSES}${
    hardMode ? '*' : ''
  }

${r.slice(0, 6).map(gr => gr[1].join('')).join('\n')}

Played by AI by Bethany Hitch`,
  url: 'https://dxdt.me/wordle-ai',
})
