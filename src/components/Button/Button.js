import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Text } from '../Text'
import { Theme } from '../Theme'

const outline = css`
  border: 1px solid ${Theme.maroon};
  background-color: ${Theme.white};
  padding: calc(1rem - 1px) 2rem;

  &:hover {
    box-shadow: inset 0 -2px 0 0 ${Theme.maroon};
  }
`

const ButtonBase = styled.div`
  width: fit-content;
  padding: 1rem 2rem; 
  border-radius: 2px;
  cursor: pointer;
  transition: all 200ms ease;
  
  &.primary {
    background-color: ${Theme.maroon};
  }

  &.outline {
    ${outline}
  }

  &.transparent {
    ${outline}
    background-color: transparent;
  }

  &:hover {
    transform: translate(0px, -3px);
  }
`

const ButtonLabel = styled(Text)`
  user-select: none;
  color: ${Theme.white};
  transition: all 200ms ease;

  &.outline, &.transparent {
    color: ${Theme.maroon}
  }

  ${ButtonBase}:hover {
    color: ${({ hoverTextColor }) => hoverTextColor};
  }
`

export const Button = props => {
  const { label, variant, onClick, ariaLabel, className } = props

  return (
    <ButtonBase
      role='button'
      aria-label={ariaLabel}
      onClick={onClick}
      className={[variant, className, 'button-container']}
    >
      <ButtonLabel
        className={[variant, className, 'button-label']}
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
  ariaLabel: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'transparent']),
  onClick: PropTypes.func
}
