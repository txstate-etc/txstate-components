import React, { useState, useReducer, useEffect, useCallback } from 'react'
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

const handleNextData = (page, pageSize, sort) => async (promise, dispatch) => {
  dispatch({ type: 'load' })
  try {
    const results = await promise(page, pageSize, sort)
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
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(pageSize)
  const [sort, setSort] = useState({ order: 'none', column: '' })

  useEffect(() => {
    handleDataFetch(page, pageSize)(fetchData, dispatch)
  }, [fetchData, dispatch])

  useEffect(() => {
    const total = get(state, 'data.total', 0)
    setPages(Math.ceil(total / pageSize))
  }, [pageSize, setPages, state.data.total])

  const onPageChange = useCallback((pageId) => {
    const { start, end } = getPageStartAndEnd(pageId, pageSize)
    const itemsOnNextPage = state.data.list.slice(start, end).length
    if (itemsOnNextPage < pageSize) {
      handleNextData(pageId, pageSize, sort)(fetchData, dispatch)
    }
    setPage(pageId)
  }, [state, pageSize, fetchData, dispatch, setPage])

  const onSortedChange = useCallback(sorted => {
    const column = get(sorted, '[0].id')
    const descending = get(sorted, '[0].desc')

    let currentSort = sort
    if (descending !== undefined && column !== undefined) {
      currentSort = { order: descending ? 'desc' : 'asc', column }
      setSort(currentSort)
    } else {
      currentSort = { order: 'none', column: '' }
      setSort(currentSort)
    }

    setPage(0)
    handleSortData(pageSize, currentSort)(fetchData, dispatch)
  }, [sort, setSort, pageSize, fetchData, dispatch, handleSortData])

  useEffect(() => {
    const { start, end } = getPageStartAndEnd(page, pageSize)
    setStart(start)
    setEnd(end)
  }, [page, pageSize, setStart, setEnd])

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
      onPageChange={onPageChange}
      onSortedChange={onSortedChange}
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
