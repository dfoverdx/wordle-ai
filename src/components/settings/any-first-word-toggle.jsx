import React from 'react'
import SettingToggle from './setting-toggle.jsx'

const AnyFirstWordToggle = props =>
  <SettingToggle
    {...props}
    setting="anyFirstWord"
    label="Use any word first"
    disabledWhen={s => s.random}
  />

export default AnyFirstWordToggle