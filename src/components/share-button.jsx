import React from 'react'
import { IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import styled from '@emotion/styled'
import { WORDLE_PUZZLE_NUMBER } from './helpers'

// TODO: make this work
const ShareButton = styled(({
  className,
  results: {
    guessResults,
  }
}) =>
  <IconButton
    className={className}
    onClick={() => {
      navigator.share({
        text: `Wordle ${WORDLE_PUZZLE_NUMBER} ${guessResulrs.length}/6

${guessResults.map(gr => gr.result.join('')).join('\n')}

Played by AI by Bethany Hitch`,
      })
        .then(() => l('success'))
        .catch(e => l(e.message))
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