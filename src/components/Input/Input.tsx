/** @jsx jsx */
import React, { useRef, useState, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import { Theme } from '../../utils/Theme'
import nanoid from 'nanoid'
import { useFormInput } from '../../hooks/useFormInput'
import { classNames } from '../../utils/helpers'
import { Stack } from '../Stack/Stack'
import { Exclamation } from '../Icons/Exclamation'
import { PasswordShow } from '../Icons/PasswordShow'
import { Maybe } from '../../utils/helper.types'
import { PasswordHide } from '../Icons/PasswordHide'

const Description = (props: { text?: string, className?: string }) => {
  if (!props.text) {
    return null
  }

  return (
    <span
      className={props.className}
      css={css`
        font-size: 0.8rem;
      `}
    >
      {props.text}
    </span>
  )
}

interface ErrorProps {
  text?: string
  className?: string
}
const Error: React.FunctionComponent<ErrorProps> = ({ text, className }) => {
  if (!text) return null
  return (
    <span
      className={className}
      css={css`
        font-size: 0.8rem;
        color: ${Theme.input.error.hex()};
      `}
    >
      {text}
    </span>
  )
}

const ErrorBox: React.FunctionComponent<{msg?: string}> = ({ msg }) => {
  if (!msg) return null
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding: 0 8px;
        background-color: ${Theme.input.error.hex()};
      `}
    >
      <Exclamation
        fill={Theme.white.hex()}
        stroke={Theme.white.hex()}
        height={16}
        width={16}
      />
    </div>
  )
}

const PasswordBox: React.FunctionComponent<{ type?: string, passwordVisible: boolean, onClick: () => void }> = ({ type, passwordVisible, onClick }) => {
  if (type !== 'password') return null

  let passwordIcon
  if (passwordVisible) {
    passwordIcon = <PasswordShow
      fill={Theme.trueBlack.hex()}
      stroke={Theme.trueBlack.hex()}
      height={16}
      width={16}
    />
  } else {
    passwordIcon = <PasswordHide
      fill={Theme.trueBlack.hex()}
      stroke={Theme.trueBlack.hex()}
      height={16}
      width={16}
    />
  }

  return (
    <button
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        border: solid 2px #707070;
        border-left: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding: 0 8px;
        background-color: ${Theme.lightGray.hex()};
      `}
      onClick={onClick}
    >
      {passwordIcon}
    </button>
  )
}

export interface InputProps {
  label: string
  path: string
  type?: string
  description?: string
  placeholder?: string
  style?: React.CSSProperties
  id?: string
}

const inputStyle = css`
  background-color: white;
  border: solid 2px #707070;
  padding: 8px;
  font-size: 15px;
  border-radius: 3px;
  caret-color: #707070;
  color: #353533;
  flex: 1;

  &.error, &.password {
    border-right: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &.error {
    border-color: ${Theme.input.error.hex()};
  }

  &::placeholder {
    color: #959595;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px -3px ${Theme.river.hex()};
  }
`

const labelStyle = css`
  font-size: 15px;

  &.error {
    color: ${Theme.input.error.hex()};
  }
`

const containerStyle = css`

  color: #434343;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const Input: React.FunctionComponent<InputProps> = props => {
  const {
    id,
    path,
    style,
    label,
    type,
    description,
    placeholder
  } = props

  const [overrideType, setOverrideType] = useState<Maybe<string>>(null)

  const _id = useRef(id ?? nanoid(10))

  const {
    value,
    onChange,
    error
  } = useFormInput({
    path,
    extractor: (e) => e?.target?.value ?? null
  })

  const handlePasswordClick = useCallback(() => {
    setOverrideType((current) => {
      if (!current) {
        return 'text'
      }
      return null
    })
  }, [])

  return (
    <Stack
      style={style}
      css={containerStyle}
      spacing={8}
    >
      <label
        className={classNames({ error: Boolean(error) })}
        css={labelStyle}
        htmlFor={_id.current}
      >
        {label}
      </label>
      <Description text={description} />
      <Error text={error} />
      <Stack horizontal style={{ alignSelf: 'stretch' }}>
        <input
          size={1}
          css={inputStyle}
          className={classNames({ error: Boolean(error), password: type === 'password' })}
          id={_id.current}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={overrideType ?? type}
        />
        <PasswordBox type={type} passwordVisible={overrideType !== null} onClick={handlePasswordClick} />
        <ErrorBox msg={error} />
      </Stack>
    </Stack>
  )
}

Input.defaultProps = {
  type: 'text'
}
