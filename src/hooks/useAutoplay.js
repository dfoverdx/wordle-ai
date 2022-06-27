import { useState, useRef, useEffect } from 'react'

const UNPLAY_SETTINGS = [
  'decisiveThreshold',
  'random',
  'doShuffle',
  'anyFirstWord',
  'forceHardMode',
  'excludePrevious',
  'wholeDictionary',
  'tryToLose',
  'commonDupes',
]

const saveLastPlayed = word => {
  localStorage.setItem('word', word)
  localStorage.setItem('lastPlayed', Date.now())
}

const lastPlayed = moment(
  localStorage.getItem('lastPlayed') || 0
).endOf('day')

export const useAutoplay = (
  autoplay,
  setWord,
  onSubmit
) =>
  /** @type {string|false} */
  const [played, setPlayed] = useState(false)
  const currentPuzzle = useCurrentPuzzleWord(puzzleWords)
  const playedToday = useRef(false)
  
  const runCurrent = () => {
    if (!currentPuzzle) {
      return
    }
    
    setPlayed(currentPuzzle)
    
    setWord(currentPuzzle)
    setTimeout(() => {
      saveLastPlayed(currentPuzzle)
      onSubmit({
        word: currentPuzzle,
        isPuzzleWord: true,
      })
    })
  }
  
  useEffect(
    () => { setPlayed(false) }, 
    [
      currentPuzzle,
      ...Object.values(
        _.pick(settings, ...UNPLAY_SETTINGS)
      ),
    ]
  )
  
  useEffect(
    () => { playedToday.current = false },
    [currentPuzzle]
  )

  useEffect(() => {
    if (
      puzzleWords.length &&
      !played &&
      autoplay
    ) {
      setPlayed(currentPuzzle)
      playedToday.current = true

      const today = moment().endOf('day')
      if (today.diff(lastPlay, 'days') >= 1) {
        runCurrent()
      } else {
        setWord(localStorage.getItem('word') || '')
      }
    }
  })
}