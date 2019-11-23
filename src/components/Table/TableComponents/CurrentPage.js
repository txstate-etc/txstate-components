import React, { useCallback, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useEvent } from '../../../hooks/useEvent'
import { Theme } from '../../Theme'

const Hide = styled.span`
  font: inherit;
  margin: 0;
  min-width: 16px;
  padding: 8px 4px;
  position: absolute;
  height: 0;
  overflow: hidden;
  white-space: pre;
  visibility: hidden;
`

const CurrentPageContainer = styled.input`
  color: ${Theme.charcoal.hex()};
  border: none;
  outline: none;
  padding: 0 4px;
  font: inherit;
  font-size: 1rem;
  min-width: 16px;
  border-bottom: 1px solid ${Theme.charcoal.hex()};
`

export const CurrentPage = props => {
  const { page, handlePageJump } = props
  const [currentPage, setCurrentPage] = useState(page)
  const [pageWidth, setPageWidth] = useState(0)

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    handlePageJump(currentPage - 1)
  }, [handlePageJump, currentPage])

  const setWidth = useCallback((width) => {
    if ((width) !== pageWidth) setPageWidth(width)
  }, [pageWidth])

  const handleCurrentPageChange = useCallback((e) => {
    const nextPage = e.target.value

    try {
      let newPage = parseInt(nextPage)
      if (isNaN(newPage)) newPage = ''
      if (currentPage !== newPage) {
        const hide = document.getElementById('hide')
        hide.textContent = newPage
        setWidth(hide.offsetWidth)
        setCurrentPage(newPage)
      }
    } catch {}
  }, [currentPage, page])

  useEffect(() => {
    const hide = document.getElementById('hide')
    hide.textContent = page
    setWidth(hide.offsetWidth)
    setCurrentPage(page)
  }, [page])

  const currentPageStyle = useMemo(() => {
    if (!pageWidth) return { width: 0 }

    return { width: pageWidth }
  }, [pageWidth])

  return (
    <form onSubmit={onSubmit}>
      <Hide id="hide"></Hide>
      <CurrentPageContainer
        autocomplete='off'
        style={currentPageStyle}
        value={currentPage}
        onChange={handleCurrentPageChange}
      />
    </form>
  )
}
