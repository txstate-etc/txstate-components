import React from 'react'
import get from 'lodash.get'
import { useFormInput } from '../../../hooks'
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
initializeIcons()

export const Dropdown = props => {
  const { label, options, onGetErrorMessage, path, initialSelectedKey } = props

  const {
    value,
    error,
    onBlur,
    onChange
  } = useFormInput({
    path,
    initialValue: options.find(({ key }) => key === initialSelectedKey),
    extractor: (...args) => get(args, '[1]'),
    onGetErrorMessage
  })

  return (
    <ComboBox
      selectedKey={value.key}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete='on'
      label={label}
      options={options}
      errorMessage={error}
    />
  )
}
