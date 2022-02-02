import React from 'react'
import { IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import styled from '@emotion/styled'
import { WORDLE_PUZZLE_NUMBER } from './helpers'

const ShareButton = styled(({
  className,
  results: {
    guessResults,
  }
}) =>
  <IconButton
    className={className}
    onClick={() => {
      try {
      navigator.share({
        text: `Wordle ${WORDLE_PUZZLE_NUMBER} ${
          guessResults.length > 6 
            ? 'X' 
            : guessResults.length
        }/6

${guessResults.slice(0, 6).map(gr => gr[1].join('')).join('\n')}

Played by AI by Bethany Hitch`,
      })
        .then(() => l('success'))
        .catch(e => l(e.message))
      } catch (e) {
        l(e.message)
      }
    }}
  >
    <ShareIcon />
  </IconButton>
)`
  ${p => 
    !(
      navigator.share && 
      p.results.guessResults.length
    ) && { display: 'none' }
  }
`

export default ShareButton