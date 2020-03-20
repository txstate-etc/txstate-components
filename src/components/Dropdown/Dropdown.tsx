/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useReducer, useRef, useCallback, useEffect } from 'react'
import { Maybe } from '../../utils/helper.types'
import { Theme } from '../../utils/Theme'
import { useEventListener } from '../../hooks/useEventListener'
import { DropdownList } from './DropdownList'

export interface DropdownItemContent {
  key: string
  text: string
}
interface DropdownProps {
  items: DropdownItemContent[]
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

  &:focus {
    outline: solid ${Theme.maroon.hex()} 2px;
    outline-offset: 2px;
  }
`

interface SelectedState {
  selected: Maybe<DropdownItemContent>
  index: Maybe<number>
}

interface SelectAction {
  payload: SelectedState
}

const selectedReducer = (state: SelectedState, action: SelectAction) => {
  return {
    ...state,
    ...action.payload
  }
}

export const Dropdown: Dropdown = props => {
  const { items, className } = props
  const [showItems, setShowItems] = useState(false)
  const [selectedState, dispatch] = useReducer(selectedReducer, { selected: null, index: null })

  const [focused, setFocused] = useState(0)
  const selectMenuRef = useRef<HTMLButtonElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback((item: DropdownItemContent, index) => () => {
    const { selected } = selectedState
    if (!selected || selected?.key !== item.key) {
      dispatch({ payload: { selected: item, index } })
      setShowItems(false)
    }
  }, [selectedState])

  useEffect(() => {
    if (!showItems && selectMenuRef.current) {
      setFocused(0)
      selectMenuRef.current?.focus()
    }
  }, [showItems])

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 9: // Tab
      case 27: // Escape
        setShowItems(false)
        break
      case 38: // Up arrow
        if (!showItems) {
          let selectedIndex = selectedState.index
          if ((selectedIndex !== null && selectedIndex - 1 < 0) || selectedIndex === null) {
            selectedIndex = items.length - 1
          } else {
            selectedIndex -= 1
          }
          const nextSelection = items[selectedIndex]
          dispatch({ payload: { selected: nextSelection, index: selectedIndex } })
        } else {
          setFocused(current => {
            if (current - 1 < 0) {
              return items.length - 1
            }
            return current - 1
          })
        }
        break
      case 40: // Down Arrow
        if (!showItems) {
          let selectedIndex = selectedState.index
          if ((selectedIndex !== null && selectedIndex + 1 >= items.length) || selectedIndex === null) {
            selectedIndex = 0
          } else {
            selectedIndex += 1
          }
          const nextSelection = items[selectedIndex]
          dispatch({ payload: { selected: nextSelection, index: selectedIndex } })
        } else {
          setFocused(current => {
            if (current + 1 >= items.length) {
              return 0
            }
            return current + 1
          })
        }
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
      `}
    >
      <button
        ref={selectMenuRef}
        onClick={() => setShowItems(current => !current)}
        css={selectMenu}
      >
        {selectedState.selected?.text ?? 'Select Make'}
      </button>
      <DropdownList
        items={items}
        focused={focused}
        showItems={showItems}
        handleSelect={handleSelect}
      />
    </div>
  )
}
