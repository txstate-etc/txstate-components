/** @jsx jsx */
import { createContext, useCallback, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { useOptionalId } from '../../hooks/useOptionalId'
import { Maybe, ComponentSize } from '../../utils/helper.types'
import { Form } from '../Form/Form'

interface RadioGroupProps {
  label?: string
  group?: string
  size?: ComponentSize
  className?: string
  checked?: string
}

const fontSizes = {
  xs: 0.7,
  sm: 0.8,
  md: 1.0,
  lg: 1.1,
  xl: 1.2
}

type RadioGroup = React.FunctionComponent<RadioGroupProps>

const Legend: React.FunctionComponent<{ text?: string, size: ComponentSize }> = ({ text, size }) => {
  if (!text) return null
  return (
    <legend css={css`
    font-size: ${fontSizes[size]}rem;
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
  selected: Maybe<string>
}
export const RadioGroupContext = createContext<RadioGroupContext>({ group: null, size: null, selected: null })

export const RadioGroup: RadioGroup = props => {
  const { label, children, className, size = 'md', checked } = props
  const [selected, setSelected] = useState<Maybe<string>>(checked ?? null)
  const group = useOptionalId(props.group)

  const handleChange = useCallback(({ form }) => {
    if (selected !== form[group]) setSelected(form[group])
  }, [group, selected])

  return (
    <fieldset
      className={className}
      css={css`
        padding: 0;
        margin: 0;
        border: none;
      `}
    >
      <Legend text={label} size={size} />
      <Form
        webForm={false}
        initialValues={{
          [group]: checked
        }}
        onChange={handleChange}
      >
        <RadioGroupContext.Provider value={{ group, size, selected }}>
          {children}
        </RadioGroupContext.Provider>
      </Form>
    </fieldset>
  )
}
