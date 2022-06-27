import { useState, useCallback } from 'react'
import _ from 'lodash'

const getInitialSettings = () => ({
  hideText: false,
  decisiveThreshold: 2,
  random: false,
  showWordsLeft: false,
  doShuffle: true,
  anyFirstWord: false,
  forceHardMode: false,
  autoplay: false,
  excludePrevious: false,
  wholeDictionary: false,
  tryToLose: false,
  commonDupes: false,
  ...JSON.parse(localStorage.settings || '{}'),
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