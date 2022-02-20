import React from 'react'
import styled from '@emotion/styled'
import SettingToggle from './setting-toggle.jsx'
import IconTooltip from './icon-tooltip.jsx'

const Container = styled.div`
  display: flex
`

const TryToLoseToggle = props => {
  return <Container>
    <SettingToggle
      {...props}
      setting="tryToLose"
      label="Try to lose"
      disabledWhen={s => s.random || !s.forceHardMode}
      forceChecked={s => !s.forceHardMode ? false : null}
    />
    <IconTooltip>
      <p>
        Use the least helpful word from the list of remaining words, in order to check if it's even possible to lose when guessing a word.
      </p>
      <p>
        <i>Enforce hard mode</i> must be enabled to use this setting.
      </p>
    </IconTooltip>
  </Container>
}

export default TryToLoseToggle