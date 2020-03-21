import React, { useState, useReducer, useRef, useCallback, useEffect } from 'react'
import { useEventListener } from '../../hooks/useEventListener'
import { DropdownList } from './DropdownList'
import { DropdownControl } from './DropdownControl'
import { DropdownContainer } from './DropdownContainer'
import { selectedReducer, moveSelection, moveFocus, nonPrintingKeys } from './dropdown.utils'

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
  const [search, setSearch] = useState('')

  const selectRef = useRef<HTMLDivElement>(null)

  const hideDropdownList = useCallback(() => {
    setShowItems(false)
  }, [])

  const handleToggleDropdownList = () => {
    setShowItems(current => !current)
  }

  const handleSelect = useCallback((item: DropdownItemContent, index) => () => {
    dispatch({ payload: { selected: item, index } })
    hideDropdownList()
  }, [hideDropdownList])

  const resetFocus = useCallback(() => {
    if (focused !== 0) setFocused(0)
  }, [focused])

  useEffect(() => {
    if (!showItems) {
      resetFocus()
    }
  }, [showItems, resetFocus])

  useEffect(() => {
    const clearSearchTimeout = setTimeout(() => {
      setSearch('')
    }, 1000)
    return () => clearTimeout(clearSearchTimeout)
  }, [search])

  useEffect(() => {
    if (search === '') return

    const index = items.findIndex(item => item.text.toLowerCase().match(search.toLowerCase()))

    if (index >= 0 && showItems) {
      setFocused(index)
    } else if (index >= 0) {
      dispatch({ payload: { selected: items[index], index } })
    }
  }, [items, showItems, handleSelect, search])

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    if (nonPrintingKeys[event.key]) return
    setSearch(current => `${current}${event.key}`)
  }, selectRef.current)

  useEventListener('click', (event: any) => {
    if (!selectRef.current?.contains?.(event.target)) {
      hideDropdownList()
    }
  })

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Tab':
      case 'Escape':
        hideDropdownList()
        break
      case 'Up':
      case 'ArrowUp':
        if (!showItems) {
          dispatch(moveSelection(selectedState, items).upOne())
        } else {
          setFocused(current => moveFocus(current, items.length).upOne())
        }
        break
      case 'Down':
      case 'ArrowDown':
        if (!showItems) {
          dispatch(moveSelection(selectedState, items).downOne())
        } else {
          setFocused(current => moveFocus(current, items.length).downOne())
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
