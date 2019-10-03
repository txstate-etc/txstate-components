import { useReducer, useState, useCallback, useEffect } from 'react'

const tableReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'success':
      return {
        ...state,
        loading: false,
        firstLoad: false,
        data: action.payload.data,
        total: action.payload.total,
        error: null
      }
    case 'failure':
      return {
        ...state,
        error: action.error,
        loading: false
      }
  }
}

export const useTable = ({ initialPageSize = 10, dataSource }) => {
  const [tableState, tableAction] = useReducer(tableReducer, { data: [], total: 10 })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const onChangePage = useCallback((page, totalRows) => {
    setPage(page)
  }, [setPage])

  const onChangeRowsPerPage = useCallback((pageSize, page) => {
    setPageSize(pageSize)
  }, [setPageSize])

  const fetchData = useCallback(async ({ page, sort, pageSize }) => {
    tableAction({ type: 'loading' })

    try {
      const { data, total } = await dataSource(page, pageSize, sort)
      tableAction({ type: 'success', payload: { data, total } })
    } catch (error) {
      console.log(error.message)
      tableAction({ type: 'failure', error })
    }
  }, [tableAction, dataSource])

  const onSort = useCallback((column, sortDirection) => {
    fetchData({
      page: 1,
      pageSize,
      sort: { order: sortDirection, selector: column.selector, column }
    })
  }, [fetchData, pageSize])

  useEffect(() => {
    fetchData({ page, pageSize })
  }, [fetchData, page, pageSize])

  return {
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    paginationTotalRows: tableState.total,
    paginationPerPage: pageSize,
    firstLoad: tableState.firstLoad,
    fetchingPage: tableState.loading,
    data: tableState.data
  }
}
