/** @jsx jsx */
import React, { useMemo } from 'react'
import { StackComponent, StackItem } from './Stack.types'
import { Dictionary } from '../../utils/helper.types'
import { css, jsx } from '@emotion/core'

const alignmentMap: Dictionary<string> = {
  start: 'flex-start',
  end: 'flex-end'
}

const addClassName = (className: string) => (child: React.ReactNode) => {
  console.log('Child', child)
  if (!React.isValidElement(child)) {
    return null
  }

  if (child.props.className) {
    return React.cloneElement(child, { className: `${child.props.className} ${className}` })
  }

  return React.cloneElement(child, { className })
}

export const Stack: StackComponent = ({
  spacing,
  style,
  horizontal,
  horizontalAlign = 'start',
  verticalAlign = 'start',
  className,
  children
}) => {
  const classNames = []

  if (horizontal) {
    classNames.push('horizontal')
  } else {
    classNames.push('vertical')
  }

  if (className) { classNames.push(className) }

  const stackStyle = useMemo(() => {
    const hAlign = alignmentMap[horizontalAlign] ?? horizontalAlign
    const vAlign = alignmentMap[verticalAlign] ?? verticalAlign

    return css`
      display: flex;
      &.horizontal {
        justify-content: ${hAlign};
        align-items: ${vAlign};
        & > .stack-item {
          margin-right: ${spacing ?? 0}px;
        }
  
        & > :last-child {
          margin-right: 0px;
        }
      }
  
      &.vertical {
        flex-direction: column;
        align-items: ${hAlign};
        justify-content: ${vAlign};
  
        & > .stack-item {
          margin-bottom: ${spacing ?? 0}px;
        }
  
        & > :last-child {
          margin-bottom: 0px;
        }
      }
    `
  }, [horizontalAlign, verticalAlign, spacing])

  const stackChildren = React.Children.map(children, addClassName('stack-item'))

  return (
    <div
      style={style}
      className={classNames.join(' ')}
      css={stackStyle}
    >
      {stackChildren}
    </div>
  )
}

const Item: StackItem = props => {
  const { className, children } = props
  return (
    <div className={className}>
      {children}
    </div>
  )
}

Stack.Item = Item
