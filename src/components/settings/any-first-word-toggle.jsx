import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const AnyFirstWordToggle = props =>
  <SettingToggle
    {...props}
    setting="anyFirstWord"
    label="Use any word first"
    disabledWhen={s => s.random || s.forceHardMode}
    forceChecked={
      s => s.random || s.forceHardMode ? false : null
    }
  />

export default AnyFirstWordToggle