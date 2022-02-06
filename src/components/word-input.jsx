import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Autocomplete,
  Button,
  Input as MUIInput
} from '@mui/material'
import { CURRENT_PUZZLE_NUMBER } from './helpers'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  ${InputContainer} {
    ${p =>
    p.hasResult && p.hideText && { display: 'none' }
  }
  }
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

export const WordInput = ({
  onSubmit,
  dictionaries: [puzzleWords, allWords],
  settings,
  hasResult,
}) => {
  const [word, setWord] = useState(
    localStorage.getItem('word') || ''
  )

  if (!allWords.length) {
    return null
  }

  const valid =
    word.length === 5 && allWords.includes(word)
  const isPuzzleWord =
    valid && puzzleWords.includes(word)

  const handleChange = e => {
    const val = e.target.value
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
    onSubmit({ word, isPuzzleWord })
  }

  const input =
    useAutocomplete
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
    <Container {...settings} hasResult={hasResult}>
      <InputContainer>
        {input}
        <Button
          disabled={!valid}
          onClick={handleSubmit}
        >
          Go
        </Button>
      </InputContainer>
    </Container>
  )
}
