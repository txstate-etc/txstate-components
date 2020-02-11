import React, { useMemo, useCallback } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import PropTypes from 'prop-types'
import { useFormInput } from '../../../hooks'
import { Theme } from '../../Theme'
import { ErrorMessage } from '../ErrorMessage'

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
    onChange,
    errClass,
    componentRef
  } = useFormInput({
    path,
    extractor: (e) => e.target.value
  })

  const onRenderDescription = useCallback((props) => {
    return <ErrorMessage error={error} ErrorComponent={ErrorComponent} success={success} SuccessComponent={SuccessComponent} />
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
        className={[className, errClass].join(' ')}
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
        componentRef={componentRef}
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
  ErrorComponent: PropTypes.elementType,
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
