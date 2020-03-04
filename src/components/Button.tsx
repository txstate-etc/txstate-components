/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { classNames } from '../utils/helpers'

interface ButtonProps {
  label: string
  onClick?: (event?: React.MouseEvent<any>) => void
  variant?: 'primary' | 'outline' | 'transparent'
  ariaLabel?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  id?: string
  style?: React.CSSProperties
}

type Button = React.FunctionComponent<ButtonProps>

export const Button: Button = props => {
  const { label, variant, style, onClick, ariaLabel, className, disabled, type, id } = props

  return (
    <button
      id={id}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={classNames(className, variant, 'button-container', 'button-label')}
      disabled={disabled}
      type={type ?? 'submit'}
      css={css`
        all: unset;
      `}
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  onClick: () => {},
  variant: 'primary'
}
