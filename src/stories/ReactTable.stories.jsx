import React, { useCallback, useState } from 'react'
import '../components/Table/ReactTable.css'
import { ReactTable, Button, Stack } from '../components'
import { get } from 'lodash'
import { useEvent } from '../hooks'
import styled from 'styled-components'

const Buttons = styled(Stack)`
  width: fit-content;
  padding: 8px;
  &.active {
    background-color: tomato;
  }
`

const api = {
  async getPeople (page, pageSize = 10, sort = { order: 'none', column: '' }, filter = {}) {
    console.log('Getting People')
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
      case 'asc': {
        const res = await fetch(`https://randomuser.me/api?gender=${gender}&results=${totalResults}${gender ? '' : '&seed=potluck'}`)
        const ascendingResults = await res.json()
        ascendingResults.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return 1
          if (get(a, sort.column) < get(b, sort.column)) return -1
          return 0
        })
        ascendingResults.results = ascendingResults.results.slice(start, end)
        return {
          list: ascendingResults.results,
          lastPage: Math.ceil(totalResults / pageSize)
        }
      }
      case 'desc': {
        const res = await fetch(`https://randomuser.me/api?gender=${gender}&results=${totalResults}${gender ? '' : '&seed=potluck'}`)
        const descendingResults = await res.json()
        descendingResults.results.sort((a, b) => {
          if (get(a, sort.column) > get(b, sort.column)) return -1
          if (get(a, sort.column) < get(b, sort.column)) return 1
          return 0
        })
        descendingResults.results = descendingResults.results.slice(start, end)
        return {
          list: descendingResults.results,
          lastPage: Math.ceil(totalResults / pageSize)
        }
      }
      default: {
        const res = await fetch(`https://randomuser.me/api?gender=${gender}&page=${page + 1}&results=${pageSize}${gender ? '' : '&seed=potluck'}`)
        const unsortedResults = await res.json()
        if (isLastPage) {
          unsortedResults.results = unsortedResults.results.slice(0, totalResults % pageSize)
        }
        return {
          list: unsortedResults.results,
          lastPage: Math.ceil(totalResults / pageSize)
        }
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

const MyAwesomeButtonRow = ({ isTop }) => {
  console.log('Is Top: ', isTop)
  return isTop ? (
    <Stack horizontal horizontalAlign='end' spacing={8} style={{ flex: 1 }}>
      <Button label='Download CSV' />
      <Button label='Upload CSV' />
    </Stack>
  ) : null
}

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
        ButtonRow={MyAwesomeButtonRow}
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

export const ReactTableStory = {
  name: 'React Table',
  component: ReactTableExample
}

export default {
  title: 'Components | React Table',
  component: ReactTableExample
}
