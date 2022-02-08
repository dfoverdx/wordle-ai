import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const HardModeToggle = props =>
  <SettingToggle
    {...props}
    setting="forceHardMode"
    label="Hard mode"
  />

export default HardModeToggle