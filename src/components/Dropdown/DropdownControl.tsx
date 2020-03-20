/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useRef, useEffect } from 'react'
import { Theme } from '../../utils/Theme'

const selectMenu = css`
  padding: 6px 12px;
  border: solid 2px #606060;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  margin: 0;
  background-color: transparent;
  text-align: left;
  min-width: 100px;
  
  &::-moz-focus-inner {
    border: 0;
  }

  &:focus {
    outline: solid ${Theme.maroon.hex()} 2px;
    outline-offset: 2px;
  }
`

interface DropdownControlProps {
  showItems: boolean
  handleToggleDropdownList: () => void
  label?: string
}

type DropdownControl = React.FunctionComponent<DropdownControlProps>

export const DropdownControl: DropdownControl = ({ showItems, handleToggleDropdownList, label = 'Select Item' }) => {
  const dropdownControl = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!showItems && dropdownControl.current) {
      dropdownControl.current?.focus()
    }
  }, [showItems])

  return (
    <button
      ref={dropdownControl}
      onClick={handleToggleDropdownList}
      css={selectMenu}
    >
      {label}
    </button>
  )
}
