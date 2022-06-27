import './extensions'
import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
} from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import run, { runAll } from './ai'
import ErrorBoundary 
  from './components/error-boundary.jsx'
import Settings from './components/settings'
import ShareButton from './components/share-button.jsx'
import WordInput from './components/word-input'
import Results from './components/results'
import useDictionary from './hooks/useDictionary'
import useSettings from './hooks/useSettings'
import wordContext from './contexts/word-context'
import { getCurrentPuzzleNumber } from './helpers'
//import usePrevState from './hooks/usePrevState'

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

const EMPTY_RESULTS = {
  guessResults: []
}

const App = () => {
  const [results, setResults] = useState(EMPTY_RESULTS)
  
  const [settings, setSettings] = useSettings()
  const dictionaries = useDictionary()
  const [puzzleWords, allWords] = dictionaries
  
  const [word, setWord] = useState('')

  if (RUN_ALL) {
    useEffect(() => {
      if (puzzleWords.length) {
        runAll(dictionaries)
      }
    }, [dictionaries])
  }

  const handleSubmit =
    async ({ word, isPuzzleWord }) => {
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
  
  const isPuzzleWord = 
    !!word && puzzleWords.includes(word)
  const curPuzzleNum = getCurrentPuzzleNumber()
  const puzzleNumber =
    !isPuzzleWord ? null :
    puzzleWords.indexOf(word) > curPuzzleNum ? '???' :
    puzzleWords.indexOf(word)
  
  const wordCtx = {
    word,
    puzzleWords,
    allWords,
    puzzleNumber,
    results,
  }

  return <AppWrapper>
    <wordContext.Provider value={wordCtx}>
      <ButtonsContainer>
        <ShareButton />
        <Settings
          settings={settings}
          onChange={setSettings}
          hasResult={hasResult}
        />
      </ButtonsContainer>
      <WordInput
        onSubmit={handleSubmit}
        settings={settings}
      />
      <Results settings={settings} />
    </wordContext.Provider>
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
