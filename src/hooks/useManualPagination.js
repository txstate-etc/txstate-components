import { useState, useMemo } from 'react'

const useManualPagination = (data = [], pageSize = 10) => {
  const [page, setPage] = useState(0)

  const onPageChange = pageIndex => {
    setPage(pageIndex)
  }

  const { _pages, _pagedData } = useMemo(() => {
    return {
      _pages: Math.ceil(data.length / pageSize),
      _pagedData: data.slice ? data.slice(page * pageSize, (1 + page) * pageSize) : []
    }
  }, [data, pageSize, page])

  return {
    page,
    pages: _pages,
    pagedData: _pagedData,
    onPageChange
  }
}

export default useManualPagination
