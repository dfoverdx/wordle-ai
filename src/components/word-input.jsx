import React, { useState } from 'react'
import { 
  Input as MUIInput, 
  Button
} from '@mui/material'
import styled from '@emotion/styled'
import moment from 'moment'
import { getPuzzleNumber } from './helpers'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
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
  
  ${Header} {
    ${p =>
      !(p.hideText && p.hasResult) && { display: 'none' }
    }
  }
`

const Input = styled(MUIInput, {
  shouldForwardProp: p => p !== 'isPuzzleWord'
})`
  font-size: 30px;
  font-family: 'menlo-regular';
  width: 100px;
  padding-left: 4px;
  
  ${p => p.isPuzzleWord && { fontWeight: 800 }}
`

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
  const puzzleNumber =
    isPuzzleWord && getPuzzleNumber(puzzleWords, word)
  
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
  
  return (
    <Container {...settings} hasResult={hasResult}>
      <Header>
        Wordle {puzzleNumber}
      </Header>
      <InputContainer>
        <Input
          maxLength={5} 
          onChange={handleChange}
          onFocus={e => e.target.select()}
          value={word}
          onKeyDown={handleKeyDown}
          isPuzzleWord={isPuzzleWord}
        />
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
