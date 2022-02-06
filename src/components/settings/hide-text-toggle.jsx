import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const HideTextToggle = props =>
  <SettingToggle
    {...props}
    setting="hideText"
    label="Hide text"
  />

export default HideTextToggle