import React, { 
  Component, 
  useEffect,
  useState,
  useRef,
  Fragment,
} from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled'
import './extensions'
import { MAX_GUESSES } from './constants'
import { ResultRow } from './components/result-row.jsx'
import { FailedRow } from './components/failed-row.jsx'
import { StatsRow } from './components/stats-row.jsx'
import { WordInput } from './components/word-input.jsx'
import { run } from './processor'
import { useDictionary } from './hooks/useDictionary'

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const App = () => {
  const [ results, setResults ] = useState({
    guessResults: []
  });
  const dictionary = useDictionary()
  const handleSubmit = word =>
    setResults(
      run(word, { 
        dictionary, 
        onResult: setResults,
        random: false,
      })
    )
  
  return <div>
    <WordInput
      dictionary={dictionary}
      onSubmit={handleSubmit}
    />
    <ResultContainer>
      {results.guessResults.map(([guess, result], i) =>
        <Fragment key={guess}>
          {i === MAX_GUESSES && <FailedRow />}
          <ResultRow guess={guess} result={result} />
        </Fragment>
      )}
      <StatsRow {...results} />
    </ResultContainer>
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
