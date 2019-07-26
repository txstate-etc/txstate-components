import React from 'react'
import { storiesOf } from '@storybook/react'
import { List } from '../React'
import axios from 'axios'

const getData = async () => {
  try {
    const response = await axios.get('https://swapi.co/api/people')
    const items = response.data.results
    return items
  } catch (err) {
    console.error(err)
    return []
  }
}

const columns = [
  { key: 'column1', name: 'Name', fieldName: 'name' },
  { key: 'column2', name: 'Height', fieldName: 'height' },
  { key: 'column3', name: 'Mass', fieldName: 'mass' },
  { key: 'column4', name: 'Hair Color', fieldName: 'hair_color' },
  { key: 'column5', name: 'Skin Color', fieldName: 'skin_color' },
  { key: 'column6', name: 'Eye Color', fieldName: 'eye_color' }
]

storiesOf('List', module)
  .add('basic', () => {
    return (
      <List
        dataSource={getData}
        columns={columns}
      />
    )
  })
