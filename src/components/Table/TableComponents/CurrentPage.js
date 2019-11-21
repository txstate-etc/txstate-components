import React, { useCallback, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Theme } from '../../Theme'

const Hide = styled.span`
  font: inherit;
  margin: 0;
  padding: 8px 12px;
  position: absolute;
  height: 0;
  overflow: hidden;
  white-space: pre;
  visibility: hidden;
`

const CurrentPageContainer = styled.input`
  color: white;
  background-color: ${Theme.maroon.hex()};
  border: none;
  outline: none;
  padding: 8px 12px;
  font: inherit;
  border-radius: 4px;
  font-size: 1rem;
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
      <CurrentPageContainer style={currentPageStyle} type='text' value={currentPage} onChange={handleCurrentPageChange} />
    </form>
  )
}
