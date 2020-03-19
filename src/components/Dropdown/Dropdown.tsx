/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useRef, useCallback, useEffect } from 'react'
import { classNames } from '../../utils'
import { Maybe } from '../../utils/helper.types'
import { Theme } from '../../utils/Theme'
import { useEventListener } from '../../hooks/useEventListener'

interface DropdownItem {
  key: string
  text: string
}

interface DropdownProps {
  items: DropdownItem[]
  className?: string
}

type Dropdown = React.FunctionComponent<DropdownProps>

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
`

const selectItems = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${Theme.white.hex()};

  padding: 4px;
  border: solid 2px #606060;
  
  &.shut {
    display: none;
  }
`

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

export const Dropdown: Dropdown = props => {
  const { items, className } = props
  const [showItems, setShowItems] = useState(true)
  const [selected, setSelected] = useState<Maybe<DropdownItem>>(null)
  const [focused, setFocused] = useState(0)
  const selectMenuRef = useRef<HTMLButtonElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback((item: DropdownItem) => () => {
    if (!selected || selected?.key !== item.key) {
      setSelected(item)
      setShowItems(false)
    }
  }, [selected])

  useEffect(() => {
    const selectItem = document.querySelector<HTMLButtonElement>(`.select-item:nth-child(${focused + 1})`)
    if (selectItem) selectItem.focus()
  }, [focused, items])

  useEffect(() => {
    if (showItems) {
      const selectItem = document.querySelector<HTMLButtonElement>('.select-item:nth-child(1)')
      if (selectItem) {
        setFocused(0)
        selectItem.focus()
      }
    } else if (selectMenuRef.current) {
      selectMenuRef.current?.focus()
    }
  }, [showItems])

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 9: // Tab
        setShowItems(false)
        break
      case 27: // Escape
        setShowItems(false)
        break
      case 38: // Up arrow
        setFocused(current => {
          console.log(current)
          if (current - 1 < 0) {
            return items.length - 1
          }
          return current - 1
        })
        break
      case 40: // Down Arrow
        if (!showItems) {
          setShowItems(true)
          break
        }
        setFocused(current => {
          if (current + 1 >= items.length) {
            return 0
          }
          return current + 1
        })
        break
      default:
        break
    }
  }, selectRef.current)

  return (
    <div
      ref={selectRef}
      className={className}
      css={css`
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: block;
        position: relative;
        width: fit-content;
      `}
    >
      <button
        ref={selectMenuRef}
        onClick={() => setShowItems(current => !current)}
        css={selectMenu}
      >
        {selected?.text ?? 'Select Item'}
      </button>
      <div role='listbox' css={selectItems} className={classNames({ shut: !showItems }, 'select-list')} aria-label='options'>
        {items.map((item) => <button className='select-item' onClick={handleSelect(item)} css={selectItem} role='option' aria-selected={false} key={item.key}>{item.text}</button>)}
      </div>
    </div>
  )
}
