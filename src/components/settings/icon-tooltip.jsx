import React, { useState } from 'react'
import {
  Tooltip as MuiTooltip,
  IconButton,
  ClickAwayListener,
} from '@mui/material'
import styled from '@emotion/styled'
import InfoIcon from '@mui/icons-material/InfoOutlined'

const Tooltip = styled(MuiTooltip)`
  & .MuiTooltip-popper {
    z-index: 1300;
  }
`

const IconTooltip = ({ 
  icon = <InfoIcon />, 
  children, 
  ...props 
}) => {
  const [open, setOpen] = useState(false)
  const title = 
    <ClickAwayListener
      onClickAway={() => setOpen(false)}
    >
      <div>{children}</div>
    </ClickAwayListener>
    
  return (
    <Tooltip 
      title={title} 
      open={open}
      arrow
      {...props}
    >
      <IconButton onClick={() => setOpen(s => !s)}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default IconTooltip