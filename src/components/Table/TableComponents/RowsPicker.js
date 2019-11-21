import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Theme } from '../../Theme'

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
  cursor: pointer;
`

const Rows = styled.div`
  user-select: none;
  color: white;
  border-radius: 4px;
  background-color: ${Theme.maroon.hex()};
  margin-right: 8px;
  padding: 8px 12px;
  cursor: pointer;
`

export const RowsPicker = props => {
  const { pageSizeOptions, pageSize, handlePageSizeChange } = props
  const [dropdownVisible, _setDropdownVisible] = useState(false)

  const dropdown = useRef()
  const options = useRef()
  const handleOuterClick = useCallback((e) => {
    const target = e.target
    if (dropdownVisible) {
      if (target !== dropdown.current) {
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

  return (
    <Dropdown>
      <Rows ref={dropdown} onClick={toggleDropdown}>{pageSize} rows</Rows>
      <DropdownOptions ref={options} visible={dropdownVisible}>
        {pageSizeOptions.map((size) => <RowOption key={size} onClick={handleSelection(size)}>{size} rows</RowOption>)}
      </DropdownOptions>
    </Dropdown>
  )
}
