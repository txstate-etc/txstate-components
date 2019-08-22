import React from 'react'
import { useFormInput } from '../../../hooks'
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
initializeIcons()

export const Dropdown = props => {
  const { label, options, path, initialSelectedKey } = props

  const {
    value,
    error,
    onChange
  } = useFormInput({
    path,
    initialValue: options.find(({ key }) => key === initialSelectedKey)
  })

  return (
    <ComboBox
      selectedKey={value.key}
      onChange={onChange}
      autoComplete='on'
      label={label}
      options={options}
      errorMessage={error}
    />
  )
}
