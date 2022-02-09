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
import Settings from './components/settings'
import ShareButton from './components/share-button.jsx'
import WordInput from './components/word-input.jsx'
import Results from './components/results'
import useDictionary from './hooks/useDictionary'
import useSettings from './hooks/useSettings'

const AppContainer = styled('div')`
  font-family: sans-serif;
  max-width: 412px;
  margin-left: auto;
  margin-right: auto;
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

  const [word, setWord] = useState('')
  const [settings, setSettings] = useSettings()
  const dictionaries = useDictionary()

  if (RUN_ALL) {
    useEffect(() => {
      if (dictionaries[0].length) {
        runAll(dictionaries)
      }
    }, [dictionaries])
  }

  const handleSubmit = async ({ word, isPuzzleWord }) => {
    setWord(word)
    await Promise.sleep()
    setResults(
      run(word, {
        dictionaries,
        isPuzzleWord,
        onResult: setResults,
        ...settings,
      })
    )
  }

  const hasResult = !!results.guessResults.length
  const puzzleWords = dictionaries[0]

  return <AppWrapper>
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
    <Results
      word={word}
      puzzleWords={puzzleWords}
      results={results}
      settings={settings}
    />
  </AppWrapper>
}

const AppWrapper = ({ children }) =>
  <ErrorBoundary>
    <AppContainer>
      {children}
    </AppContainer>
  </ErrorBoundary>

ReactDOM.render(
  <App />,
  document.getElementById('root')
);