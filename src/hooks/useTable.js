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
        clearSelectedRows: !state.clearSelectedRows,
        data: action.payload.data || [],
        total: action.payload.total || 0,
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
  const [sort, setSort] = useState()

  const onChangePage = useCallback((page, totalRows) => {
    setPage(page)
  }, [setPage])

  const onChangeRowsPerPage = useCallback((pageSize, page) => {
    setPageSize(pageSize)
  }, [setPageSize])

  const onSort = useCallback((column, sortDirection) => {
    setPage(1)
    setSort({ order: sortDirection, selector: column.selector, column })
  })

  const fetchData = useCallback(async ({ page, sort, pageSize }) => {
    tableAction({ type: 'loading' })

    try {
      console.log(dataSource)
      const { data, total } = await dataSource(page, pageSize, sort)
      const lastPage = Math.ceil(total / pageSize) || 1
      if (page > lastPage) {
        setPage(lastPage)
        await dataSource(lastPage, pageSize, sort)
      }
      tableAction({ type: 'success', payload: { data, total } })
    } catch (error) {
      console.log(error.message)
      tableAction({ type: 'failure', error })
    }
  }, [tableAction, dataSource])

  useEffect(() => {
    fetchData({ page, pageSize, sort })
  }, [fetchData, page, pageSize, sort])

  return {
    onChangePage,
    onChangeRowsPerPage,
    onSort,
    paginationTotalRows: tableState.total,
    paginationPerPage: pageSize,
    firstLoad: tableState.firstLoad,
    fetchData: () => fetchData({ page, sort, pageSize }),
    clearSelectedRows: tableState.clearSelectedRows,
    fetchingPage: tableState.loading,
    data: tableState.data || []
  }
}
