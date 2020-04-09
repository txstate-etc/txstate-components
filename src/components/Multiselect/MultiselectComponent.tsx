/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { ScreenReaderOnly } from '../ScreenReaderOnly/ScreenReaderOnly'
import { Theme } from '../../utils/Theme'
import { isModifierKey } from '../../utils'

export interface ItemPair {
  key: string
  text?: string
}

interface MultiselectProps {
  id: string
  name: string
  label: string
  items: ItemPair[]
  addSelection: (item: ItemPair) => void
  removeSelection: (item: ItemPair) => void
  selected?: ItemPair[]
  placeholder?: string
  searchChanged?: (value: string) => void
  allowFreeText?: boolean
}

type MultiselectFC = React.FunctionComponent<MultiselectProps>

const ulCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  & li {
    cursor: pointer;
  }
`

const fieldsetCSS = css`
border: 0;
& * {
  box-sizing: border-box;
}
`

const selectedUlCSS = css`
  ${ulCSS}
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 5px;
  border: 1px solid #666666;
  border-radius: 5px;
  & li {
    flex-grow: 0;
    &.input {
      flex-grow: 1;
    }
    &.multiselect-pill {
      height: 28px;
      line-height: 1;
      border-radius: 14px;
      margin-right: 5px;
      background-color: var(--multiselect-pill-bg, transparent);
      border: 1px solid var(--multiselect-pill-border, gray);
      color: var(--multiselect-pill-text, black);
      padding: 4px 8px;
      &:focus {
        outline: 0;
        background-color: var(--multiselect-pill-selected, gray);
        border: 1px solid var(--multiselect-pill-selected-border, transparent);
        color: var(--multiselect-pill-selected-text, white);
      }
    }
  }
`

const inputCSS = css`
outline: 0;
border: 0;
width: 100%;
height: 100%;
font-size: 16px;
`

const menuCSS = css`
  ${ulCSS}
  position: absolute;
  background-color: white;
  border: 1px solid black;
  min-width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  & li {
    padding: 5px 15px;
  }
  & li:hover, & li:focus {
    outline: 0;
    background-color: lightblue;
  }
  & li.noresults {
    font-style: italic;
    font-size: 0.9em;
    text-align: center;
    color: var(--multiselect-noresult-color, #333333);
  }
  & li.noresults:hover {
    background: none;
  }
`

function offset (el:HTMLElement|null) {
  if (!el) return { top: 0, left: 0 }
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function itemFromElement (el:HTMLElement|null) {
  if (!el) return undefined
  return { key: el.dataset.key, text: el.dataset.text } as ItemPair
}

export const MultiselectComponent: MultiselectFC = props => {
  const { id, name, items, selected, label, placeholder, addSelection, removeSelection, searchChanged, allowFreeText } = props
  const isSelected = useMemo(() => selected?.reduce((isSelected, item) => {
    isSelected[item.key] = true
    return isSelected
  }, {} as { [keys: string]: boolean }), [selected])
  const availableItems = useMemo(() => items.filter(itm => itm.key && !isSelected?.[itm.key]), [items, isSelected])
  const availablemessage = useMemo(() => availableItems.filter(itm => itm.key).length + ' autocomplete choices available', [availableItems])
  const menuid = `menu-${id}`
  const descriptionid = `desc-${id}`
  const legendid = `leg-${id}`

  const [activearea, setActiveArea] = useState(false)
  const [menushown, setMenuShown] = useState(false)
  const lastSearchValue = useRef<string|undefined>()

  const inputContainerRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const selectedItemsRef = useRef<(HTMLLIElement|null)[]>([])
  useEffect(() => { selectedItemsRef.current = selectedItemsRef.current.slice(0, selected?.length ?? 0) }, [selected])
  const menuItemsRef = useRef<(HTMLLIElement|null)[]>([])
  useEffect(() => { menuItemsRef.current = menuItemsRef.current.slice(0, availableItems.length) }, [availableItems])

  useLayoutEffect(() => {
    const { top, left } = offset(inputContainerRef.current)
    if (menuRef.current) {
      menuRef.current.style.left = left + 'px'
      menuRef.current.style.top = (2 + top + (inputContainerRef.current?.clientHeight ?? 0)) + 'px'
    }
  })

  const onContainerClick = useCallback(() => inputRef.current?.focus(), [])
  const onContainerKeydown = useCallback(() => {}, [])

  const onSelectedClick = useCallback(e => {
    const item = itemFromElement(e.target)
    if (item) removeSelection(item)
    inputRef.current?.focus()
  }, [removeSelection])
  const onSelectedKeydown = useCallback(e => {
    if (isModifierKey(e)) return
    e.stopPropagation()
    const idx = parseInt(e.target.dataset.index)
    if (e.key === 'ArrowDown') {
      inputRef.current?.focus()
    } else if (e.key === 'ArrowLeft') {
      const nextidx = Math.max(0, idx - 1)
      selectedItemsRef.current?.[nextidx]?.focus()
    } else if (e.key === 'ArrowRight') {
      if (idx === (selected?.length ?? 1) - 1) inputRef.current?.focus()
      else selectedItemsRef.current?.[idx + 1]?.focus()
    } else if (['Backspace', 'Delete', 'Clear', ' ', 'Enter'].includes(e.key)) {
      let nextidx:number
      if (e.key === 'Backspace') {
        nextidx = idx > 0 ? idx - 1 : (selected?.length ?? 0) > 1 ? 0 : -1
      } else {
        nextidx = idx < (selected?.length ?? 0) - 1 ? idx + 1 : idx - 1
      }
      if (nextidx <= -1) inputRef.current?.focus()
      else selectedItemsRef.current?.[nextidx]?.focus()
      const item = itemFromElement(e.target)
      if (item) removeSelection(item)
      e.preventDefault()
    } else if (e.key === 'Escape') {
      inputRef.current?.focus()
      setMenuShown(false)
      e.preventDefault()
    }
  }, [removeSelection, selected])
  const onSelectedFocus = useCallback(e => {
    setActiveArea(true)
  }, [])
  const onSelectedBlur = useCallback(e => {
    if (!menuRef.current?.contains(e.relatedTarget) && !inputContainerRef.current?.contains(e.relatedTarget)) {
      setActiveArea(false)
      setMenuShown(false)
    }
  }, [])

  const onInputClick = useCallback(e => {
    e.stopPropagation()
    setMenuShown(true)
  }, [])
  const onInputKeydown = useCallback(e => {
    if (isModifierKey(e)) return
    e.stopPropagation()
    const inputFarLeft = inputRef.current?.selectionStart === 0 && inputRef.current?.selectionEnd === 0
    if (e.key === 'ArrowDown') {
      if (!menushown) setMenuShown(true)
      else menuItemsRef.current[0]?.focus()
    } else if (e.key === 'ArrowLeft' && inputFarLeft) {
      if (selected?.length) selectedItemsRef.current[selected?.length - 1]?.focus()
    } else if (['Backspace'].includes(e.key) && inputFarLeft) {
      if (selected?.length && !e.repeat) {
        removeSelection(selected[selected.length - 1])
      }
    } else if (e.key === 'Escape') {
      setMenuShown(false)
    } else if (e.key === 'Enter' && allowFreeText) {
      const val = inputRef.current?.value
      if (val?.length) {
        addSelection({ key: val, text: val })
        if (inputRef.current) {
          inputRef.current.value = ''
          lastSearchValue.current = ''
          searchChanged?.('')
        }
        e.preventDefault()
      }
    }
  }, [menushown, addSelection, removeSelection, selected, allowFreeText, searchChanged])
  const onInputKeyup = useCallback(e => {
    if (inputRef.current?.value !== lastSearchValue.current) {
      lastSearchValue.current = inputRef.current?.value
      setMenuShown(true)
      searchChanged?.(inputRef.current?.value ?? '')
    }
  }, [searchChanged])
  const onInputFocus = useCallback(e => {
    setActiveArea(true)
  }, [])
  const onInputBlur = useCallback(e => {
    if (!menuRef.current?.contains(e.relatedTarget) && !inputContainerRef.current?.contains(e.relatedTarget)) {
      setActiveArea(false)
      setMenuShown(false)
    }
  }, [])

  const onMenuItemKeydown = useCallback(e => {
    if (isModifierKey(e)) return
    e.stopPropagation()
    const idx = parseInt(e.target.dataset.index)
    if (e.key === 'ArrowUp') {
      if (idx === 0) inputRef.current?.focus()
      else menuItemsRef.current[idx - 1]?.focus()
    } else if (e.key === 'ArrowDown') {
      const nextidx = Math.min(availableItems.length - 1, idx + 1)
      menuItemsRef.current[nextidx]?.focus()
    } else if (e.key === 'ArrowLeft') {
      if (selected?.length) selectedItemsRef.current[selected.length - 1]?.focus()
      else inputRef.current?.focus()
    } else if (['Enter', ' '].includes(e.key)) {
      const item = itemFromElement(e.target)
      if (item) {
        addSelection(item)
        if (inputRef.current) {
          inputRef.current.value = ''
          lastSearchValue.current = ''
          searchChanged?.('')
        }
        if ((availableItems?.length ?? 0) <= 1) inputRef.current?.focus()
        else {
          if (idx >= (availableItems?.length ?? 0) - 1) menuItemsRef.current[idx - 1]?.focus()
          else menuItemsRef.current[idx + 1]?.focus()
        }
        e.preventDefault()
      }
    } else if (e.key === 'Escape') {
      setMenuShown(false)
      inputRef.current?.focus()
    } else {
      inputRef.current?.focus()
    }
  }, [addSelection, availableItems, selected, searchChanged])
  const onMenuItemClick = useCallback(e => {
    const item = itemFromElement(e.target)
    if (item) {
      addSelection(item)
      if (inputRef.current) {
        inputRef.current.value = ''
        lastSearchValue.current = ''
        searchChanged?.('')
      }
    inputRef.current?.focus()
    }
  }, [addSelection, searchChanged])
  const onMenuItemFocus = useCallback(e => {
    setActiveArea(true)
  }, [])
  const onMenuItemBlur = useCallback(e => {
    if (!menuRef.current?.contains(e.relatedTarget) && !inputContainerRef.current?.contains(e.relatedTarget)) {
      setActiveArea(false)
      setMenuShown(false)
    }
  }, [])

  return (
    <fieldset css={fieldsetCSS}>
      <legend id={legendid}>{label}</legend>
      <ul
        css={css`
          ${selectedUlCSS}
          ${activearea && Theme.focus}
        `}
        role="listbox" ref={inputContainerRef} onClick={onContainerClick} onKeyDown={onContainerKeydown}>
        {selected && selected.map((item, i) =>
          <li role="option" tabIndex={-1} className="multiselect-pill" key={item.key} ref={el => { selectedItemsRef.current[i] = el }}
            onKeyDown={onSelectedKeydown} onClick={onSelectedClick} onFocus={onSelectedFocus} onBlur={onSelectedBlur}
            data-key={item.key} data-text={item.text} data-index={i}
            aria-selected="true" aria-labelledby={legendid}>
            {item.text ?? item.key}
            <ScreenReaderOnly>{', click to remove'}</ScreenReaderOnly>
          </li>
        )}
        <li className="input">
          <input type="text" id={id} name={name} placeholder={placeholder}
            ref={inputRef}
            css={inputCSS} onKeyUp={onInputKeyup} onChange={onInputKeyup}
            onFocus={onInputFocus} onBlur={onInputBlur} onClick={onInputClick} onKeyDown={onInputKeydown}
            autoComplete="off" autoCorrect="off" spellCheck="false" aria-autocomplete="list"
            aria-labelledby={legendid} aria-describedby={descriptionid} aria-owns={menuid}/>
        </li>
      </ul>
      <ScreenReaderOnly id={descriptionid} aria-live="assertive">
        <span>
          {selected?.length ? selected.length + ' selected' : 'select multiple'}{', up down to browse choices, left right to hilite previous choices, backspace deletes choices'}
        </span>
        {menushown && <span>{availablemessage}{', touch users explore to find autocomplete menu'}</span>}
      </ScreenReaderOnly>
      {ReactDOM.createPortal(
        <ul id={menuid} ref={menuRef}
          role="listbox"
          css={css`${menuCSS} display: ${menushown ? 'block' : 'none'};`}>
          {availableItems.map((item, i) =>
            <li ref={el => { menuItemsRef.current[i] = el }} key={item.key} tabIndex={-1}
              aria-selected="false" role="option"
              data-index={i} data-key={item.key} data-text={item.text} onClick={onMenuItemClick} onKeyDown={onMenuItemKeydown}
              onFocus={onMenuItemFocus} onBlur={onMenuItemBlur}>
              {item.text ?? item.key}
              <ScreenReaderOnly>{', click to autocomplete'}</ScreenReaderOnly>
            </li>
          )}
          {availableItems.length === 0 &&
            <li tabIndex={-1} className="noresults">No Results</li>
          }
        </ul>
        , document.body)}
    </fieldset>
  )
}
