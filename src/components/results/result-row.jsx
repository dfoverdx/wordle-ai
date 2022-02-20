import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

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
      <WordsLeftContainer {...settings}>
        {wordsLeft}
        {wordsLeft === 1 ? ' word ' : ' words '}
        left
      </WordsLeftContainer>
    }
  </>

const bgColors = {
  [GREEN]: '#67CE66',
  [GRAY]: '#8E8E92',
  [YELLOW]: '#F8D74A',
}

const ResultItem = styled('div', {
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