import React, { useCallback, useState } from 'react'
import '../components/Table/ReactTable.css'
import { ReactTable, Button, Stack } from '../components'
import axios from 'axios'
import get from 'lodash/get'
import { useEvent } from '../hooks'
import styled from 'styled-components'

const Buttons = styled(Stack)`
  width: fit-content;
  padding: 8px;
  &.active {
    background-color: tomato;
  }
`

const randomUser = axios.create({
  baseURL: 'https://randomuser.me/api'
})

const api = {
  async getPeople (page, pageSize = 10, sort = { order: 'none', column: '' }, filter = {}) {
    const gender = filter.gender
    console.log('Gender: ', gender)
    const totalResults = 59
    await new Promise(resolve => setTimeout(resolve, 300))
    const start = (page - 1) * pageSize
    let end = pageSize * page
    const isLastPage = end > totalResults
    if (isLastPage) {
      end = totalResults
    }

    switch (sort.order) {
      case 'asc':
        const ascendingResults = await randomUser.get(`?gender=${gender}&results=${totalResults}${gender ? '' : '&seed=potluck'}`)
        ascendingResults.data.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return 1
          if (get(a, sort.column) < get(b, sort.column)) return -1
          return 0
        })
        ascendingResults.data.results = ascendingResults.data.results.slice(start, end)
        return {
          list: ascendingResults.data.results,
          lastPage: Math.ceil(totalResults / pageSize)
        }
      case 'desc':
        const descendingResults = await randomUser.get(`?gender=${gender}&results=${totalResults}${gender ? '' : '&seed=potluck'}`)
        descendingResults.data.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return -1
          if (get(a, sort.column) < get(b, sort.column)) return 1
          return 0
        })
        descendingResults.data.results = descendingResults.data.results.slice(start, end)
        return {
          list: descendingResults.data.results,
          lastPage: Math.ceil(totalResults / pageSize)
        }
      default:
        const unsortedResults = await randomUser.get(`?gender=${gender}&page=${page + 1}&results=${pageSize}${gender ? '' : '&seed=potluck'}`)
        if (isLastPage) {
          unsortedResults.data.results = unsortedResults.data.results.slice(0, totalResults % pageSize)
        }
        return {
          list: unsortedResults.data.results,
          lastPage: Math.ceil(totalResults / pageSize)
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
  buildColumn('Gender', 'gender'),
  buildColumn('Age', 'dob.age'),
  buildColumn('Phone', 'phone')
]

export const ReactTableExample = props => {
  const refresh = useEvent('refresh-example-table')
  const filter = useEvent('filter-example-table')
  const [filterState, setFilterState] = useState({})

  const handleRefresh = useCallback(() => {
    refresh(1)
  }, [refresh])

  const toggleFilter = useCallback(() => {
    if (filterState.gender === 'female') {
      setFilterState({})
      return {}
    }

    if (filterState.gender === undefined) {
      setFilterState({ gender: 'female' })
      return { gender: 'female' }
    }
  }, [filterState.gender])

  const handleFilter = useCallback(() => {
    const newFilter = toggleFilter()
    filter(1, newFilter)
  }, [filter, toggleFilter])

  return (
    <>
      <Buttons horizontal spacing={16} className='active'>
        <Button label='Refresh' onClick={handleRefresh} />
        <Button label='Ladies Night' onClick={handleFilter} />
      </Buttons>
      <ReactTable
        showPageSizeOptions
        className='-highlight'
        showPageJump
        pageSizeOptions={[5, 10, 15, 20, 60, 200]}
        defaultPageSize={60}
        id='example-table'
        fetchData={api.getPeople}
        columns={columns}
      />
    </>
  )
}
