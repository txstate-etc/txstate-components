import React from 'react'
import PropTypes from 'prop-types'

export const Radiobutton = (props) => {
  const { name, label } = props

  return (
    <>
      <label htmlFor='radio-id' >{label}</label>
      <input type='radio' id='radio-id' name={name} />
    </>
  )
}
