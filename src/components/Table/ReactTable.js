import React, { useState, useReducer, useEffect, useCallback, useRef, useMemo } from 'react'
import Table, { ReactTableDefaults } from 'react-table'
import { Header, Pagination } from './TableComponents'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import get from 'lodash/get'
import { useEvent } from '../../hooks'

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'success':
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...action.data,
          list: action.data.list
        }
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

const handleDataFetch = (page, pageSize, sort) => async (promise, dispatch) => {
  dispatch({ type: 'load' })
  if (page < 0) {
    dispatch({ type: 'failure', error: new Error('Cannot fetch page below 1') })
    return
  }

  try {
    const results = await promise(page, pageSize, sort)
    const data = {
      ...results,
      page: page - 1,
      pageSize
    }
    dispatch({ type: 'success', data })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

const initialState = (pageSize) => ({
  loading: true,
  data: {
    page: 0,
    pages: 1,
    pageSize,
    list: [],
    next: () => null,
    prev: () => null,
    lastPage: 1
  },
  error: null
})

export const ReactTable = props => {
  const {
    id,
    columns,
    defaultPageSize,
    pageSizeOptions,
    fetchData,
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
  const [state, dispatch] = useReducer(dataReducer, initialState(defaultPageSize))
  const [sort, setSort] = useState({ order: 'none', column: '' })
  const _id = useRef(id || shortid.generate())

  const refetchData = useCallback((page) => {
    handleDataFetch(page, state.data.pageSize, sort)(fetchData, dispatch)
  }, [state.data.pageSize, fetchData, dispatch])

  useEvent(`refresh-${_id.current}`, refetchData)

  useEffect(() => {
    handleDataFetch(state.data.page + 1, state.data.pageSize, sort)(fetchData, dispatch)
  }, [fetchData, dispatch])

  const onPageChange = useCallback((pageId) => {
    handleDataFetch(pageId + 1, state.data.pageSize, sort)(fetchData, dispatch)
  }, [state, state.data.pageSize, fetchData, dispatch])

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
    handleDataFetch(state.data.page + 1, state.data.pageSize, currentSort)(fetchData, dispatch)
  }, [sort, setSort, state.data.pageSize, fetchData, dispatch, handleDataFetch, state.data.page])

  const onPageSizeChange = useCallback((pageSize, pageIndex) => {
    handleDataFetch(pageIndex + 1, pageSize, sort)(fetchData, dispatch)
  }, [dispatch, fetchData, sort])

  const extendedColumns = useMemo(() => {
    return columns.map(column => ({
      ...ReactTableDefaults,
      ...column
    }))
  }, [columns])

  const handleGetTheadThProps = useCallback((state, rowInfo, column, instance) => {
    let additionalThProps = {}
    if (typeof getTheadThProps === 'function') {
      additionalThProps = getTheadProps(state, rowInfo, column, instance)
    }
    return {
      sorted: get(state, 'sorted[0]', {}),
      id: column.id,
      ...additionalThProps
    }
  }, [getTheadThProps])

  const handleGetTdProps = useCallback((state, rowInfo, column, instance) => {
    const lastRowIndex = get(state, 'pageSize', 0) - 1
    const currentRow = get(rowInfo, 'index', null)
    let additionalTdProps = { style: {} }

    if (typeof getTdProps === 'function') {
      additionalTdProps = getTdProps(state, rowInfo, column, instance)
    }

    const style = {
      ...additionalTdProps.style,
      backgroundColor: '#F5F5F5',
      borderLeft: 'solid 1px white',
      borderRight: 'solid 1px white'
    }

    if (lastRowIndex !== -1 && currentRow !== null && lastRowIndex !== currentRow) {
      style.borderBottom = 'solid 2px white'
    }

    return { ...additionalTdProps, style }
  }, [getTdProps])

  return (
    <Table
      manual
      className={className}
      showPageSizeOptions={showPageSizeOptions}
      showPageJump={showPageJump}
      page={state.data.page}
      pages={state.data.lastPage}
      pageSize={state.data.pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageSizeChange={onPageSizeChange}
      loading={state.loading}
      data={state.data.list}
      onPageChange={onPageChange}
      onSortedChange={onSortedChange}
      columns={extendedColumns}
      getProps={getProps}
      getTableProps={getTableProps}
      getTheadGroupProps={getTheadGroupProps}
      getTheadGroupTrProps={getTheadGroupTrProps}
      getTheadGroupThProps={getTheadGroupThProps}
      getTheadProps={getTheadProps}
      getTheadTrProps={getTheadTrProps}
      ThComponent={Header}
      getTheadThProps={handleGetTheadThProps}
      getTheadFilterProps={getTheadFilterProps}
      getTheadFilterTrProps={getTheadFilterTrProps}
      getTheadFilterThProps={getTheadFilterThProps}
      getTbodyProps={getTbodyProps}
      getTrGroupProps={getTrGroupProps}
      getTrProps={getTrProps}
      getTdProps={handleGetTdProps}
      getPaginationProps={getPaginationProps}
      getLoadingProps={getLoadingProps}
      getNoDataProps={getNoDataProps}
      getResizerProps={getResizerProps}
      PaginationComponent={Pagination}
      showPaginationTop
      showPaginationBottom
    />
  )
}

ReactTable.defaultProps = {
  fetchData: () => ({ list: [], lastPage: 0 }),
  showPageSizeOptions: false,
  showPageJump: false,
  defaultPageSize: 25,
  columns: []
}

ReactTable.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  defaultPageSize: PropTypes.number,
  fetchData: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  showPageSizeOptions: PropTypes.bool,
  showPageJump: PropTypes.bool,
  /** https://www.npmjs.com/package/react-table#columns */
  columns: PropTypes.array,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
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
