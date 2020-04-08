/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { classNames } from '../../utils/helpers'
import { Stack } from '../Stack/Stack'
import { ErrorMessage } from '../Common/ErrorMessage'
import { ErrorBox } from '../Common/ErrorBox'
import { labelStyle } from '../Common/common.styles'

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

export interface FormElementProps {
  label: string
  elementId: string
  labelScreenReaderOnly?: boolean
  error?: string
  success?: string
  showSuccessIcon?: boolean
  floatSuccessIcon?: boolean
  description?: string
  className?: string
  style?: React.CSSProperties
}

const containerStyle = css`
  align-self: stretch;
  color: #434343;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const FormElement: React.FunctionComponent<FormElementProps> = props => {
  return (
    <Stack
      style={props.style}
      css={containerStyle}
      className={props.className}
      spacing={8}
    >
      <label
        className={classNames({ error: Boolean(props.error) })}
        css={labelStyle}
        htmlFor={props.elementId}
      >
        {props.label}
      </label>
      <Description text={props.description} />
      <ErrorMessage text={props.error} />
      <Stack horizontal style={{ alignSelf: 'stretch' }}>
        {props.children}
        <ErrorBox msg={props.error} />
      </Stack>
    </Stack>
  )
}
