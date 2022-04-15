import React, { Fragment, useContext } from 'react';
import styled from '@emotion/styled';
import { FailedRow } from './failed-row.jsx';
import { ResultRow } from './result-row.jsx';
import { StatsRow } from './stats-row';
import { getPuzzleNumber } from '../../helpers';
import wordContext from '../../contexts/word-context'

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const Results = ({ settings }) => {
  const { results } = useContext(wordContext)
  const hasResult = !!results.guessResults.length

  return <ResultContainer>
    <Header settings={settings} />
    {results.guessResults.map(
      ([guess, result, wordsLeft, remainingWords], i) =>
        <Fragment key={guess}>
          {i === MAX_GUESSES && <FailedRow />}
          <ResultRow
            guess={guess}
            result={result}
            settings={settings}
            wordsLeft={wordsLeft}
            remainingWords={remainingWords}
          />
        </Fragment>
    )}
    <StatsRow {...results} settings={settings} />
  </ResultContainer>
}

const Header = styled(({
  settings,
  className,
}) => {
  const {
    results,
    puzzleNumber,
  } = useContext(wordContext)
  
  return !results.guessResults.length
    ? null
    : <h1 className={className}>
        {puzzleNumber != null
          ? `Wordle ${puzzleNumber}`
          : 'Non-Wordle puzzle'
        }
      </h1>
})`
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: auto;
  margin-right: auto;
`

export default Results