import React from 'react'
import { 
  FormGroup, 
  FormControlLabel, 
  Switch 
} from '@mui/material'

const SettingToggle = ({
  setting,
  label,
  settings,
  onChange,
}) =>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={settings[setting]}
          onChange={() => 
            onChange({ [setting]: !settings[setting] })
          }
        />
      }
      label={label}
    />
  </FormGroup>
  
export default SettingToggle