import React, { 
  Component, 
  useEffect,
  useState,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled'
import './extensions'
import { ResultRow } from './components/result-row.jsx'
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
      run(word, { dictionary, onResult: setResults })
    )
  
  return <div>
    <WordInput
      dictionary={dictionary}
      onSubmit={handleSubmit}
    />
    <ResultContainer>
      {results.guessResults.map(([guess, result], i) =>
        <ResultRow
          key={guess}
          guess={guess}
          result={result}
        />
      )}
    </ResultContainer>
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
