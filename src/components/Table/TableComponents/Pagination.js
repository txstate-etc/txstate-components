import React, { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { CurrentPage } from './CurrentPage'
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
    pageText,
    handleNext,
    handlePrev,
    handlePageJump,
    disableNext,
    disablePrevious
  } = props

  const nextColor = useMemo(() => {
    return disableNext ? '#c4c4c4' : '#363534'
  }, [disableNext])

  const prevColor = useMemo(() => {
    return disablePrevious ? '#c4c4c4' : '#363534'
  }, [disablePrevious])

  return (
    <PageContainer horizontal horizontalAlign='end' verticalAlign='center' spacing={6}>
      <PageText>{pageText}</PageText>
      <CurrentPage
        handlePageJump={handlePageJump}
        page={page}
      />
      <OfText>of</OfText>
      <TotalPages>{lastPage}</TotalPages>
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
    pageText,
    pages,
    canNext,
    canPrevious,
    onPageChange
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

  return (
    <Pages
      pageText={pageText}
      page={currentPage}
      lastPage={pages}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handlePageJump={handlePageJump}
      disableNext={!canNext}
      disablePrevious={!canPrevious}
    />
  )
}
