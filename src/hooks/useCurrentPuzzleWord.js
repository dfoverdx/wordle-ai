import moment from 'moment'
import { useState } from 'react'
import { getCurrentPuzzleNumber } from '../helpers'
import useTimedEffect from './useTimedEffect'

const useCurrentPuzzleWord = puzzleWords => {
  const [puzzleNum, setPuzzleNum] = 
    useState(getCurrentPuzzleNumber())
  
  useTimedEffect(() =>
    setPuzzleNum(getCurrentPuzzleNumber()),
    moment().startOf('day').add(1, 'day'),
  )
  
  return puzzleWords?.[puzzleNum]
}

export default useCurrentPuzzleWord