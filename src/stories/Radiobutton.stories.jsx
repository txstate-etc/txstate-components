import React from 'react'
import { storiesOf } from '@storybook/react'
import { Radiobutton } from '../components'

storiesOf('Radiobutton', module)
    .add('basic', () => {
        return <Radiobutton
            ariaLabel='Radiobutton'
            label='Select'
        >
        </Radiobutton>
    })