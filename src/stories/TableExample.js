import React from 'react'
import { Table } from '../components'
import axios from 'axios'
import get from 'lodash.get'

const randomUser = axios.create({
  baseURL: 'https://randomuser.me/api'
})

const api = {
  async getPeople (page = 1, pageSize = 10, sort = { order: 'none', selector: '' }) {
    const totalResults = 48
    await new Promise(resolve => setTimeout(resolve, 1000))
    const results = await randomUser.get(`?page=${page}&results=${pageSize}&seed=potluck`)
    switch (sort.order) {
      case 'asc':
        results.data.results.sort((a, b) => {
          if (get(a, sort.selector) > get(b, sort.selector)) return 1
          if (get(a, sort.selector) < get(b, sort.selector)) return -1
          return 0
        })
        return {
          data: results.data.results,
          total: totalResults
        }
      case 'desc':
        results.data.results.sort((a, b) => {
          if (get(a, sort.selector) > get(b, sort.selector)) return -1
          if (get(a, sort.selector) < get(b, sort.selector)) return 1
          return 0
        })
        return {
          data: results.data.results,
          total: totalResults
        }
      default:
        return {
          data: results.data.results,
          total: totalResults
        }
    }
  }
}

const buildColumn = (name, selector, format) => {
  return {
    name,
    selector,
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

export const TableExample = props => {
  return (
    <Table
      title='People'
      columns={columns}
      dataSource={api.getPeople}
      initialPageSize={10}
    />
  )
}
