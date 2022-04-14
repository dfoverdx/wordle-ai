import React, { useState } from 'react'
import { WordsLeftTooltip }
  from '../words-left-tooltip.jsx'
import { Cell } from './cell'

export const WordsLeftCell = ({ 
  wordsLeft,
  remainingWords,
}) => {
  const cell = <Cell 
    color="#3B81F6"
    onClick={() => setOpen(!!wordsLeft)}
  >
    <span>{wordsLeft}</span>
    <span>words left</span>
  </Cell>
  
  return !!wordsLeft
    ? <WordsLeftTooltip 
        placement="bottom-end"
        words={remainingWords}
      >
        {cell}
      </WordsLeftTooltip>
    : cell
}