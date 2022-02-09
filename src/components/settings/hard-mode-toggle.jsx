import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const HardModeToggle = props =>
  <SettingToggle
    {...props}
    setting="forceHardMode"
    label="Enforce hard mode"
    disabledWhen={s => s.anyFirstWord}
  />

export default HardModeToggle