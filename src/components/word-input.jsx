import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import {
  Autocomplete,
  Button,
  Input as MUIInput,
} from '@mui/material'
import { CURRENT_PUZZLE_NUMBER } from './helpers'
import moment from 'moment'

const lastPlay = moment(
  Number(localStorage.getItem('lastPlay')) || 0
).endOf('day')

const Container = styled.div`
  width: 100%;
  display: ${p =>
    p.hasResult && p.hideText
      ? 'none'
      : 'flex'
  };
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
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

const useAutocomplete = false;

const WordInput = ({
  onSubmit,
  dictionaries: [puzzleWords, allWords],
  settings,
  hasResult,
}) => {
  const [word, setWord] = useState('')
  const playedRef = useRef(false)

  useEffect(() => {
    if (
      puzzleWords.length && 
      !playedRef.current &&
      settings.autoplay
    ) {
      playedRef.current = true

      const today = moment().endOf('day')
      if (today.diff(lastPlay, 'days') >= 1) {
        const word = puzzleWords[CURRENT_PUZZLE_NUMBER]
        setWord(word)
        setTimeout(() => {
          localStorage.setItem('word', word)
          localStorage.setItem('lastPlay', Date.now())
          onSubmit({
            word,
            isPuzzleWord: puzzleWords.includes(word) 
          })
        })
      } else {
        setWord(localStorage.getItem('word') || '')
      }
    }
  }, [puzzleWords, onSubmit, settings.autoplay])

  if (!allWords.length) {
    return null
  }

  const valid =
    word.length === 5 && allWords.includes(word)
  const isPuzzleWord =
    valid && puzzleWords.includes(word)

  const handleChange = e => {
    const val = e.target.value.trim()
    setWord(val.slice(0, 5).toUpperCase())
  }

  const handleKeyDown = e => {
    if (valid && (
      e.key === 'Return' ||
      e.key === 'Enter'
    )) {
      e.target.select()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    localStorage.setItem('word', word)
    localStorage.setItem('lastPlay', Date.now())
    onSubmit({ word, isPuzzleWord })
  }

  const input = useAutocomplete
    ? <Autocomplete
        autoComplete
        autoHighlight
        options={
          puzzleWords.slice(0, CURRENT_PUZZLE_NUMBER)
        }
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={word}
        inputValue={word}
        onKeyDown={handleKeyDown}
        freeSolo
        renderInput={({ inputProps }) =>
          <Input
            maxLength={5}
            isPuzzleWord={isPuzzleWord}
            value={word}
            {...inputProps}
          />
        }
      />
    : <Input
        maxLength={5}
        isPuzzleWord={isPuzzleWord}
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={word}
        onKeyDown={handleKeyDown}
      />

  return (
    <Container hasResult={hasResult} {...settings}>
      {input}
      <Button disabled={!valid} onClick={handleSubmit}>
        Go
      </Button>
    </Container>
  )
}

export default WordInput