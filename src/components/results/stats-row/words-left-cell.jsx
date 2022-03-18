import React, { useState } from 'react'
import { Cell } from './cell'
import {
  ClickAwayListener,
  Tooltip,
  Link as MUILink,
  Portal,
} from '@mui/material'
import ArrowDropDownIcon 
  from '@mui/icons-material/ArrowDropDown';
import styled from '@emotion/styled'

export const WordsLeftCell = ({ 
  wordsLeft,
  remainingWords,
}) => {
  const [open, setOpen] = useState(false)
  
  const cell = <Cell 
    color="#3B81F6"
    onClick={() => setOpen(!!wordsLeft)}
  >
    <span>{wordsLeft}</span>
    <span>words left</span>
    {!!wordsLeft && <Arrow />}
  </Cell>
  
  return remainingWords?.length
    ? <ClickAwayListener
        onClickAway={() => setOpen(false)}
      >
        <Container>
          <Tooltip
            open={open}
            placement="bottom-end"
            enterTouchDelay={0}
            leaveTouchDelay={24 * 60 * 60 * 1000}
            arrow
            title={<More words={remainingWords} />}
          >
            {cell}
          </Tooltip>
        </Container>
      </ClickAwayListener>
    : cell
}

const Container = styled.div`
  position: relative;
  flex: 1;
`
  
const Arrow = styled(ArrowDropDownIcon)`
  /*position: absolute;
  right: 0;
  bottom: 0;*/
  margin-left: auto;
`
  
const More = styled(({ words, className }) => {
  const [showLines, setShowLines] = useState(5)
  const showMore = words.length > (showLines + 1) * 5
  
  if (showMore) {
    words = words.slice(0, showLines * 5)
  }

  return <div className={className}>
      <span className="items">
        <WordSpans words={words} />
      </span>
      {showMore && <>
        {'\n'}
        <Link onClick={() => setShowLines(n => n + 25)}>
          More...
        </Link>
      </>}
    </div>
})`
  white-space: pre-line;
  
  & .items {
    font-family: 'menlo-regular', consolas, monospace;
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px 8px;
  }
`

const WordSpans = ({ words }) => <>
  {words.map(w => <span key={w}>{w}</span>)}
</>

const Link = styled(MUILink)`
  color: #ccc;
`