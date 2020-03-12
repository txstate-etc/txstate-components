/** @jsx jsx */
import { useMemo } from 'react'
import { css, jsx } from '@emotion/core'
import { Stack } from '../Stack/Stack'
import { Theme } from '../../utils/Theme'
import { Checkmark } from '../Icons/Checkmark'
import { ComponentSize } from '../../utils/helper.types'
import { classNames } from '../../utils'
import { useFormInput } from '../../hooks'
import { useOptionalId } from '../../hooks/useOptionalId'

interface CheckboxProps {
  path: string
  label: string
  size?: ComponentSize
  showCheck?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

type Checkbox = React.FunctionComponent<CheckboxProps>

const sizes = css`
  &.xs-button {
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }

  &.xs-label {
    font-size: 0.7rem;
  }

  &.sm-button {
    width: 22px;
    height: 22px;
  }

  &.sm-label {
    font-size: 0.8rem;
  }

  &.md-button {
    width: 30px;
    height: 30px;
  }

  &.md-label {
    font-size: 1.0rem;
  }

  &.lg-button {
    width: 35px;
    height: 35px;
  }

  &.lg-label {
    font-size: 1.2rem;
  }

  &.xl-button {
    width: 40px;
    height: 40px;
  }

  &.xl-label {
    font-size: 1.4rem;
  }
`

const spacing = {
  xs: 7,
  sm: 8,
  md: 11,
  lg: 12,
  xl: 13
}

export const Checkbox: Checkbox = props => {
  const {
    label,
    className,
    size = 'md',
    disabled,
    showCheck = true,
    path
  } = props

  const {
    value: checked,
    onChange
  } = useFormInput({
    path,
    initialValue: false,
    extractor: (isChecked: boolean) => isChecked
  })

  const id = useOptionalId(props.id)

  const backgroundColor = useMemo(() => {
    if (disabled) return '#E2E2E2'
    if (checked) return Theme.maroon.hex()
    return Theme.white.hex()
  }, [disabled, checked])

  const shouldShowCheck = useMemo(() => {
    return showCheck && !disabled && (size !== 'xs' && size !== 'sm') && checked
  }, [disabled, showCheck, size, checked])

  return (
    <Stack
      className={className}
      horizontal
      verticalAlign='center'
      css={css`
        font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        &:checked {
          background-color: ${Theme.maroon.hex()};
        }
      `}
      spacing={spacing[size]}
    >
      {/* TODO: Figure out if this is actually needed */}
      <input hidden disabled={disabled} type='checkbox' defaultChecked={checked} />
      <button
        role='checkbox'
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        id={id}
        onClick={() => onChange(!checked)}
        className={classNames(`${size}-button`)}
        css={css`
          padding: 0;
          background-color: white;
          border: solid 2px ${disabled ? '#C4C4C4' : Theme.maroon.hex()};
          border-radius: 4px;
          height: 30px;
          width: 30px;
          margin-right: 11px;
          background-color: ${backgroundColor};
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px;

          ${sizes}

          &:focus {
            box-shadow: 0 0 2px 3px white, 0 0 2px 6px #3F84BF;
            outline: none;
          }
        `}
      >
        {shouldShowCheck && <Checkmark width={40} fill='#fff' />}
      </button>
      <label
        className={classNames(`${size}-label`)}
        css={sizes}
        htmlFor={id}
      >
        {label}
      </label>
    </Stack>
  )
}

Checkbox.defaultProps = {
  showCheck: true,
  size: 'md'
}
