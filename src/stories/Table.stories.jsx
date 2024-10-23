import React from 'react'
import { Table, Button } from '../components'
import { get } from 'lodash'

async function getPeople (page = 1, pageSize = 10, sort = { order: 'none', selector: '' }) {
  const totalResults = 48
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch(`https://randomuser.me/api?page=${page}&results=${pageSize}&seed=potluck`)
  const { results } = await res.json()
  switch (sort.order) {
    case 'asc':
      results.sort((a, b) => {
        if (get(a, sort.selector) > get(b, sort.selector)) return 1
        if (get(a, sort.selector) < get(b, sort.selector)) return -1
        return 0
      })
      return {
        data: results,
        total: totalResults
      }
    case 'desc':
      results.sort((a, b) => {
        if (get(a, sort.selector) > get(b, sort.selector)) return -1
        if (get(a, sort.selector) < get(b, sort.selector)) return 1
        return 0
      })
      return {
        data: results,
        total: totalResults
      }
    default:
      return {
        data: results,
        total: totalResults
      }
  }
}

const buildColumn = (name, selector, format) => {
  return {
    name,
    selector: row => row[selector],
    sortable: true,
    format
  }
}

const capitalize = (selector) => (value) => {
  return get(value, selector, '').charAt(0).toUpperCase() + get(value, selector, '').slice(1)
}

const columns = [
  buildColumn('First Name', 'name.first', capitalize('name.first')),
  buildColumn('Last Name', 'name.last', capitalize('name.last')),
  buildColumn('Age', 'dob.age'),
  buildColumn('Phone', 'phone')
]


export const TableStory = {
  name: 'Table',
  component: Table,
  args: {
    title: 'People',
    columns: columns,
    keyField: 'login.uuid',
    dataSource: getPeople,
    initialPageSize: 10
  }
}

export const SelectableTableStory = {
  name: 'Selectable Table',
  component: Table,
  args: {
    title: 'People',
    columns: columns,
    keyField: 'login.uuid',
    dataSource: getPeople,
    initialPageSize: 10,
    selectableRows: true,
    onSelectedRowsChange: () => console.log('go brr'),
    WithSelectedArea: (props) => {
      return (<Button label='Refresh' onClick={props.refreshData} />)
    }
  }
}

export default {
  title: 'Components | Table',
  component: Table
}
