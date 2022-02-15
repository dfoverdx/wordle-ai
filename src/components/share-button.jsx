import React from 'react'
import { IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import { CURRENT_PUZZLE_NUMBER } from './helpers'

const ShareButton = ({ results: { guessResults: r, } }) =>
  r.length && navigator.canShare(getData(r))
    ? <IconButton
        onClick={() =>
          navigator.share(getData(r))
            .then(() => l('success'))
            .catch(e => l(e.message))
        }
      >
        <ShareIcon />
      </IconButton>
    : null

export default ShareButton

const getData = r => ({
  text: `Wordle ${CURRENT_PUZZLE_NUMBER} ${
    r.length > MAX_GUESSES ? 'X' : r.length
  }/6

${r.slice(0, 6).map(gr => gr[1].join('')).join('\n')}

Played by AI by Bethany Hitch`,
})