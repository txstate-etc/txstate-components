/** @jsx jsx */
import { useContext, useMemo } from 'react'
import { css, jsx } from '@emotion/core'
import { useOptionalId } from '../../hooks/useOptionalId'
import { RadioGroupContext } from './RadioGroup'
import { Theme } from '../../utils/Theme'
import { useFormInput } from '../../hooks'
import { Dictionary } from '../../utils/helper.types'
import { classNames } from '../../utils'

interface RadioProps {
  label: string
  path: string
  disabled?: boolean
  id?: string
  className?: string
}

type Radio = React.FunctionComponent<RadioProps>

const radioSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28
}

const fontSizes = {
  xs: 0.7,
  sm: 0.8,
  md: 1.0,
  lg: 1.1,
  xl: 1.2
}

export const Radio: Radio = props => {
  const id = useOptionalId(props.id)
  const { label, className, disabled } = props

  const { group, size } = useContext(RadioGroupContext)

  if (!group) {
    throw new Error('Radio buttons must be in a radio group.')
  }

  const {
    value,
    onChange
  } = useFormInput({
    path: group,
    extractor: e => id
  })

  const radioSize = useMemo(() => {
    return radioSizes[size ?? 'md']
  }, [size])

  const radioPadding = useMemo(() => {
    return radioSize + 12
  }, [radioSize])

  const inputProps: Dictionary<boolean> = useMemo(() => {
    const inputProps: Dictionary<boolean> = {}
    if (value) {
      inputProps.defaultChecked = !disabled && value === id
    }
    return inputProps
  }, [value, id, disabled])

  return (
    <label
      htmlFor={id}
      className={classNames(className, { disabled })}
      css={css`
        height: ${radioSize + 4}px;
        display: flex;
        align-items: center;
        position: relative;
        padding-left: ${radioPadding}px;
        cursor: pointer;
        font-size: ${fontSizes[size ?? 'md']}rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        user-select: none;
        color: #363534;

        &.disabled, .disabled > input {
          color: #606060;
          cursor: not-allowed;
        }

        & input:checked ~ span {
          background-color: ${Theme.white.hex()};
          border-color: ${Theme.maroon.hex()};
        }

        & input:checked ~ span:after {
          display: block;
        }

        & input:focus ~ span {
          box-shadow: 0 0 1px 2px ${Theme.white.hex()},
              0 0 2px 4px ${Theme.deepBlue.hex()}
        }

        & span:after {
          width: 75%;
          height: 75%;
          border-radius: 50%;
          background: ${Theme.maroon.hex()};
        }
      `}
    >
      {label}
      <input
        disabled={disabled}
        type='radio' id={id} name={group}
        value={id}
        onChange={onChange}
        className={classNames({ disabled })}
        css={css`
          position: absolute;
          opacity: 0;
          cursor: pointer;
          
          &.disabled {
            cursor: not-allowed;
          }
        `}
        {...inputProps}
      />
      <span
        className={classNames({ disabled })}
        css={css`
          position: absolute;
          left: 0;
          height: ${radioSize}px;
          width: ${radioSize}px;

          background-color: ${Theme.white.hex()};
          border: solid #606060 2px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          &::after {
            content: "";
            position: absolute;
            display: none;
          }

          &.disabled {
            background-color: #E2E2E2;
            border-color: #C4C4C4;
          }
        `}
      />
    </label>

  )
}
