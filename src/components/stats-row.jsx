import React from 'react'
import styled from '@emotion/styled'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

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
  align-content: center;
  flex: 1;
  
  & > :first-of-type {
    ${({ color }) => ({ color })};
    font-size: 30px;
  }
  
  & > :last-of-type {
    font-size: 20px;
    text-align: center;
  }
`

const HardModeIcon = styled(({ hardMode, className }) =>
  hardMode 
    ? <CheckIcon className={className} />
    : <ClearIcon className={className} />
)`
  color: ${
    p => p.hardMode ? '#67CE66' : 'red'
  };
  height: 36px;
  display: block;
`

export const StatsRow = ({
  guessResults,
  lucky,
  wordsLeft,
  hardMode,
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
          <span>
            {guessResults.length === 1
              ? 'guess'
              : 'guesses'
            }
          </span>
        </Cell>
        {guessResults.length <= MAX_GUESSES &&
          <Cell>
            <HardModeIcon hardMode={hardMode} />
            <span>hard mode</span>
          </Cell>
        }
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