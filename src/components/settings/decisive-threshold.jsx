import React, { useState, useCallback } from 'react'
import { 
  FormGroup, 
  Typography, 
  Slider as MuiSlider,
  IconButton,
  Tooltip as MuiTooltip,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import styled from '@emotion/styled'

const Tooltip = styled(MuiTooltip)`
  & .MuiTooltip-popper {
    z-index: 99999;
  }
`

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
  
  return (
    <FormGroup>
      <Typography>
        Decisive threshold
      </Typography>
      <Slider
        marks
        min={0}
        max={WORD_LEN}
        value={decisiveThreshold}
        valueLabelDisplay="auto"
        valueLabelFormat={v =>
          !v ? 'Hard mode' :
          v === 1 ? '1 unknown letter' :
          `${v} unknown letters`
        }
        onChange={handleChange}
        disabled={random || forceHardMode}
      />
    </FormGroup>
  )
}

const decisiveThresholdInfo = 
  <div>
    <p>
      When there are more words remaining than there are guesses, and each word is equally likely, the AI will play a word that it knows it cannot be in order to determine which of the letters left unknown are the right ones.
    </p>
    <p>
      The threshold determines at how many unknown letter to begin trying these determiner guesses.
    </p>
  </div>

const InfoTooltip = () =>
  <Tooltip 
    title={decisiveThresholdInfo}
    arrow
    enterDelay={10}
    enterTouchDelay={10}
    placement="top-end"
    onOpen={() => window.alert()}
  >
    <IconButton>
      <InfoIcon />
    </IconButton>
  </Tooltip>
  
export default DecisiveThreshold