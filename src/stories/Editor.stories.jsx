import React from 'react'
import { storiesOf } from '@storybook/react'
import { Editor } from '../components'

storiesOf('Editor', module).add('basic', () => {
  return (
    <div style={{ padding: 25 }}>
      <Editor />
    </div>
  )
})
