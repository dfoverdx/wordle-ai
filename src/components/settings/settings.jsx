import React, { useState, useCallback, memo } from 'react'
import { 
  IconButton, 
  Drawer as MUIDrawer
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import _ from 'lodash'
import HideTextToggle from './hide-text-toggle.jsx'
import DecisiveThreshold from './decisive-threshold.jsx'
import ShowWordsLeftToggle 
  from './show-words-left-toggle.jsx'

const Drawer = styled(MUIDrawer)`
  & .MuiDrawer-paper {
    padding: .5rem 1rem;
  }
`

export const Settings = memo(
  ({ onChange, settings }) => {
    const [ open, setOpen ] = useState(false)
    
    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const props = { settings, onChange }
    
    return <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
      >
        <HideTextToggle {...props} />
        <ShowWordsLeftToggle {...props} />
        <DecisiveThreshold {...props} />
      </Drawer>
    </>
  },
  _.isEqual
)