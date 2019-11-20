import React, { useMemo } from 'react'

export const Pagination = props => {
  const {
    page,
    pageSize,
    pageText,
    pages
  } = props
  console.log(props)
  const currentPage = useMemo(() => {
    return page + 1
  }, [page])

  return (
    <div>{pageText} {currentPage} of {pages}</div>
  )
}
