/** @jsx jsx */
import { useRef, useEffect, useCallback } from 'react'
import { jsx, css } from '@emotion/core'
import { Theme } from '../../utils/Theme'

const selectItem = css`
  padding: 2px;
  margin: 0;
  background-color: transparent;
  border: none;
  display: inline-table;
  width: 100%;
  text-align: left;

  cursor: pointer;

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: solid 2px ${Theme.maroon.hex()};
  }
`

interface DropdownItemProps {
  id: string
  text: string
  focused: boolean
  handleSelect: () => void
}

type DropdownItemComponent = React.FunctionComponent<DropdownItemProps>

export const DropdownItem: DropdownItemComponent = ({ id, text, handleSelect, focused }) => {
  const itemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (focused) {
      itemRef.current?.focus()
    }
  }, [focused])

  return (
    <button
      ref={itemRef}
      id={id}
      className='select-item'
      onClick={handleSelect}
      css={selectItem}
      role='option'
      aria-selected={false}
    >
      {text}
    </button>
  )
}
