import React, { useState, useReducer, useRef, useCallback, useEffect } from 'react'
import { useEventListener } from '../../hooks/useEventListener'
import { DropdownList } from './DropdownList'
import { DropdownControl } from './DropdownControl'
import { DropdownContainer } from './DropdownContainer'
import { selectedReducer, moveSelection, moveFocus } from './dropdown.utils'

export interface DropdownItemContent {
  key: string
  text: string
}
interface DropdownProps {
  items: DropdownItemContent[]
  className?: string
}

type Dropdown = React.FunctionComponent<DropdownProps>

export const Dropdown: Dropdown = props => {
  const { items, className } = props
  const [showItems, setShowItems] = useState(false)
  const [selectedState, dispatch] = useReducer(selectedReducer, { selected: null, index: null })

  const [focused, setFocused] = useState(0)

  const selectRef = useRef<HTMLDivElement>(null)

  const hideDropdownList = useCallback(() => {
    if (!showItems) return
    setShowItems(false)
  }, [showItems, setShowItems])

  const handleToggleDropdownList = useCallback(() => {
    setShowItems(current => !current)
  }, [])

  const handleSelect = useCallback((item: DropdownItemContent, index) => () => {
    dispatch({ payload: { selected: item, index } })
    hideDropdownList()
  }, [hideDropdownList])

  const resetFocus = useCallback(() => {
    if (focused !== 0) setFocused(0)
  }, [focused])

  useEffect(() => {
    if (showItems) {
      hideDropdownList()
    }
  }, [showItems, hideDropdownList])

  useEffect(() => {
    if (!showItems) {
      resetFocus()
    }
  }, [showItems, resetFocus])

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 9: // Tab
      case 27: // Escape
        hideDropdownList()
        break
      case 38: // Up arrow
        if (!showItems) {
          dispatch(moveSelection(selectedState, items).upOne())
        } else {
          setFocused(current => moveFocus.upOne(current, items.length))
        }
        break
      case 40: // Down Arrow
        if (!showItems) {
          dispatch(moveSelection(selectedState, items).downOne())
        } else {
          setFocused(current => moveFocus.downOne(current, items.length))
        }
        break
      default:
        break
    }
  }, selectRef.current)

  return (
    <DropdownContainer
      ref={selectRef}
      className={className}
    >
      <DropdownControl
        handleToggleDropdownList={handleToggleDropdownList}
        showItems={showItems}
        label={selectedState?.selected?.text}
      />
      <DropdownList
        items={items}
        focused={focused}
        showItems={showItems}
        handleSelect={handleSelect}
      />
    </DropdownContainer>
  )
}
