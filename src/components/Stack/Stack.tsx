/** @jsx jsx */
import React, { useMemo } from 'react'
import { StackComponent, StackItem } from './Stack.types'
import { Dictionary } from '../../utils/helper.types'
import { css, jsx } from '@emotion/core'
import { classNames } from '../../utils/helpers'

const alignmentMap: Dictionary<string> = {
  start: 'flex-start',
  end: 'flex-end'
}

const addClassName = (className: string) => (child: React.ReactNode) => {
  if (!React.isValidElement(child)) {
    return null
  }

  return React.cloneElement(child, { className: classNames(child.props.className, className) })
}

export const Stack: StackComponent = ({
  spacing,
  style,
  horizontal,
  horizontalAlign = 'start',
  verticalAlign = 'start',
  className,
  wrap,
  children
}) => {
  const stackStyle = useMemo(() => {
    const hAlign = alignmentMap[horizontalAlign] ?? horizontalAlign
    const vAlign = alignmentMap[verticalAlign] ?? verticalAlign
    const flexWrap = wrap ? 'flex-wrap: wrap;' : ''
    return css`
      display: flex;
      ${flexWrap}
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
  }, [horizontalAlign, verticalAlign, wrap, spacing])

  const stackChildren = React.Children.map(children, addClassName('stack-item'))

  return (
    <div
      style={style}
      className={classNames({ horizontal: !!horizontal, vertical: !horizontal }, className)}
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
