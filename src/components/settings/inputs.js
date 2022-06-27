import ExcludePrevious
  from './exclude-previous-toggle.jsx'
import Random from './random-toggle.jsx'
import AnyFirstWord from './any-first-word-toggle.jsx'
import DecisiveThreshold 
  from './decisive-threshold.jsx'
import HardMode from './hard-mode-toggle.jsx'
import HideText from './hide-text-toggle.jsx'
import Autoplay from './autoplay-toggle.jsx'
import ShowWordsLeft
  from './show-words-left-toggle.jsx'
import Shuffle from './shuffle-toggle.jsx'
import WholeDictionary
  from './whole-dictionary-toggle.jsx'
import TryToLose from './try-to-lose-toggle.jsx'
import PrioritizeUniqueLetters
  from './prioritize-unique-letters.jsx'

export default [
  [
    'Display',
    [
      Autoplay,
      HideText,
      ShowWordsLeft
    ]
  ],
  [
    'AI',
    [
      HardMode,
      WholeDictionary,
      ExcludePrevious,
      PrioritizeUniqueLetters,
      Shuffle,
      Random,
      DecisiveThreshold,
      AnyFirstWord,
      TryToLose,
    ]
  ]
]