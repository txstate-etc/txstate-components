import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Label = styled.label``

export const Checkbox = props => {
  const { name, label, ariaLabel } = props
  return (
    <>
      <Label>{label}</Label>
      <input aria-label={ariaLabel} type='checkbox' name={name} />
    </>
  )
}

Checkbox.propTypes = {
  ariaLabel: PropTypes.string.isRequired
}
