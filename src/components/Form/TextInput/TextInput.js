import React, { useMemo } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'
import { Stack } from '../../Stack'
import styled from 'styled-components'

const SuccessMessageText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #28a745;
  padding-top: 5px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
`

const SuccessMessage = ({ message, id }) => {
  return <SuccessMessageText id={id} >{message}</SuccessMessageText>
}

export const TextInput = props => {
  const { name, label, type, multiline, path, className, placeholder, required, disabled, iconProps, styles, SuccessComponent } = props

  const {
    value,
    error,
    success,
    onChange
  } = useFormInput({
    path,
    extractor: (e) => e.target.value
  })

  const _styles = useMemo(() => {
    const internalStyles = {}
    if (success) internalStyles.fieldGroup = { borderColor: '#28a745', selectors: { ':hover': { borderColor: '#28a745' } } }
    if (error) internalStyles.fieldGroup = { borderColor: '#a4262c', selectors: { ':hover': { borderColor: '#a4262c' } } }
    return {
      ...internalStyles,
      ...styles
    }
  }, [styles, success, error])

  return (
    <Stack>
      <TextField
        required={required}
        className={className}
        multiline={multiline}
        autoAdjustHeight={multiline}
        iconProps={iconProps}
        label={label}
        type={type}
        id={name}
        name={name}
        value={value}
        errorMessage={error}
        styles={_styles}
        placeholder={placeholder}
        onChange={onChange}
        iconProps={iconProps}
        disabled={disabled}
      />
      {SuccessComponent ? <SuccessComponent message={success} /> : <SuccessMessage message={success} />}
    </Stack>
  )
}

TextInput.defaultProps = {
  multiline: false,
  type: 'text'
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  SuccessComponent: PropTypes.elementType,
  styles: PropTypes.object,
  iconProps: PropTypes.shape({
    ariaLabel: PropTypes.string,
    iconName: PropTypes.string,
    iconType: PropTypes.object,
    imageProps: PropTypes.object,
    styles: PropTypes.object,
    theme: PropTypes.object
  })
}
