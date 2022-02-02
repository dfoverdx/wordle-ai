import React, { useState, useCallback } from 'react'
import { 
  FormGroup, 
  Typography, 
  Slider as MUISlider,
} from '@mui/material'
import styled from '@emotion/styled'
import { WORD_LEN } from '../../constants'

const Slider = styled(MUISlider)`
  width: 200px;
  
  & .MuiSlider-thumb {
    z-index: 1300;
  }
  
  // TODO: figure out how to get the label not to clip
`

const DecisiveThreshold = ({
  onChange,
  settings: { decisiveThreshold },
}) => {
  const [ tmp, setTmp ] = useState(null)
  const handleChange = useCallback(
    (_, val) => setTmp(val),
    []
  )
  const handleChangeCommitted = useCallback(
    (_, val) => {
      onChange({ decisiveThreshold: val })
      setTmp(null)
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
        value={tmp == null ? decisiveThreshold : tmp}
        valueLabelDisplay="auto"
        valueLabelFormat={v =>
          !v ? 'Hard mode' :
          v === 1 ? '1 unknown letter' :
          `${v} unknown letters`
        }
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
    </FormGroup>
  )
}
  
export default DecisiveThreshold