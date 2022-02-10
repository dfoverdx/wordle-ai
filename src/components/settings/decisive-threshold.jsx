import React, { 
  useState, 
  useCallback, 
} from 'react'
import { 
  FormGroup, 
  Typography, 
  Slider as MuiSlider,
} from '@mui/material'

import styled from '@emotion/styled'
import IconTooltip from './icon-tooltip.jsx'

const Slider = styled(MuiSlider)`
  width: 200px;
  
  & .MuiSlider-thumb {
    z-index: 1300;
  }
  
  // TODO: figure out how to get the label not to clip
`

const DecisiveThreshold = ({
  onChange,
  settings: { decisiveThreshold, random, forceHardMode },
}) => {
  const handleChange = useCallback(
    (_, val) => {
      localStorage.setItem('decisiveThreshold', val)
      onChange({ decisiveThreshold: val })
    },
    [onChange]
  )
  
  return <FormGroup>
    <Typography>
      Decisive threshold
      <IconTooltip placement="top">
        <p>
          When there are more words remaining than there are guesses, and each word is equally likely, the AI will violate <i>Hard mode</i> and play an incorrect word in order to narrow down the possibilities for the unknown letters.
        </p>
        <p>
          The threshold specifies at how many unknown letters to begin using these decisive guesses.
        </p>
        <Gray>
          Yes, I need to figure out a better name for this.  Naming things is the hardest part of programming.
        </Gray>
      </IconTooltip>
    </Typography>
    <Slider
      marks={!forceHardMode && !random}
      min={1}
      max={WORD_LEN}
      value={
        forceHardMode || random ? 0 : decisiveThreshold
      }
      valueLabelDisplay="auto"
      valueLabelFormat={v => v === 1 
        ? '1 unknown letter'
        : `${v} unknown letters`
      }
      onChange={handleChange}
      disabled={random || forceHardMode}
    />
  </FormGroup>
}

const Gray = styled.p`
  color: lightgray;
`

export default DecisiveThreshold