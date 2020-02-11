import React from 'react'
import styled, { css } from 'styled-components'
import { PrimaryButton } from 'office-ui-fabric-react'
import Color from 'color'

const outline = css`
  background-color: #ffffff;
`

const ButtonBase = styled(PrimaryButton)`
  width: fit-content;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 200ms ease;
  border-radius: 3px;
  border: 1px solid #501214;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &.primary {
    background-color: ${({ disabled }) =>
    disabled ? Color('#501214').lighten(0.5).hex() : '#501214'};
  }

  &.outline {
    ${outline}
  }

  &.transparent {
    ${outline}
    background-color: transparent;
  }
`

const ButtonLabel = styled.span`
  user-select: none;
  color: #ffffff;
  transition: all 200ms ease;

  &.outline,
  &.transparent {
    color: #501214;
  }
`

interface ButtonProps {
  label: string
  onClick?: (event?: React.MouseEvent<any>) => void
  variant?: 'primary' | 'outline' | 'transparent'
  ariaLabel?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

type Button = React.FunctionComponent<ButtonProps>

export const Button: Button = props => {
  const { label, variant, onClick, ariaLabel, className, disabled, type } = props

  return (
    <ButtonBase
      role='button'
      aria-label={ariaLabel || label}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={[variant, className, 'button-container'].join(' ')}
    >
      <ButtonLabel
        className={[variant, className, 'button-label'].join(' ')}
      >
        {label}
      </ButtonLabel>
    </ButtonBase>
  )
}

Button.defaultProps = {
  onClick: () => null,
  variant: 'primary'
}
