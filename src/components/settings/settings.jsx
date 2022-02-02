import React, { useState } from 'react'
import { 
  IconButton, 
  SwipeableDrawer
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import HideTextToggle from './hide-text-toggle.jsx'

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px;
`

const Drawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    padding: .5rem 1rem;
  }
`

export const Settings = ({ onChange, settings }) => {
  const [ open, setOpen ] = useState(false)
  
  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = s => 
    onChange({ ...settings, ...s })
  
  return <>
    <ButtonContainer>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
    </ButtonContainer>
    <Drawer
      open={open}
      onClose={handleClose}
      disableSwipeToOpen
      anchor="right"
      onOpen={() => {}}
    >
      <HideTextToggle 
        settings={settings}
        onChange={handleChange}
      />
    </Drawer>
  </>
}