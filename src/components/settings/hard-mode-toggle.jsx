import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const HardModeToggle = props =>
  <SettingToggle
    {...props}
    setting="forceHardMode"
    label="Enforce hard mode"
    disabledWhen={s => s.anyFirstWord || s.random}
    forceChecked={
      s =>
        s.random ? true :
        s.anyFirstWord ? false :
        null
    }
  />

export default HardModeToggle