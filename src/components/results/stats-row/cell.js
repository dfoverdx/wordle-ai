import styled from '@emotion/styled'

export const Cell = styled('div', {
  shouldForwardProp: p => p !== 'color',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  flex: 1;
  position: relative;
  
  & > :first-child {
    ${({ color }) => ({ color })};
    font-size: 30px;
  }
  
  & > :nth-child(2) {
    font-size: 20px;
    text-align: center;
  }
`
