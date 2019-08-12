import React, { useReducer, useState, useEffect } from 'react'
import ReactTable from 'react-table'
import get from 'lodash.get'
import './Table.css'

const getIndicesOfPage = (page, pageSize) => {
  return {
    start: page * pageSize,
    end: (page + 1) * pageSize
  }
}

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'next':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...action.data,
          list: [...state.data.list, ...action.data.list]
        }
      }
    case 'sort': {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data
      }
    }
    case 'success':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data
      }
    case 'failure':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

const handleDataFetch = async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise()
    dispatch({ type: 'success', data: results })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const handleNextData = async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise()
    dispatch({ type: 'next', data: results })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const handleSortData = async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise()
    dispatch({ type: 'sort', data: results })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const initialState = {
  loading: true,
  data: {
    list: [],
    next: () => null,
    prev: () => null,
    total: 0
  },
  error: null
}

export const Table = props => {
  const { columns, getData, pageSize, fetchData, handleSort } = props
  const [state, dispatch] = useReducer(dataReducer, initialState)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    handleDataFetch(fetchData, dispatch)
  }, [getData, dispatch])

  useEffect(() => {
    const total = get(state, 'data.total', 0)
    setPages(Math.ceil(total / pageSize))
  }, [pageSize, setPages, state.data.total])

  useEffect(() => {

  }, [state.data])

  const { start, end } = getIndicesOfPage(page, pageSize)

  return (
    <ReactTable
      manual
      showPageSizeOptions={false}
      showPageJump={false}
      page={page}
      pages={pages}
      pageSize={pageSize}
      loading={state.loading}
      data={state.data.list.slice(start, end)}
      onPageChange={pageId => {
        const data = get(state, 'data.list', [])
        const { start, end } = getIndicesOfPage(pageId + 1, pageSize)
        if (data.slice(start, end).length < pageSize) {
          handleNextData(get(state, 'data.next'), dispatch)
        }
        setPage(pageId)
      }}
      onSortedChange={sorted => {
        const column = get(sorted, '[0].id')
        const descending = get(sorted, '[0].desc')

        const sort = {}

        if (descending !== undefined && column !== undefined) {
          sort.order = descending ? 'desc' : 'asc'
          sort.column = column
        }
        setPage(0)
        handleSortData(() => handleSort(sort), dispatch)
      }}
      columns={columns}
    />
  )
}

Table.defaultProps = {
  data: {
    list: [],
    next: () => null,
    prev: () => null,
    total: 0
  },
  columns: []
}
