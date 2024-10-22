import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Stack } from '../../Stack'
import { Theme } from '../../Theme'
import { CurrentPage } from './CurrentPage'
import { RowsPicker } from './RowsPicker'
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

export const Pages = props => {
  const {
    page,
    lastPage,
    pageSize,
    pageSizeOptions,
    isTop,
    handleNext,
    handlePrev,
    handlePageJump,
    handlePageSizeChange,
    disableNext,
    disablePrevious,
    ButtonRow
  } = props

  const nextColor = useMemo(() => disableNext ? '#c4c4c4' : '#363534', [disableNext])
  const prevColor = useMemo(() => disablePrevious ? '#c4c4c4' : '#363534', [disablePrevious])
  const pageText = useMemo(() => lastPage === 1 ? 'page' : 'pages', [lastPage])

  return (
    <PageContainer horizontal horizontalAlign='space-between' verticalAlign='center' spacing={6}>
      <Stack horizontal horizontalAlign='end' style={{ flex: 1 }}>
        {ButtonRow && <ButtonRow />}
      </Stack>
      <Stack horizontal horizontalAlign='end' verticalAlign='center' spacing={6}>
        <RowsPicker
          isTop={isTop}
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
      </Stack>
    </PageContainer>
  )
}
