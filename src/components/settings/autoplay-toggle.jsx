import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const AutoplayToggle = props =>
  <SettingToggle
    {...props}
    setting="autoplay"
    label="Autoplay today's word"
  />
  
export default AutoplayToggle