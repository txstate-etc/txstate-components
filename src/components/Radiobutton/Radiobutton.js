import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Label = styled.label``

export const Radiobutton = (props) => {
  const { name, label, ariaLabel } = props
  return (
    <>
      <Label htmlFor='radio-id'>{label}</Label>
      <input
        aria-label={ariaLabel}
        type='radio'
        id='radio-id'
        name={name} />
    </>
  )
}

Radiobutton.propTypes = {
  ariaLabel: PropTypes.string.isRequired
}
