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

Stack.Item = OfficeStack.Item

Stack.propTypes = {
  /** Vertical alignment of immediate children in the stack. Follows flexbox alignment rules. */
  verticalAlign: PropTypes.oneOf([
    'initial',
    'start',
    'center',
    'end',
    'space-evenly',
    'space-between',
    'space-around',
    'stretch',
    'baseline'
  ]),
  /** Same as verticalAlign, only horizontal! 😲 */
  horizontalAlign: PropTypes.oneOf([
    'initial',
    'start',
    'center',
    'end',
    'space-evenly',
    'space-between',
    'space-around',
    'stretch',
    'baseline'
  ]),
  /** If true, items in the stack will wrap */
  wrap: PropTypes.bool,
  /** If true, the children will be laid out horizontally */
  horizontal: PropTypes.bool,
  /** Spacing between children. Does not provide margin or padding in the stack itself. */
  spacing: PropTypes.number,
  /** Render the stack as a different html element */
  renderAs: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

Stack.defaultProps = {
  verticalAlign: 'initial',
  horizontalAlign: 'initial',
  horizontal: false,
  renderAs: 'div'
}
