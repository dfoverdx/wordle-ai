import './extensions'
import React, {
  Fragment,
  useEffect,
  useState
} from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import run, { runAll } from './ai'
import ErrorBoundary 
  from './components/error-boundary.jsx'
import { FailedRow } from './components/failed-row.jsx'
import { ResultRow } from './components/result-row.jsx'
import Settings from './components/settings'
import ShareButton from './components/share-button.jsx'
import { StatsRow } from './components/stats-row.jsx'
import { WordInput } from './components/word-input.jsx'
import useDictionary from './hooks/useDictionary'
import useSettings from './hooks/useSettings'
import { getPuzzleNumber } from './components/helpers'

const AppContainer = styled('div')`
  font-family: sans-serif;
`

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: auto;
  margin-right: auto;
`

const ResultContainer = styled('div')`
  display: flex;
  flex-direction: column;

  ${Header} {
    ${p => !p.hasResult && { display: 'none' }}
  }
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
  const [results, setResults] = useState({
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
        doShuffle: settings.doShuffle,
      })
    )

  const hasResult = !!results.guessResults.length

  const puzzleWords = dictionaries[0]
  const word = hasResult && results.guessResults.last[0]
  const isPuzzleWord = word && puzzleWords.includes(word)
  const puzzleNumber =
    isPuzzleWord && getPuzzleNumber(puzzleWords, word)

  return <AppContainer>
    <ErrorBoundary>
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
      <ResultContainer hasResult={hasResult}>
        <Header>
          {isPuzzleWord
            ? <>Wordle {puzzleNumber || '???'}</>
            : 'Non-Wordle puzzle'
          }
        </Header>
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
        <StatsRow {...results} />
      </ResultContainer>
    </ErrorBoundary>
  </AppContainer>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);