import React from 'react'
import { ReactTable } from '../components'
import axios from 'axios'
import { get } from 'lodash'

const randomUser = axios.create({
  baseURL: 'https://randomuser.me/api'
})

const api = {
  async getPeople(page = 0, pageSize = 10, sort = { order: 'none', column: '' }) {
    const totalResults = 24
    await new Promise(resolve => setTimeout(resolve, 1000))
    const start = page * pageSize
    let end = pageSize * (page + 1)
    const isLastPage = end > totalResults
    if (isLastPage) {
      end = totalResults
    }

    switch (sort.order) {
      case 'asc':
        const ascendingResults = await randomUser.get(`?results=${totalResults}&seed=potluck`)
        ascendingResults.data.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return 1
          if (get(a, sort.column) < get(b, sort.column)) return -1
          return 0
        })
        ascendingResults.data.results = ascendingResults.data.results.slice(start, end)
        return {
          list: ascendingResults.data.results,
          total: totalResults
        }
      case 'desc':
        const descendingResults = await randomUser.get(`?results=${totalResults}&seed=potluck`)
        descendingResults.data.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return -1
          if (get(a, sort.column) < get(b, sort.column)) return 1
          return 0
        })
        descendingResults.data.results = descendingResults.data.results.slice(start, end)
        return {
          list: descendingResults.data.results,
          total: totalResults
        }
      default:
        const unsortedResults = await randomUser.get(`?page=${page + 1}&results=${pageSize}&seed=potluck`)
        if (isLastPage) {
          unsortedResults.data.results = unsortedResults.data.results.slice(0, totalResults % pageSize)
        }
        return {
          list: unsortedResults.data.results,
          total: totalResults
        }
    }
  }
}

const buildColumn = (name, accessor, format) => {
  return {
    Header: name,
    accessor
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


export const ReactTableExample = props => {
  return (
    <ReactTable
      pageSize={10}
      fetchData={api.getPeople}
      columns={columns}
    />
  )
}
