import React from 'react'
import { 
  FormGroup, 
  FormControlLabel, 
  Switch 
} from '@mui/material'

const HideTextToggle = ({ 
  settings: { hideText }, 
  onChange, 
}) =>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={hideText}
          onChange={() => 
            onChange({ hideText: !hideText })
          }
        />
      }
      label="Hide text"
    />
  </FormGroup>
  
export default HideTextToggle