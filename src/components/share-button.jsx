import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import { getCurrentPuzzleNumber } from '../helpers';

const ShareButton = ({ 
  results: { guessResults: r, hardMode },
}) =>
  r.length && navigator.canShare(getData(r, hardMode))
    ? <IconButton
        onClick={() =>
          navigator.share(getData(r, hardMode))
            .then(() => l('success'))
            .catch(e => l(e.message))
        }
      >
        <ShareIcon />
      </IconButton>
    : null

export default ShareButton

const getData = (r, hardMode) => ({
  text: `Wordle ${getCurrentPuzzleNumber()} ${
    r.length > MAX_GUESSES ? 'X' : r.length
  }/6${
    hardMode ? '*' : ''
  }

${r.slice(0, 6).map(gr => gr[1].join('')).join('\n')}

Played by AI by Bethany Hitch`,
})
