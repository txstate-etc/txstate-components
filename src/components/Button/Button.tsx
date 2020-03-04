/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { classNames } from '../../utils/helpers'
import { Theme } from '../../utils/Theme'
import { ButtonComponent } from './Button.types'

const baseClass = css`
  border-radius: 3px;
  cursor: pointer;
  border: solid 1px ${Theme.maroon.hex()};
`

const fontSize = {
  xs: 0.7,
  sm: 0.8,
  md: 1,
  lg: 1.2,
  xl: 1.4
}

export const Button: ButtonComponent = props => {
  const { label, variant, style, onClick, ariaLabel, className, disabled, type, id, size } = props

  return (
    <button
      id={id}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={classNames('txst-button', className, variant)}
      disabled={disabled}
      type={type ?? 'submit'}
      css={css`
        opacity: ${disabled ? 0.5 : 1};
        padding: 10px 22px;
        font-size: ${fontSize[size ?? 'md']}rem;

        &.primary {
          ${baseClass}
          color: ${Theme.white.hex()};
          background-color: ${disabled ? Theme.maroon.lighten(0.5).hex() : Theme.maroon.hex()}
        }

        &.outline {
          ${baseClass}
          color: ${Theme.maroon.hex()};
          background-color: ${Theme.white.hex()};
        }

        &.transparent {
          ${baseClass}
          color: ${Theme.maroon.hex()};
          background-color: transparent;
        }
      `}
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  size: 'md'
}
