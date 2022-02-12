import React from 'react'
import { 
  FormGroup, 
  FormControlLabel as MuiFormControlLabel, 
  Switch 
} from '@mui/material'
import styled from '@emotion/styled'

const FormControlLabel = styled(MuiFormControlLabel)`
  margin-right: 0;
`

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