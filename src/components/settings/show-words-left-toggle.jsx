import React from 'react'
import { 
  FormGroup, 
  FormControlLabel, 
  Switch 
} from '@mui/material'

const ShowWordsLeftToggle = ({ 
  settings: { showWordsLeft }, 
  onChange, 
}) =>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={showWordsLeft}
          onChange={() => 
            onChange({ showWordsLeft: !showWordsLeft })
          }
        />
      }
      label="Show words left"
    />
  </FormGroup>
  
export default ShowWordsLeftToggle