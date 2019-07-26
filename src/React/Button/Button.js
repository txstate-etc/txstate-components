import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import PropTypes from 'prop-types'
import { Text } from '../Text'
import { Theme } from '../Theme'

const ButtonBase = styled.div`
  width: fit-content;
  padding: 1rem 2rem; 
  border-radius: 2px;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    transform: translate(0px, -3px);
  }
`

const ButtonPrimaryContainer = styled(ButtonBase)`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const ButtonOutlineContainer = styled(ButtonBase)`
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 1rem 2rem;

  &:hover {
    box-shadow: inset 0 -2px 0 0 ${({ borderColor }) => borderColor};
    border: 1px solid ${({ borderColor }) => borderColor};
  }
`

const ButtonTransparentOutlineContainer = styled(ButtonOutlineContainer)`
  background-color: transparent;
`

const ButtonVariants = {
  primary: ButtonPrimaryContainer,
  outline: ButtonOutlineContainer,
  transparent: ButtonTransparentOutlineContainer
}

const ButtonLabel = styled(Text)`
  user-select: none;
  color: ${({ textColor }) => textColor};

  ${ButtonBase}:hover {
    color: ${({ hoverTextColor }) => hoverTextColor};
  }
`

const buttonStyles = {
  primary: {
    button: {
      backgroundColor: Theme.maroon,
      hoverColor: Color(Theme.maroon).lighten(0.2).string()
    },
    label: {
      textColor: Theme.white,
      hoverTextColor: Theme.white
    }
  },
  outline: {
    button: {
      backgroundColor: Theme.white,
      borderColor: Theme.maroon
    },
    label: {
      textColor: Theme.maroon,
      hoverTextColor: Theme.maroon
    }
  },
  transparent: {
    button: {
      backgroundColor: Theme.transparent,
      borderColor: Theme.maroon
    },
    label: {
      textColor: Theme.maroon,
      hoverTextColor: Theme.maroon
    }
  }
}

export const Button = props => {
  const { label, variant, onClick, ariaLabel } = props
  const ButtonContainer = ButtonVariants[variant]

  const style = buttonStyles[variant]

  return (
    <ButtonContainer
      role='button'
      aria-label={ariaLabel}
      onClick={onClick}
      {...style.button}
    >
      <ButtonLabel
        variant={variant}
        {...style.label}
      >
        {label}
      </ButtonLabel>
    </ButtonContainer>
  )
}

Button.defaultProps = {
  onClick: () => null,
  variant: 'primary'
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'outline', 'transparent']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired
}
