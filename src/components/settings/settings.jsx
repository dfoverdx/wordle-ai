import React, { useState, memo, Fragment } from 'react'
import { 
  IconButton, 
  Drawer as MUIDrawer
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import _ from 'lodash'
import inputs from './inputs'

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
        {inputs.map(([group, list]) => 
          <Fragment key={group}>
            <H3>{group}</H3>
            {list.map(Input =>
              <Input key={Input.name} {...props} />)}
          </Fragment>
        )}
      </Drawer>
    </>
  },
  _.isEqual
)