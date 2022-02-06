import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const ShowWordsLeftToggle = props =>
  <SettingToggle
    {...props}
    setting="showWordsLeft"
    label="Show words left"
  />
  
export default ShowWordsLeftToggle