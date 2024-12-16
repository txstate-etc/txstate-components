import React from 'react'
import { styled } from 'styled-components'
import PropTypes from 'prop-types'
import { Text } from '../Text'
import { Theme } from '../Theme'

const LinkBase = styled.a`
  text-decoration: none;
  font-family: 'Univers W01', Helvetica, Calibri, Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  padding-bottom: 3px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  transition: all 0.2s ease;
  display: inline-block;
  &:hover {
    transform: translate(0px, -2px);
  }
`

const LinkPrimaryContainer = styled(LinkBase)`
  color: ${({ textColor }) => textColor};
`

const LinkVariants = {
  primary: LinkPrimaryContainer
}

const LinkLabel = styled(Text)`
  user-select: none;
  color: ${({ textColor }) => textColor};

  ${LinkBase}:hover {
  }
`

const linkStyles = {
  primary: {
    label: {
      textColor: Theme.maroon.hex()
    }
  }
}

export const Link = props => {
  const { label, variant, onClick, ariaLabel, href } = props
  const LinkContainer = LinkVariants[variant]
  const style = linkStyles[variant]
  return (
    <LinkContainer
      role='link'
      aria-label={ariaLabel}
      onClick={onClick}
      href={href}
    >
      <LinkLabel variant={variant} {...style.label}>
        {label}
      </LinkLabel>
    </LinkContainer>
  )
}

Link.defaultProps = {
  onClick: () => null,
  variant: 'primary'
}

Link.props = {
  variant: PropTypes.oneOf(['primary']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}
