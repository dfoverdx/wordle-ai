import React from 'react'
import styled from '@emotion/styled'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  margin-top: 16px;
`

const Cell = styled('div', {
  shouldForwardProp: p => p !== 'color',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  flex: 1;
  
  & > :first-child {
    ${({ color }) => ({ color })};
    font-size: 30px;
  }
  
  & > :last-child {
    font-size: 20px;
    text-align: center;
  }
`

const HardModeIcon = styled(({ hardMode, className }) =>
  hardMode 
    ? <CheckIcon className={className} />
    : <ClearIcon className={className} />
)`
  height: 36px;
  width: 36px;
  display: block;
`

export const StatsRow = ({
  guessResults,
  lucky,
  wordsLeft,
  hardMode,
  settings,
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
        <HardModeCell
          hardMode={hardMode}
          settings={settings}
          guessResults={guessResults}
        />
        <LuckyCell {...{ lucky, settings }} />
        <Cell color="#3B81F6">
          <span>{wordsLeft}</span>
          <span>words left</span>
        </Cell>
      </Row>
      
const HardModeCell = ({
  hardMode, 
  guessResults, 
  settings
}) =>
  guessResults.length <= MAX_GUESSES &&
  !settings.anyFirstWord
    ? <Cell color={hardMode ? '#67CE66' : 'red'}>
        <HardModeIcon hardMode={hardMode} />
        <span>hard mode</span>
      </Cell>
    : null

const LuckyCell = ({ lucky, settings }) =>
  !settings.random && !settings.forceHardMode
    ? <Cell color={lucky ? '#F1A33C' : '#3B81F6'}>
        <span>{lucky ? 'Yes' : 'No'}</span>
        <span>luck needed</span>
      </Cell>
    : null