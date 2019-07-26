import React from 'react'
import PropTypes from 'prop-types'

const alignmentMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  even: 'space-evenly',
  around: 'space-around'
}

const convertAlignment = provided => {
  return alignmentMap[provided] || 'flex-start'
}

export const Stack = props => {
  const {
    renderAs,
    spacing,
    horizontal,
    verticalAlign,
    horizontalAlign,
    className
  } = props

  const children = React.Children.map(props.children, child => {
    return <div style={{ margin: spacing / 2 || 0 }}>{child}</div>
  })

  return React.createElement(
    renderAs,
    {
      className,
      style: {
        display: 'flex',
        padding: spacing / 2 || 0,
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: horizontal
          ? convertAlignment(verticalAlign)
          : convertAlignment(horizontalAlign),
        justifyContent: horizontal
          ? convertAlignment(horizontalAlign)
          : convertAlignment(verticalAlign)
      }
    },
    children
  )
}

Stack.propTypes = {
  verticalAlign: PropTypes.oneOf(['start', 'center', 'end', 'even', 'between']),
  horizontalAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'even',
    'between',
    'around'
  ]),
  horizontal: PropTypes.bool,
  spacing: PropTypes.number,
  renderAs: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

Stack.defaultProps = {
  verticalAlign: 'start',
  horizontalAlign: 'start',
  horizontal: false,
  renderAs: 'div'
}
