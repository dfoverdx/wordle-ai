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
import Settings from './components/settings'

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const App = () => {
  const [ results, setResults ] = useState({
    guessResults: []
  })
  const [settings, setSettings] = useState({
    hideText: false
  })
  
  const dictionary = useDictionary()
  const handleSubmit = word =>
    setResults(
      run(word, { 
        dictionary, 
        onResult: setResults,
        random: false,
      })
    )
  
  const hasResult = !!results.guessResults.length
  
  return <div>
    <Settings 
      settings={settings}
      onChange={setSettings}
      hasResult={hasResult}
    />
    <WordInput
      dictionary={dictionary}
      onSubmit={handleSubmit}
      settings={settings}
      hasResult={hasResult}
    />
    <ResultContainer>
      {results.guessResults.map(([guess, result], i) =>
        <Fragment key={guess}>
          {i === MAX_GUESSES && <FailedRow />}
          <ResultRow 
            guess={guess}
            result={result}
            settings={settings}
          />
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
