/** @jsx jsx */
import React, { useCallback, useRef, useState } from 'react'
import { jsx } from '@emotion/core'
import { useFormInput } from '../../hooks/useFormInput'
import { useOptionalId } from '../../hooks/useOptionalId'
import { FormElement } from '../FormElement/FormElement'
import { MultiselectComponent, ItemPair } from './MultiselectComponent'

export interface MultiselectProps {
  label: string
  path: string
  id?: string
  hideLabel?: boolean
  placeholder?: string
  description?: string
  initialValue?: ItemPair[]
  initialItems?: ItemPair[]
  className?: string
  style?: React.CSSProperties
  /** Provide a function that can look up new menu items based on what the user has typed. Concurrency-safe but do your own debouncing. */
  search?: (value:string) => Promise<ItemPair[]>
  /** Set this to true to allow users to type in new values instead of being required to match a lookup. */
  allowFreeText?: boolean
}

export const Multiselect: React.FunctionComponent<MultiselectProps> = props => {
  const {
    label,
    hideLabel,
    path,
    initialItems,
    initialValue,
    description,
    placeholder,
    className,
    style,
    search,
    allowFreeText
  } = props

  const id = useOptionalId(props.id)
  const [availableItems, setAvailableItems] = useState<ItemPair[]>(initialItems ?? [])

  const {
    value,
    onChange,
    error,
    success
  } = useFormInput({
    initialValue: initialValue,
    path,
    extractor: e => e
  })

  const addSelection = useCallback((item:ItemPair) => {
    onChange([...(value ?? []), item])
  }, [onChange, value])
  const removeSelection = useCallback((item:ItemPair) => {
    onChange((value ?? []).filter((itm:ItemPair) => itm.key !== item.key))
  }, [onChange, value])

  const activeValue = useRef<string>()
  const searchChanged = useCallback(async (value:string) => {
    if (!search) return
    activeValue.current = value
    if (!value) {
      setAvailableItems(initialItems ?? [])
    } else {
      const items = await search(value)
      if (activeValue.current === value) setAvailableItems(items)
    }
  }, [search, initialItems])

  return (
    <FormElement style={style} className={className} label={label} labelScreenReaderOnly={hideLabel}
      description={description} error={error} success={success}
      showSuccessIcon={!error && value?.length > 0} elementId={id}>
      <MultiselectComponent
        id={id}
        name={path}
        label={label}
        placeholder={placeholder}
        items={availableItems}
        selected={value ?? []}
        addSelection={addSelection}
        removeSelection={removeSelection}
        searchChanged={searchChanged}
        allowFreeText={allowFreeText}
      />
    </FormElement>
  )
}
