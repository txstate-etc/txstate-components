import React, { useRef } from 'react'
import nanoid from 'nanoid'
import { TextInputComponent } from './TextInput.types'

export const TextInput: TextInputComponent = props => {
  const { id, label } = props

  const _id = useRef(id ?? nanoid(10))

  return (
    <div>
      <label htmlFor={_id.current}>{label}</label>
      <input
        id={_id.current}
        type='text'
      />
    </div>
  )
}
