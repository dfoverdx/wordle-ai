import React from 'react';
import styled from '@emotion/styled';
import { Button as MUIButton } from '@mui/material';
import moment from 'moment';

const StyledButton = styled(MUIButton)`
  width: 150px;
`

const Button = ({
  word,
  valid,
  onSubmit,
  onSetToCurrent,
  onClear,
}) =>
  !word ?
    <StyledButton onClick={onSetToCurrent}>
      Today's word
    </StyledButton> :
  !valid ?
    <StyledButton onClick={onClear}>Clear</StyledButton> : 
  <StyledButton onClick={onSubmit}>Go</StyledButton>

export default Button