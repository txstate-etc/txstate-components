import React from 'react'
import PropTypes from 'prop-types'

export const Text = props => {
  const { children, renderAs, style, className } = props

  return React.createElement(
    renderAs,
    {
      style,
      className
    },
    children
  )
}

Text.defaultProps = {
  renderAs: 'span'
}

Text.propTypes = {
  renderAs: PropTypes.string
}
