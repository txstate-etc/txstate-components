import React, { useMemo, useCallback } from 'react'
import { Pages } from './Pages'

export const Pagination = props => {
  const {
    page,
    pageSize,
    pageSizeOptions,
    pageText,
    pages,
    isTop,
    canNext,
    canPrevious,
    onPageChange,
    onPageSizeChange
  } = props

  const currentPage = useMemo(() => {
    return page + 1
  }, [page])

  const handleNext = useCallback(() => {
    if (canNext) onPageChange(page + 1)
  }, [onPageChange, page, canNext])

  const handlePrev = useCallback(() => {
    if (canPrevious) onPageChange(page - 1)
  }, [onPageChange, page, canPrevious])

  const handlePageJump = useCallback((nextPage) => {
    if (nextPage >= 0 && nextPage < pages && nextPage !== page) {
      onPageChange(nextPage)
    }
  }, [pages, page])

  const handlePageSizeChange = useCallback((newPageSize) => {
    if (pageSizeOptions.includes(newPageSize) && pageSize !== newPageSize) {
      const currentRow = pageSize * page
      const newPage = Math.floor(currentRow / newPageSize)
      onPageSizeChange(newPageSize, newPage)
    }
  }, [pageSize, pageSizeOptions, onPageSizeChange])

  return (
    <Pages
      pageText={pageText}
      page={currentPage}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      isTop={isTop}
      lastPage={pages}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handlePageJump={handlePageJump}
      handlePageSizeChange={handlePageSizeChange}
      disableNext={!canNext}
      disablePrevious={!canPrevious}
    />
  )
}
