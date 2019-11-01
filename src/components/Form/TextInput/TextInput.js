import React, { useMemo, useCallback } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { Stack } from '../../Stack'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useFormInput } from '../../../hooks'
import { SvgExclamation } from '../../Svg'
import { Theme } from '../../Theme'

const SuccessMessageText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #28a745;
  padding-top: 5px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
`

const SuccessMessage = ({ success }) => {
  return <Text variant='small' styles={{ root: { color: Theme.input.success } }}>{success}</Text>
}

const ErrorContainer = styled(Stack)`
  border-radius: 3px;
  overflow: hidden;
  background-color: #EBEBEB;
  padding-left: 8px;
`

const Square = styled(Stack)`
  width: 40px;
  height: 40px;
  background-color: ${Theme.input.error.hex()};
`

const ErrorMessage = ({ error }) => {
  return (
    <ErrorContainer horizontal verticalAlign='center' horizontalAlign='space-between'>
      <Text variant='small' styles={{ root: { color: Theme.input.error } }}>{error}</Text>
      <Square horizontalAlign='center' verticalAlign='center'>
        <SvgExclamation color='#FFF' width={16} height={16} />
      </Square>
    </ErrorContainer>
  )
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
        iconProps={iconProps}
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
