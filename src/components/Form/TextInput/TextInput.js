import React, { useMemo, useCallback } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Text } from 'office-ui-fabric-react/lib/Text'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'
import { Theme } from '../../Theme'
import { ErrorMessage } from '../ErrorMessage'

const SuccessMessage = ({ success }) => {
  return <Text variant='small' styles={{ root: { color: Theme.input.success } }}>{success}</Text>
}

export const TextInput = props => {
  const {
    name,
    label,
    type,
    multiline,
    path,
    className,
    placeholder,
    required,
    disabled,
    iconProps,
    styles,
    SuccessComponent,
    ErrorComponent
  } = props

  const {
    value,
    error,
    success,
    onChange
  } = useFormInput({
    path,
    extractor: (e) => e.target.value
  })

  const onRenderDescription = useCallback((props) => {
    if (error) {
      return ErrorComponent || <ErrorMessage error={error} />
    } else if (success) {
      return SuccessComponent || <SuccessMessage success={success} />
    }
  }, [success, error])

  const _styles = useMemo(() => {
    const internalStyles = {
      fieldGroup: {
        borderRadius: 3,
        selectors: {
          ':focus-within': {
            borderColor: Theme.input.focus
          }
        }
      }
    }
    if (success) {
      internalStyles.fieldGroup = {
        ...internalStyles.fieldGroup,
        borderColor: Theme.input.success,
        borderWidth: 1,
        selectors: { ':hover': { borderColor: Theme.input.success } }
      }
    }
    if (error) {
      internalStyles.fieldGroup = {
        ...internalStyles.fieldGroup,
        borderColor: Theme.input.error,
        borderWidth: 1,
        selectors: { ':hover': { borderColor: Theme.input.error } }
      }
    }
    return {
      ...internalStyles,
      ...styles
    }
  }, [styles, success, error])

  return (
    <>
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
        onRenderDescription={onRenderDescription}
        styles={_styles}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </>
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
