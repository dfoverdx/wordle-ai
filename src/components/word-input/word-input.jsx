import React, { 
  useEffect, 
  useRef, 
  useState,
  useCallback,
} from 'react'
import styled from '@emotion/styled'
import { 
  Autocomplete, 
  Input as MUIInput
} from '@mui/material'
import moment from 'moment'
import _ from 'lodash'
import Cookies from 'js-cookie'
import useCurrentPuzzleWord
  from '../../hooks/useCurrentPuzzleWord'
import Button from './button.jsx'

const UNPLAY_SETTINGS = [
  'decisiveThreshold',
  'random',
  'doShuffle',
  'anyFirstWord',
  'forceHardMode',
  'excludePrevious',
  'wholeDictionary',
  'tryToLose',
  'commonDupes',
]

const lastPlay = moment(
  Cookies.get('lastPlay') || 0
).endOf('day')

const Container = styled.div`
  width: 100%;
  display: ${p =>
    p.hasResult && p.hideText ? 'none' : 'flex'
  };
  align-items: center;
  flex-direction: column;
`

const platform =
  navigator.userAgent.platform || navigator.platform

const Input = styled(MUIInput, {
  shouldForwardProp: p => p !== 'isPuzzleWord'
})`
  padding-left: ${platform === 'Win32' ? 9 : 4}px;
  font-family: 'menlo-regular', consolas, monospace;
  font-size: 30px;
  width: 100px;

  ${p => p.isPuzzleWord && { fontWeight: 800 }}
`

const useAutocomplete = false;

const setCookies = word => {
  Cookies.set('word', word)
  Cookies.set('lastPlay', Date.now())
}

const WordInput = ({
  onSubmit,
  dictionaries: [puzzleWords, allWords],
  settings,
  hasResult,
}) => {
  const [word, setWord] = useState('')
  /** @type {string|false} */
  const [played, setPlayed] = useState(false)
  const inputRef = useRef()
  const currentPuzzle = useCurrentPuzzleWord(puzzleWords)
  const playedToday = useRef(false)
  
  const runCurrent = () => {
    if (!currentPuzzle) {
      return
    }
    
    setPlayed(currentPuzzle)
    
    setWord(currentPuzzle)
    setTimeout(() => {
      setCookies(currentPuzzle)
      onSubmit({
        word: currentPuzzle,
        isPuzzleWord: true,
      })
    })
  }
  
  useEffect(
    () => { setPlayed(false) }, 
    [
      currentPuzzle,
      ...Object.values(
        _.pick(settings, ...UNPLAY_SETTINGS)
      ),
    ]
  )
  
  useEffect(
    () => { playedToday.current = false },
    [currentPuzzle]
  )

  useEffect(() => {
    if (
      puzzleWords.length &&
      !playedToday.current &&
      settings.autoplay
    ) {
      setPlayed(currentPuzzle)
      playedToday.current = true

      const today = moment().endOf('day')
      if (today.diff(lastPlay, 'days') >= 1) {
        runCurrent()
      } else {
        setWord(Cookies.get('word') || '')
      }
    }
  })

  if (!allWords.length) {
    return null
  }

  const valid =
    word.length === 5 && allWords.includes(word)
  const isPuzzleWord =
    valid && puzzleWords.includes(word)

  const handleChange = e => {
    const val = e.target.value.trim()
    setWord(val.slice(0, 5).toUpperCase())
  }

  const handleKeyDown = e => {
    if (valid && ['Return', 'Enter'].includes(e.key)) {
      e.target.select()
      handleSubmit()
    } else if (!word && e.key === 'Enter') {
      runCurrent()
    }
  }

  const handleSubmit = () => {
    setCookies(word)
    setPlayed(word)
    onSubmit({ word, isPuzzleWord })
  }
  
  const handleClear = () => {
    setWord('')
    setTimeout(() => 
      inputRef.current.querySelector('input').focus())
  }

  const input = useAutocomplete
    ? <Autocomplete
        autoComplete
        autoHighlight
        options={
          puzzleWords.slice(0, CURRENT_PUZZLE_NUMBER)
        }
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={word}
        inputValue={word}
        onKeyDown={handleKeyDown}
        freeSolo
        renderInput={({ inputProps }) =>
          <Input
            maxLength={5}
            isPuzzleWord={isPuzzleWord}
            value={word}
            {...inputProps}
          />
        }
      />
    : <Input
        ref={inputRef}
        maxLength={5}
        isPuzzleWord={isPuzzleWord}
        onChange={handleChange}
        onFocus={e => e.target.select()}
        value={word}
        onKeyDown={handleKeyDown}
      />
  
  return (
    <Container hasResult={hasResult} {...settings}>
      {input}
      <Button
        word={word}
        onClear={handleClear}
        onSetToCurrent={runCurrent}
        valid={valid}
        onSubmit={handleSubmit}
        playedWord={played}
      />
    </Container>
  )
}

export default WordInput