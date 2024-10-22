import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { PrimaryButton  } from '@fluentui/react'
import PropTypes from 'prop-types'
import { Text } from '../Text'
import { Theme } from '../Theme'

const outline = css`
  background-color: ${Theme.white.hex()};
`

const ButtonBase = styled(PrimaryButton)`
  width: fit-content;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 200ms ease;
  border-radius: 3px;
  border: 1px solid ${Theme.maroon.hex()};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &.primary {
    background-color: ${({ disabled }) =>
    disabled ? Theme.maroon.lighten(0.5).hex() : Theme.maroon.hex()};
  }

  &.outline {
    ${outline}
  }

  &.transparent {
    ${outline}
    background-color: transparent;
  }


`

const ButtonLabel = styled(Text)`
  user-select: none;
  color: ${Theme.white.hex()};
  transition: all 200ms ease;

  &.outline,
  &.transparent {
    color: ${Theme.maroon.hex()};
  }

  ${ButtonBase}:hover {
    color: ${({ hoverTextColor }) => hoverTextColor};
  }
`

export const Button = props => {
  const { label, variant, onClick, ariaLabel, className, disabled, type } = props


  const classNames = useCallback((name) => {
    const className = [name]

    if (variant) className.push(variant)
    if (className) className.push(className)

    return className.join(' ')
  }, [variant, className])

  return (
    <ButtonBase
      role='button'
      aria-label={ariaLabel || label}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames('buttonContainer')}
    >
      <ButtonLabel
        className={classNames('button-label')}
        variant={variant}
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

Button.propTypes = {
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'outline', 'transparent']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}
