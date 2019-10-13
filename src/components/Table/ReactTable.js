import React, { useState, useReducer, useEffect } from 'react'
import Table from 'react-table'
import './ReactTable.css'
import { get } from 'lodash'

const getPageStartAndEnd = (page = 0, pageSize = 10) => {
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

const handleDataFetch = (page, pageSize) => async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise(page, pageSize)
    dispatch({ type: 'success', data: results })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const handleNextData = (page, pageSize) => async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise(page, pageSize)
    dispatch({ type: 'next', data: results })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const handleSortData = (pageSize, sort) => async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise(0, pageSize, sort)
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


export const ReactTable = props => {
  const { columns, pageSize, fetchData } = props
  const [state, dispatch] = useReducer(dataReducer, initialState)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    handleDataFetch(page, pageSize)(fetchData, dispatch)
  }, [fetchData, dispatch])

  useEffect(() => {
    const total = get(state, 'data.total', 0)
    setPages(Math.ceil(total / pageSize))
  }, [pageSize, setPages, state.data.total])

  useEffect(() => {
    console.log('PAGE: ', page)
  }, [page])

  const { start, end } = getPageStartAndEnd(page, pageSize)

  return (
    <Table
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
        const { start, end } = getPageStartAndEnd(pageId, pageSize)
        if (data.slice(start, end).length < pageSize && (pageId + 1) * pageSize < state.data.total) {
          handleNextData(pageId, pageSize)(fetchData, dispatch)
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
        handleSortData(pageSize, sort)(fetchData, dispatch)
      }}
      columns={columns}
    />
  )
}

ReactTable.defaultProps = {
  data: {
    list: [],
    next: () => null,
    prev: () => null,
    total: 0
  },
  columns: []
}
