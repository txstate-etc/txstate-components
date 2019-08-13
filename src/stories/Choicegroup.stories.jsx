import React from 'react'
import { storiesOf } from '@storybook/react'
import { Choicegroup } from '../components'

storiesOf('Choicegroup', module)
    .add('basic', () => {
        return <Choicegroup
            ariaLabel='Choicegroup1'
            label='Select One: '
            required= 'true'
            name='Test'
            options={
                [
                    {
                        key:'A',
                        text:'Apple'
                    },
                    {
                        key:'B',
                        text:'Banana'
                    },
                    {
                        key:'C',
                        text:'Carrot'
                    },
                    {
                        key:'D',
                        text:'Dragon Fruit'
                    }
                ]
            }
        >
        </Choicegroup>
    })