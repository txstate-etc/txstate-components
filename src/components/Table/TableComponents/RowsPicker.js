import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Theme } from '../../Theme'
import get from 'lodash/get'

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownOptions = styled.div`
  & span {
    color: ${Theme.charcoal.hex()};
    padding: 8px 12px;
    text-decoration: none;
    display: block;
  }

  &.-reversed-options {
    transform: translateY(calc(-100% - ${({ buttonHeight }) => buttonHeight}px));
  }

  display: ${({ visible }) => visible ? 'block' : 'none'};
  user-select: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.2);
  z-index: 200;
`

const RowOption = styled.span`
  &:hover {
    background-color: #c4c4c4;
  }
  white-space: nowrap;
  cursor: pointer;
`

const DropdownButton = styled.div`
  user-select: none;
  color: white;
  border-radius: 4px;
  background-color: ${Theme.maroon.hex()};
  margin-right: 8px;
  padding: 8px 16px;
  cursor: pointer;
`

export const RowsPicker = props => {
  const { pageSizeOptions, pageSize, handlePageSizeChange, isTop } = props
  const [dropdownVisible, _setDropdownVisible] = useState(false)

  const dropdownButton = useRef()
  const dropdownOptions = useRef()

  const handleOuterClick = useCallback((e) => {
    const target = e.target
    if (dropdownVisible) {
      if (target !== dropdownButton.current) {
        _setDropdownVisible(false)
      }
    }
  }, [dropdownVisible])

  useEffect(() => {
    window.addEventListener('click', handleOuterClick)
    return () => window.removeEventListener('click', handleOuterClick)
  }, [handleOuterClick])

  const toggleDropdown = useCallback(() => {
    _setDropdownVisible(visible => !visible)
  }, [])

  const handleSelection = useCallback(size => () => {
    handlePageSizeChange(size)
  }, [handlePageSizeChange])

  const pageOptions = useMemo(() => {
    if (!isTop) {
      const rowOptions = [...pageSizeOptions]
      return rowOptions.reverse()
    } else {
      return [...pageSizeOptions]
    }
  }, [isTop, pageSizeOptions])

  const buttonHeight = useMemo(() => {
    return get(dropdownButton, 'current.offsetHeight', 0)
  }, [dropdownButton.current])

  const optionsClassName = useMemo(() => isTop ? '' : '-reversed-options', [isTop])

  return (
    <Dropdown>
      <DropdownButton ref={dropdownButton} onClick={toggleDropdown}>{pageSize} rows</DropdownButton>
      <DropdownOptions buttonHeight={buttonHeight} className={optionsClassName} ref={dropdownOptions} visible={dropdownVisible}>
        {pageOptions.map((size) => <RowOption key={size} onClick={handleSelection(size)}>{size} rows</RowOption>)}
      </DropdownOptions>
    </Dropdown>
  )
}
