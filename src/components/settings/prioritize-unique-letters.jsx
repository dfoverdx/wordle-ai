import React from 'react'
import styled from '@emotion/styled'
import SettingToggle from './setting-toggle.jsx'
import IconTooltip from './icon-tooltip.jsx'

const Container = styled.div`
  display: flex
`

const PrioritizeUniqueLettersToggle = props => {
  return <Container>
    <SettingToggle
      {...props}
      setting="prioritizeUniqueLetters"
      label="Prioritize unique letters"
      disabledWhen={s => s.random || s.tryToLose}
      forceChecked={
        s =>
          s.random ? false :
          s.tryToLose ? true :
          null
      }
    />
    <IconTooltip>
      <p>
        Choose words with the most unique letters first.  This can have both positive and negative effects.  Typically, ruling in or out the most letters at once rules out the most words.
      </p>
      <p>However, consider <code>SALAD</code>.  The AI will reduce the list of words down to three: <code>SALAD</code>, <code>SALSA</code>, and <code>SALVO</code>.  If this setting is enabled, it will choose <code>SALVO</code> because the other two have two A's--non-unique letters.  Once it determines that <code>SALVO</code> is incorrect, it does not know which of the remaining two words it is.  If it had chosen either <code>SALAD</code> or <code>SALSA</code> and had been wrong, it would know which word is right.
      </p>
    </IconTooltip>
  </Container>
}

export default PrioritizeUniqueLettersToggle