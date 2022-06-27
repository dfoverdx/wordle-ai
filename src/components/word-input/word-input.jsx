import React, { 
  useEffect, 
  useRef, 
  useState,
  useCallback,
  useContext,
} from 'react'
import styled from '@emotion/styled'
import { Input as MUIInput } from '@mui/material'
import moment from 'moment'
import _ from 'lodash'
import useCurrentPuzzleWord
  from '../../hooks/useCurrentPuzzleWord'
import Button from './button.jsx'
import wordContext from '../../contexts/word-context'

const Container = styled.div`
  width: 100%;
  display: ${p =>
    p.hasResult && p.hideText ? 'none' : 'flex'
  };
  align-items: center;
  flex-direction: column;
`

const platform =
  navigator.userAgent.platform || navigator.platform

const Input = styled(MUIInput, {
  shouldForwardProp: p => p !== 'isPuzzleWord'
})`
  padding-left: ${platform === 'Win32' ? 9 : 4}px;
  font-family: 'menlo-regular', consolas, monospace;
  font-size: 30px;
  width: 100px;

  ${p => p.isPuzzleWord && { fontWeight: 800 }}
`

const WordInput = ({
  word,
  onWordChange,
  onSubmit,
  settings,
}) => {
  const {
    puzzleWords,
    allWords,
    results,
  } = useContext(wordContext)
  
  const inputRef = useRef()

  if (!allWords.length) {
    return null
  }

  const valid =
    word.length === 5 && allWords.includes(word)
  const isPuzzleWord =
    valid && puzzleWords.includes(word)

  const handleChange = e => {
    const val = e.target.value.trim()
    onWordChange(val.slice(0, 5).toUpperCase())
  }

  const handleKeyDown = e => {
    if (valid && ['Return', 'Enter'].includes(e.key)) {
      e.target.select()
      handleSubmit()
    } else if (!word && e.key === 'Enter') {
      runCurrent()
    }
  }

  const handleSubmit = () => {
    onWordChange(word)
    setPlayed(word)
    onSubmit({ word, isPuzzleWord })
  }
  
  const handleClear = () => {
    onWordChange('')
    setTimeout(() => 
      inputRef.current.querySelector('input').focus())
  }
      
  const hasResult = !!results.guessResults.length
  
  return (
    <Container hasResult={hasResult} {...settings}>
      <Input
        ref={inputRef}
        maxLength={5}
        isPuzzleWord={isPuzzleWord}
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={word}
        onKeyDown={handleKeyDown}
      />
      <Button
        word={word}
        onClear={handleClear}
        onSetToCurrent={runCurrent}
        valid={valid}
        onSubmit={handleSubmit}
        playedWord={played}
        random={settings.random}
      />
    </Container>
  )
}

export default WordInput