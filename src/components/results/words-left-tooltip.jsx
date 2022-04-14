import React, { useState } from 'react'
import {
  ClickAwayListener,
  Tooltip,
  Link as MUILink,
  Portal,
} from '@mui/material'
import ArrowDropDownIcon 
  from '@mui/icons-material/ArrowDropDown';
import styled from '@emotion/styled'

export const WordsLeftTooltip = ({ 
  children,
  placement,
  words,
}) => {
  const [open, setOpen] = useState(false)
  if (!words?.length) {
    return <ContentWrapper>{children}</ContentWrapper>
  }
  
  return <ClickAwayListener
    onClickAway={() => setOpen(false)}
  >
    <Container>
      <Tooltip
        open={open}
        placement={placement}
        enterTouchDelay={0}
        leaveTouchDelay={24 * 60 * 60 * 1000}
        arrow
        title={<More words={words} />}
      >
        <ContentWrapper onClick={() => setOpen(true)}>
          {children}
          <Arrow />
        </ContentWrapper>
      </Tooltip>
    </Container>
  </ClickAwayListener>
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  position: relative;
  flex: 1;
`
  
const Arrow = styled(ArrowDropDownIcon)`
  margin-left: auto;
`

const More = styled(({ 
  words, 
  className, 
  children,
}) => {
  const [showLines, setShowLines] = useState(5)
  const showMore = words.length > (showLines + 1) * 5
  
  if (showMore) {
    words = words.slice(0, showLines * 5)
  }

  return <div className={className}>
    <WordSpans words={words} />
    {showMore && <>
      {'\n'}
      <Link onClick={() => setShowLines(n => n + 25)}>
        More...
      </Link>
    </>}
  </div>
})`
  white-space: pre-line;
`

const Items = styled.div`
  font-family: 'menlo-regular', consolas, monospace;
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px 8px;
  
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`

const WordSpans = ({ words }) => <Items>
  {words.map(w => <span key={w}>{w}</span>)}
</Items>

const Link = styled(MUILink)`
  color: #ccc;
`