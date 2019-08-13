import React from 'react'
import { storiesOf } from '@storybook/react'
import { Portal } from '../components/Portal'

storiesOf('Portal', module).add('basic', () => {
  return (
    <>
      <Portal>
        <h2>A portal to the top</h2>
        <p>Some common uses:</p>
        <ul>
          <li>Modals</li>
          <li>Notifications</li>
          <li>Dialog Boxes</li>
        </ul>
      </Portal>
    </>
  )
})
