import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '../components'
import axios from 'axios'
import get from 'lodash.get'

storiesOf('Table', module)
  .add('basic', () => {
    const getStarWarsPeople = (url) => async () => {
      if (!url) {
        return {
          next: null,
          total: 0,
          list: []
        }
      }

      const results = await axios.get(url)
      const data = {}

      data.next = getStarWarsPeople(get(results, 'data.next'), null)

      data.total = get(results, 'data.count', 0)
      data.list = get(results, 'data.results', [])
      return data
    }

    const getSortedStarWarsPeople = async ({ column, order }) => {
      const data = await getStarWarsPeople('https://swapi.co/api/people/?format=json')()
      if (column) {
        data.list.sort((a, b) => {
          const multiplier = order === 'desc' ? -1 : 1
          if (a[column] < b[column]) return multiplier * -1
          if (a[column] > b[column]) return multiplier * 1
          return 0
        })
      }
      return data
    }

    const columns = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Height', accessor: 'height' },
      { Header: 'Birth Year', accessor: 'birth_year' }
    ]

    return (
      <Table
        pageSize={7}
        columns={columns}
        handleSort={getSortedStarWarsPeople}
        fetchData={getStarWarsPeople('https://swapi.co/api/people/?format=json')}
      />
    )
  })
