/** @jsx jsx */
import React, { useCallback } from 'react'
import { jsx } from '@emotion/core'
import { useFormInput } from '../../hooks/useFormInput'
import { useOptionalId } from '../../hooks/useOptionalId'
import { FormElement } from '../FormElement/FormElement'
import { MultiselectComponent, ItemPair } from './MultiselectComponent'

export interface MultiselectProps {
  label: string
  path: string
  description?: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  id?: string
  items?: ItemPair[]
  initialValue?: ItemPair[]
}

export const Multiselect: React.FunctionComponent<MultiselectProps> = props => {
  const {
    label,
    path,
    items,
    initialValue,
    description,
    placeholder,
    className,
    style
  } = props

  const id = useOptionalId(props.id)

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

  return (
    <FormElement style={style} className={className} label={label}
      description={description} error={error} success={success}
      showSuccessIcon={!error && value?.length > 0} elementId={id}>
      <MultiselectComponent
        id={id}
        name={path}
        placeholder={placeholder}
        items={items ?? []}
        selected={value ?? []}
        addSelection={addSelection}
        removeSelection={removeSelection}
      />
    </FormElement>
  )
}
