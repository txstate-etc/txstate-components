/** @jsx jsx */
import { createContext } from 'react'
import { css, jsx } from '@emotion/core'
import { useOptionalId } from '../../hooks/useOptionalId'
import { Maybe, ComponentSize } from '../../utils/helper.types'

interface RadioGroupProps {
  label?: string
  group?: string
  size?: ComponentSize
}

type RadioGroup = React.FunctionComponent<RadioGroupProps>

const Legend: React.FunctionComponent<{ text?: string }> = ({ text }) => {
  if (!text) return null
  return (
    <legend css={css`
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `}
    >
      {text}
    </legend>
  )
}

interface RadioGroupContext {
  group: Maybe<string>
  size: Maybe<ComponentSize>
}
export const RadioGroupContext = createContext<RadioGroupContext>({ group: null, size: null })

export const RadioGroup: RadioGroup = props => {
  const { label, children, size = 'md' } = props
  const group = useOptionalId(props.group)

  return (
    <fieldset
      css={css`
        padding: 0;
        margin: 0;
        border: none;
      `}
    >
      <Legend text={label} />
      <RadioGroupContext.Provider value={{ group, size }}>
        {children}
      </RadioGroupContext.Provider>
    </fieldset>
  )
}
