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
  disabledWhen = () => false,
  ...props
}) =>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          disabled={disabledWhen(settings)}
          {...props}
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