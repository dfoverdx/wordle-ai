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
  forceChecked = () => null,
  ...props
}) =>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          disabled={disabledWhen(settings)}
          {...props}
          checked={
            forceChecked(settings) ?? settings[setting]
          }
          onChange={() => 
            onChange({ [setting]: !settings[setting] })
          }
        />
      }
      label={label}
    />
  </FormGroup>
  
export default SettingToggle