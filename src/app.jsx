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
import { ResultRow } from './components/result-row.jsx'
import { FailedRow } from './components/failed-row.jsx'
import { StatsRow } from './components/stats-row.jsx'
import { WordInput } from './components/word-input.jsx'
import run, { runAll } from './ai'
import useDictionary from './hooks/useDictionary'
import Settings from './components/settings'
import useSettings from './hooks/useSettings'
import ShareButton from './components/share-button.jsx'
import ErrorBoundary 
  from './components/error-boundary.jsx'

const AppContainer = styled('div')`
  font-family: sans-serif;
`

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px;
`

const App = () => {
  const [ results, setResults ] = useState({
    guessResults: []
  })
  
  const [settings, setSettings] = useSettings()
  const dictionaries = useDictionary()
  
  if (RUN_ALL) {
    useEffect(() => {
      if (dictionaries[0].length) {
        runAll(dictionaries)
      }
    }, [dictionaries])
  }
  
  const handleSubmit = ({ word, isPuzzleWord }) =>
    setResults(
      run(word, { 
        dictionaries,
        isPuzzleWord,
        onResult: setResults,
        random: settings.random,
        decisiveThreshold: settings.decisiveThreshold,
        doShuffle: false,
      })
    )
  
  const hasResult = !!results.guessResults.length
  
  return <AppContainer><ErrorBoundary>
    <ButtonsContainer>
      <ShareButton results={results} />
      <Settings
        settings={settings}
        onChange={setSettings}
        hasResult={hasResult}
      />
    </ButtonsContainer>
    <WordInput
      dictionaries={dictionaries}
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
  </ErrorBoundary></AppContainer>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);