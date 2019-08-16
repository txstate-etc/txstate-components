import React from 'react'
import { Stack as OfficeStack } from 'office-ui-fabric-react/lib/Stack'
import PropTypes from 'prop-types'

export const Stack = props => {
  const {
    renderAs,
    spacing,
    horizontal,
    verticalAlign,
    horizontalAlign,
    style,
    wrap,
    className,
    children
  } = props

  return (
    <OfficeStack
      className={className}
      wrap={wrap}
      horizontal={horizontal}
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
      tokens={{
        childrenGap: spacing
      }}
      styles={{
        root: { ...style }
      }}
      as={renderAs}
    >
      {children}
    </OfficeStack>
  )
}

Stack.propTypes = {
  verticalAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-evenly',
    'space-between',
    'space-around',
    'stretch',
    'baseline'
  ]),
  horizontalAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-evenly',
    'space-between',
    'space-around',
    'stretch',
    'baseline'
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
