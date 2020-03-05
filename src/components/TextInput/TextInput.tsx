/** @jsx jsx */
import React, { useRef } from 'react'
import { css, jsx } from '@emotion/core'
import nanoid from 'nanoid'

const Description = (props: { text?: string }) => {
  if (!props.text) {
    return null
  }

  return (
    <span css={css`
      margin: 6px 0 0 0;
      font-family: sans-serif;
      font-size: 0.9rem;
    `}>
      {props.text}
    </span>
  )
}

export interface TextInputProps {
  label: string
  description?: string
  placeholder?: string
  style?: React.CSSProperties
  id?: string
}

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  const { id, style, placeholder, label, description } = props

  const _id = useRef(id ?? nanoid(10))

  return (
    <div
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        font-family: sans-serif;
      `}
    >
      <label
        css={css`
          margin: 0 0 6px 0;
          font-size: 100%;
        `}
        htmlFor={_id.current}
      >
        {label}
      </label>
      <input
        css={css`
          background-color: white;
          border: solid 1px #DADADA;
          padding: 4px;
          border-radius: 3px;

          &:focus {
            outline: none;
            box-shadow: 0 0 5px -3px blue;
          }
        `}
        id={_id.current}
        placeholder={placeholder}
        type='text'
      />
      <Description text={description} />
    </div>
  )
}
