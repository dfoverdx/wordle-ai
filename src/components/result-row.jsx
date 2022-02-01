import React from 'react'
import styled from '@emotion/styled'
import {
  GREEN,
  YELLOW,
  GRAY,
} from '../constants'

const ResultRowContainer = styled('div')`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  font-size: 40px;
  font-family: 'menlo-regular';
  color: white;
`

export const ResultRow = ({ guess, result }) =>
  <ResultRowContainer>
    {result.map((r, i) =>
      <ResultItem key={guess + i} result={r}>
        <span>{guess[i]}</span>
      </ResultItem>
    )}
  </ResultRowContainer>

const bgColors = {
  [GREEN]:'#67CE66',
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