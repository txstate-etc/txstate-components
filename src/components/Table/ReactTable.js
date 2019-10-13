import React, { useState, useReducer, useEffect, useCallback } from 'react'
import Table from 'react-table'
import './ReactTable.css'
import PropTypes from 'prop-types'
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
  const {
    columns,
    fetchData,
    pageSize,
    showPageSizeOptions,
    showPageJump,
    className,
    getProps,
    getTableProps,
    getTheadGroupProps,
    getTheadGroupTrProps,
    getTheadGroupThProps,
    getTheadProps,
    getTheadTrProps,
    getTheadThProps,
    getTheadFilterProps,
    getTheadFilterTrProps,
    getTheadFilterThProps,
    getTbodyProps,
    getTrGroupProps,
    getTrProps,
    getTdProps,
    getPaginationProps,
    getLoadingProps,
    getNoDataProps,
    getResizerProps
  } = props
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
      className={className}
      showPageSizeOptions={showPageSizeOptions}
      showPageJump={showPageJump}
      page={page}
      pages={pages}
      pageSize={pageSize}
      loading={state.loading}
      data={fetchData().list}
      onPageChange={onPageChange}
      onSortedChange={onSortedChange}
      columns={columns}
      getProps={getProps}
      getTableProps={getTableProps}
      getTheadGroupProps={getTheadGroupProps}
      getTheadGroupTrProps={getTheadGroupTrProps}
      getTheadGroupThProps={getTheadGroupThProps}
      getTheadProps={getTheadProps}
      getTheadTrProps={getTheadTrProps}
      getTheadThProps={getTheadThProps}
      getTheadFilterProps={getTheadFilterProps}
      getTheadFilterTrProps={getTheadFilterTrProps}
      getTheadFilterThProps={getTheadFilterThProps}
      getTbodyProps={getTbodyProps}
      getTrGroupProps={getTrGroupProps}
      getTrProps={getTrProps}
      getTdProps={getTdProps}
      getPaginationProps={getPaginationProps}
      getLoadingProps={getLoadingProps}
      getNoDataProps={getNoDataProps}
      getResizerProps={getResizerProps}
    />
  )
}

ReactTable.defaultProps = {
  data: { list: [], total: 0 },
  showPageSizeOptions: false,
  showPageJump: false,
  pageSize: 10,
  columns: []
}

ReactTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({ list: PropTypes.array, total: PropTypes.number })),
  pageSize: PropTypes.number,
  showPageSizeOptions: PropTypes.bool,
  showPageJump: PropTypes.bool,
  /** https://www.npmjs.com/package/react-table#columns */
  columns: PropTypes.array,
  getProps: PropTypes.func,
  getTableProps: PropTypes.func,
  getTheadGroupProps: PropTypes.func,
  getTheadGroupTrProps: PropTypes.func,
  getTheadGroupThProps: PropTypes.func,
  getTheadProps: PropTypes.func,
  getTheadTrProps: PropTypes.func,
  getTheadThProps: PropTypes.func,
  getTheadFilterProps: PropTypes.func,
  getTheadFilterTrProps: PropTypes.func,
  getTheadFilterThProps: PropTypes.func,
  getTbodyProps: PropTypes.func,
  getTrGroupProps: PropTypes.func,
  getTrProps: PropTypes.func,
  getTdProps: PropTypes.func,
  getPaginationProps: PropTypes.func,
  getLoadingProps: PropTypes.func,
  getNoDataProps: PropTypes.func,
  getResizerProps: PropTypes.func
}
