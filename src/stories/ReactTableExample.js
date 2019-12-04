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
    if (filter.empty) {
      return {
        list: [],
        lastPage: 1
      }
    }

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
  const [minRows, setMinRows] = useState(10)
  const [filterState, setFilterState] = useState({})

  const handleRefresh = useCallback(() => {
    refresh(1)
  }, [refresh])

  const toggleFilter = useCallback(() => {
    if (filterState.gender === 'female') {
      const newFilter = {
        ...filterState
      }
      delete newFilter.gender
      setFilterState(newFilter)
      return newFilter
    } else {
      const newFilter = {
        ...filterState,
        gender: 'female'
      }
      setFilterState(newFilter)
      return newFilter
    }
  }, [filterState])

  const handleFilter = useCallback(() => {
    const newFilter = toggleFilter()
    filter(1, newFilter)
  }, [filter, toggleFilter])

  const handleEmptyFilter = useCallback(() => {
    const newFilter = {
      ...filterState
    }

    if (newFilter.empty === true) {
      newFilter.empty = false
    } else {
      newFilter.empty = true
    }
    setFilterState(newFilter)
    filter(1, newFilter)
  }, [filter, filterState])

  return (
    <>
      <Buttons horizontal spacing={16} className='active'>
        <Button label='Refresh' onClick={handleRefresh} />
        <Button variant={filterState.gender ? 'primary' : 'outline'} label='Ladies Night' onClick={handleFilter} />
        <Button variant={filterState.empty ? 'primary' : 'outline'} label={filterState.empty ? 'Full' : 'Empty'} onClick={handleEmptyFilter} />
      </Buttons>
      <ReactTable
        minRows={minRows}
        noDataText={'We couldn\'t find any people'}
        className='-highlight'
        showPageSizeOptions
        showPageJump
        pageSizeOptions={[5, 10, 15, 20, 60, 200]}
        defaultPageSize={20}
        id='example-table'
        fetchData={async (page, pageSize, sort, filter) => {
          const results = await api.getPeople(page, pageSize, sort, filter)
          if (results.list.length > 0) {
            setMinRows(0)
          } else {
            setMinRows(10)
          }
          return results
        }}
        columns={columns}
      />
    </>
  )
}
