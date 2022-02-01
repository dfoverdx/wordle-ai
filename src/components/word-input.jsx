import React, { useState } from 'react'
import { 
  Input as MUIInput, 
  Button
} from '@mui/material'
import styled from '@emotion/styled'

const Container = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
`

const Input = styled(MUIInput)`
  font-size: 30px;
  font-family: 'menlo-regular';
  width: 100px;
  padding-left: 4px;
`

export const WordInput = ({ onSubmit, dictionary }) => {
  const [value, setValue] = useState(
    localStorage.getItem('word') || ''
  )
  
  const valid = 
    value.length === 5 && dictionary.includes(value)
  
  if (!dictionary.length) {
    return null
  }
  
  const handleChange = e => {
    const val = e.target.value
    setValue(val.slice(0, 5).toUpperCase())
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
    localStorage.setItem('word', value)
    onSubmit(value)
  }
  
  return (
    <Container>
      <Input
        maxLength={5} 
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={value}
        onKeyDown={handleKeyDown}
        disabled={!dictionary.length}
      />
      <Button
        disabled={!valid}
        onClick={handleSubmit}
      >
        Go
      </Button>
    </Container>
  )
}