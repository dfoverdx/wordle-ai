import React from 'react'
import styled from '@emotion/styled'
import { MAX_GUESSES } from '../constants'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  margin-top: 8px;
  font-family: sans-serif;
`

const Cell = styled('div', {
  shouldForwardProp: p => p !== 'color',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > :first-child {
    color: ${p => p.color || 'black'};
    font-size: 30px;
  }
  
  & > :last-child {
    font-size: 20px;
  }
`

export const StatsRow = ({
  guessResults,
  lucky,
  wordsLeft,
}) =>
  !guessResults.length
    ? null
    : <Row>
        <Cell
          color={
            guessResults.length <= MAX_GUESSES
              ? '#67CE66'
              : 'red'
          }
        >
          <span>{guessResults.length}</span>
          <span>guesses</span>
        </Cell>
        <Cell
          color={lucky ? '#F1A33C' : '#3B81F6'}
        >
          <span>{lucky ? 'Yes' : 'No'}</span>
          <span>luck needed</span>
        </Cell>
        <Cell color="#3B81F6">
          <span>{wordsLeft}</span>
          <span>words left</span>
        </Cell>
      </Row>