import React from 'react'
import styled from '@emotion/styled'
import SettingToggle from './setting-toggle.jsx'
import IconTooltip from './icon-tooltip.jsx'

const Container = styled.div`
  display: flex
`

const ExcludePreviousToggle = props => {
  return <Container>
    <SettingToggle
      {...props}
      setting="excludePrevious"
      label="Exclude previous puzzle words"
      disabledWhen={s => s.wholeDictionary}
    />
    <IconTooltip>
      <p>
        Exclude words that have already been used as puzzles from the list of possible words.
      </p>
    </IconTooltip>
  </Container>
}

export default ExcludePreviousToggle