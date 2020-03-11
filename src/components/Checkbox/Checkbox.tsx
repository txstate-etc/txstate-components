/** @jsx jsx */
import { useRef, useState, useMemo, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import nanoid from 'nanoid'
import { Stack } from '../Stack/Stack'
import { Theme } from '../../utils/Theme'

interface CheckboxProps {
  label: string
  disabled?: boolean
  id?: string
  className?: string
}

type Checkbox = React.FunctionComponent<CheckboxProps>

export const Checkbox: Checkbox = props => {
  const { id, label, className, disabled } = props
  const [checked, setChecked] = useState(false)
  const _id = useRef(id ?? nanoid(10))

  const toggleChecked = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    setChecked(checked => !checked)
  }, [])

  const backgroundColor = useMemo(() => {
    if (disabled) return '#E2E2E2'
    if (checked) return Theme.maroon.hex()
    return Theme.white.hex()
  }, [disabled, checked])
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
      spacing={11}
    >
      <input hidden disabled={disabled} type='checkbox' checked={checked}/>
      <button
        role='checkbox'
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        id={_id.current}
        onClick={toggleChecked}
        css={css`
          background-color: white;
          border: solid 2px ${disabled ? '#C4C4C4' : Theme.maroon.hex()};
          border-radius: 4px;
          height: 30px;
          width: 30px;
          background-color: ${backgroundColor};

          &:focus {
            /* TODO: Put some sweet focus style here? Maybe. */
          }
        `}
      />
      <label htmlFor={_id.current}>{label}</label>
    </Stack>
  )
}
