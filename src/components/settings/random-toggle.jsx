import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const RandomToggle = props =>
  <SettingToggle
    {...props}
    setting="random"
    label="Use random words"
  />
  
export default RandomToggle