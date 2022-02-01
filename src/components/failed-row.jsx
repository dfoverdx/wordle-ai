import React from 'react'
import styled from '@emotion/styled'

const Row = styled('div')`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 26px;
  height: 40px;
  color: white;
  background-color: black;
  background:
    linear-gradient(to bottom, red, black);
  font-family: sans-serif;
  flex-grow: 0;
  width: ${54 * 5 - 4}px;
  margin-left: auto;
  margin-right: auto;
  
  & > span {
    margin-top: auto;
    margin-bottom: auto;
  }
`

export const FailedRow = () =>
  <Row>
    <span>failed</span>
    <span>☠️</span>
  </Row>