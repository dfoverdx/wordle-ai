import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const ShuffleToggle = props =>
  <SettingToggle
    {...props}
    setting="doShuffle"
    label="Shuffle equally likely words"
    disabledWhen={s => s.random}
    forceChecked={s => s.random ? true : null}
  />
  
export default ShuffleToggle