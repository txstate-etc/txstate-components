/** @jsx jsx */
import React, { useState, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import { Theme } from '../../utils/Theme'
import { useFormInput } from '../../hooks/useFormInput'
import { classNames } from '../../utils/helpers'
import { Stack } from '../Stack/Stack'
import { PasswordShow } from '../Icons/PasswordShow'
import { Maybe } from '../../utils/helper.types'
import { PasswordHide } from '../Icons/PasswordHide'
import { useOptionalId } from '../../hooks/useOptionalId'
import { ErrorMessage } from '../Common/ErrorMessage'
import { ErrorBox } from '../Common/ErrorBox'
import { inputStyle, labelStyle } from '../Common/common.styles'

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
      aria-label={passwordVisible ? 'hide password' : 'show password'}
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
  className?: string
  style?: React.CSSProperties
  id?: string
}

const containerStyle = css`
  align-self: stretch;
  color: #434343;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const Input: React.FunctionComponent<InputProps> = props => {
  const {
    path,
    style,
    label,
    type,
    description,
    className,
    placeholder
  } = props

  const [overrideType, setOverrideType] = useState<Maybe<string>>(null)

  const id = useOptionalId(props.id)

  const {
    value,
    onChange,
    error
  } = useFormInput({
    path,
    extractor: (e) => e?.target?.value
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
      className={className}
      spacing={8}
    >
      <label
        className={classNames({ error: Boolean(error) })}
        css={labelStyle}
        htmlFor={id}
      >
        {label}
      </label>
      <Description text={description} />
      <ErrorMessage text={error} />
      <Stack horizontal style={{ alignSelf: 'stretch' }}>
        <input
          size={1}
          css={inputStyle}
          className={classNames({ error: Boolean(error), password: type === 'password' })}
          id={id}
          placeholder={placeholder}
          value={value ?? ''}
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
