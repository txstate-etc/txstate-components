import React, { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { CurrentPage } from './CurrentPage'
import { RowsPicker } from './RowsPicker'
import { Theme } from '../../Theme'
import { Stack } from '../../Stack'
import { SvgChevronIcon } from '../../Svg'

const PageContainer = styled(Stack)`
  padding: 8px 0;
`

const Text = styled.span`
  color: ${Theme.charcoal.hex()};
`

const TotalPages = styled(Text)``
const PageText = styled(Text)``
const OfText = styled(Text)``

const Next = styled.span`
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transform: rotate(-90deg);
`

const Prev = styled(Next)`
  transform: rotate(90deg);
`

const Pages = props => {
  const {
    page,
    lastPage,
    pageSize,
    pageSizeOptions,
    handleNext,
    handlePrev,
    handlePageJump,
    handlePageSizeChange,
    disableNext,
    disablePrevious
  } = props

  const nextColor = useMemo(() => disableNext ? '#c4c4c4' : '#363534', [disableNext])
  const prevColor = useMemo(() => disablePrevious ? '#c4c4c4' : '#363534', [disablePrevious])
  const pageText = useMemo(() => lastPage === 1 ? 'page' : 'pages', [lastPage])

  return (
    <PageContainer horizontal horizontalAlign='end' verticalAlign='center' spacing={6}>
      <RowsPicker
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        handlePageSizeChange={handlePageSizeChange}
      />
      <CurrentPage
        handlePageJump={handlePageJump}
        page={page}
      />
      <OfText>of</OfText>
      <TotalPages>{lastPage}</TotalPages>
      <PageText>{pageText}</PageText>
      <Stack horizontal spacing={8}>
        <Prev horizontalAlign='center' veritcalAlign='center' disabled={disablePrevious} onClick={handlePrev}>
          <SvgChevronIcon width={28} height={28} fill={prevColor} />
        </Prev>
        <Next disabled={disableNext} onClick={handleNext} horizontalAlign='center' veritcalAlign='center' >
          <SvgChevronIcon width={28} height={28} fill={nextColor} />
        </Next>
      </Stack>
    </PageContainer>
  )
}

export const Pagination = props => {
  const {
    page,
    pageSize,
    pageSizeOptions,
    pageText,
    pages,
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
