import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FailedRow } from './failed-row.jsx';
import { ResultRow } from './result-row.jsx';
import { StatsRow } from './stats-row.jsx';
import { getPuzzleNumber } from '../../helpers';

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const Results = props => {
  const { results, puzzleWords, word, settings } = props
  const hasResult = !!results.guessResults.length

  return <ResultContainer>
    <Header {...props} hasResult={hasResult} />
    {results.guessResults.map(
      ([guess, result, wordsLeft], i) =>
        <Fragment key={guess}>
          {i === MAX_GUESSES && <FailedRow />}
          <ResultRow
            guess={guess}
            result={result}
            settings={settings}
            wordsLeft={wordsLeft}
          />
        </Fragment>
    )}
    <StatsRow {...results} settings={settings} />
  </ResultContainer>
}

const Header = styled(({
  word,
  puzzleWords,
  hasResult,
  className,
}) => {
  if (!hasResult) {
    return null
  }

  const puzzleNumber = getPuzzleNumber(puzzleWords, word)
  l(puzzleWords.includes(word))

  return <h1 className={className}>
    {puzzleNumber != null
      ? <>
          Wordle{' '}
          {puzzleNumber === false
            ? '???'
            : puzzleNumber
          }
        </>
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