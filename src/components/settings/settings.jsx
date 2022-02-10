import React, { useState, memo } from 'react'
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
import ShuffleToggle from './shuffle-toggle.jsx'
import AnyFirstWordToggle
  from './any-first-word-toggle.jsx'
import RandomToggle from './random-toggle.jsx'
import HardModeToggle from './hard-mode-toggle.jsx'
import AutoplayToggle from './autoplay-toggle.jsx'

const Drawer = styled(MUIDrawer)`
  & .MuiDrawer-paper {
    padding: .5rem 1rem;
    overflow: visible;
  }
`

const H2 = styled.h2`
  font-size: 1.3rem;
  font-family: sans-serif;
  margin: 6px 0 4px;
`

const H3 = styled(props => <H2 as="h3" {...props} />)`
  font-size: 1.1rem;
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
        <H2>Settings</H2>
        <H3>Display</H3>
        <AutoplayToggle {...props} />
        <HideTextToggle {...props} />
        <ShowWordsLeftToggle {...props} />
        <H3>AI</H3>
        <HardModeToggle {...props} />
        <AnyFirstWordToggle {...props} />
        <RandomToggle {...props} />
        <ShuffleToggle {...props} />
        <DecisiveThreshold {...props} />
      </Drawer>
    </>
  },
  _.isEqual
)