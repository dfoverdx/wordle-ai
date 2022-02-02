import React, { useState } from 'react'
import { 
  IconButton, 
  SwipeableDrawer
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import HideTextToggle from './hide-text-toggle.jsx'

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
    <IconButton onClick={handleClick}>
      <SettingsIcon />
    </IconButton>
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