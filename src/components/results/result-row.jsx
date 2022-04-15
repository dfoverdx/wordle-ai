import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { WordsLeftTooltip }
  from './words-left-tooltip.jsx'

const hiddenText = css`
  color: transparent;
  user-select: none;
`

const WordsLeftContainer = styled('div')`
  display: ${p =>
    p.showWordsLeft ? 'inline-flex' : 'none'
  };
  direction: row;
  color: gray;
  font-size: 20px;
  justify-content: center;
  
  & > div {
    position: relative;
    max-width: min-content;
    height: min-content;
    white-space: nowrap;
  }
`

const ArrowContainer = styled('div')`
  position: absolute;
  right: 0;
  top: 100%;
  transform: translate(100%, -70%);
  
  & > * {
    margin-right: unset;
  }
`

const ResultRowContainer = styled('div')`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  font-size: 40px;
  font-family: 'menlo-regular', consolas, monospace;
  color: white;
  
  ${p => p.hideText && hiddenText}
`

export const ResultRow = ({
  guess,
  result,
  wordsLeft,
  remainingWords,
  settings
}) =>
  <>
    <ResultRowContainer {...settings}>
      {result.map((r, i) =>
        <ResultItem key={guess + i} result={r}>
          <span>{guess[i]}</span>
        </ResultItem>
      )}
    </ResultRowContainer>
    {wordsLeft != null &&
      <WordsLeftTooltip
        placement="bottom"
        words={remainingWords}
      >{
        arrow =>
          <WordsLeftContainer {...settings}>
            <div>
              {wordsLeft}
              {wordsLeft === 1 ? ' word ' : ' words '}
              left
              <ArrowContainer>{arrow}</ArrowContainer>
            </div>
          </WordsLeftContainer>
      }</WordsLeftTooltip>
    }
  </>

const bgColors = {
  [GREEN]: '#67CE66',
  [GRAY]: '#8E8E92',
  [YELLOW]: '#F8D74A',
}

const ResultItem = styled('span', {
  shouldForwardProp: p => p !== 'result'
})`
  height: 50px;
  width: 50px;
  background-color: ${({ result }) => bgColors[result]};
  margin: 2px;
  display: flex;
  align-content: center;
  justify-content: center;
  
  & > span {
    line-height: 1;
    margin: auto;
  }
`