import React, { useState } from 'react'
import styled from '@emotion/styled'
import InfoIcon from '@mui/icons-material/InfoOutlined' 
import SettingToggle from './setting-toggle.jsx'
import IconTooltip from './icon-tooltip.jsx'

const Container = styled.div`
  display: flex
`

const RandomToggle = props => {
  const [open, setOpen] = useState(false)
  
  return <Container>
    <SettingToggle
      {...props}
      setting="random"
      label="Use random words"
      disabledWhen={s => s.tryToLose && s.forceHardMode}
    />
    <IconTooltip>
      <p>
        Choose words randomly from the list of remaining words, rather than attempting to choose the words with the most {GREEN} and {YELLOW} tiles.
      </p>
    </IconTooltip>
  </Container>
}
  
export default RandomToggle