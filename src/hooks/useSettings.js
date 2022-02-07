import { useState, useCallback } from 'react'
import _ from 'lodash'

const getInitialSettings = () => ({
  hideText: false,
  decisiveThreshold: 2,
  random: false,
  showWordsLeft: false,
  doShuffle: true,
  anyFirstWord: false,
  random: false,
  ...JSON.parse(
    localStorage.getItem('settings') || '{}'
  )
})

const useSettings = () => {
  const [settings, _setSettings] = 
    useState(getInitialSettings())
  
  const setSettings = useCallback(s => {
    const next = { ...settings, ...s }
    
    if (!_.isEqual(settings, next)) {
      localStorage.setItem(
        'settings',
        JSON.stringify(next)
      )
      _setSettings(next)
    }
  }, [settings])
  
  return [settings, setSettings]
}

export default useSettings