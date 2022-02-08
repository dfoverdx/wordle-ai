import React, { useState, useCallback } from 'react'
import { 
  FormGroup, 
  Typography, 
  Slider as MUISlider,
} from '@mui/material'
import styled from '@emotion/styled'

const Slider = styled(MUISlider)`
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
  
export default DecisiveThreshold