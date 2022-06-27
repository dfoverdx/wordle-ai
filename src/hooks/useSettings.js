import { useState, useCallback } from 'react'
import _ from 'lodash'
//import Cookies from 'js-cookie'

const getInitialSettings = () => ({
  hideText: false,
  decisiveThreshold: 2,
  random: false,
  showWordsLeft: false,
  doShuffle: true,
  anyFirstWord: false,
  forceHardMode: false,
  autoplay: true,
  excludePrevious: false,
  wholeDictionary: false,
  tryToLose: false,
  commonDupes: false,
  prioritizeUniqueLetters: true,
  ...JSON.parse(localStorage.settings || '{}'),
})

const useSettings = () => {
  const [settings, _setSettings] = 
    useState(getInitialSettings())
  
  const setSettings = useCallback(s => {
    const next = { ...settings, ...s }
    
    if (!_.isEqual(settings, next)) {
      //Cookies.set('settings', next)
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