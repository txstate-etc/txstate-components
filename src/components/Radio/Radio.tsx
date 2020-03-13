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

// TODO: Fix padding as the span grows

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

  const defaultCheckedHacks: Dictionary<boolean> = {}
  if (value) {
    defaultCheckedHacks.defaultChecked = value === id
  }

  return (
    <div className={className} style={{ height: radioSize + 4 }}>
      <input
        disabled={disabled}
        type='radio' id={id} name={group}
        value={id}
        onChange={onChange}
        css={css`
          position: absolute;
          opacity: 0;
          user-select: none;
          

          &:focus + label span::after {
            box-shadow: 0 0 1px 2px ${Theme.white.hex()},
              0 0 2px 4px ${Theme.deepBlue.hex()},
              inset 0 0 0 2.5px ${Theme.white.hex()};
          }

          & + label span::after {
            box-sizing: border-box;
            left: 0;
            background-color: ${Theme.white.hex()};
            border: solid 2px ${Theme.maroon.hex()};
            box-shadow: inset 0 0 0 2.5px ${Theme.white.hex()};
          } 

          &:checked + label span::after {
            left: 0;
            background-color: ${Theme.maroon.hex()};
          }
        `}
        {...defaultCheckedHacks}
      />
      <label htmlFor={id} css={css`
          position: relative;
          padding-left: ${radioPadding}px;
          font-size: ${fontSizes[size ?? 'md']}rem;
          font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        `}
      >
        <span
          className={classNames({ disabled })}
          css={css`
            &:hover {
              cursor: pointer;  
            }

            &::before, &::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto; 
              width: ${radioSize}px;
              height: ${radioSize}px;
              border-radius: 100%;
            }
          `}
        >
          {label}
        </span>
      </label>
    </div>
  )
}
