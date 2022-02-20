import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const WholeDictionaryToggle = props =>
  <SettingToggle
    {...props}
    setting="wholeDictionary"
    label="Use whole dictionary for Wordle puzzles"
    disabledWhen={s => s.excludePrevious}
  />
  
export default WholeDictionaryToggle