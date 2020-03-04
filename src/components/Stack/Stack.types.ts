import React from 'react'

export interface StackProps {
  /** Vertical alignment of immediate children in the stack. Follows flexbox alignment rules. */
  verticalAlign?: Alignment
  /** Same as verticalAlign, only horizontal! 😲 */
  horizontalAlign?: Alignment
  /** If true, items in the stack will wrap */
  wrap?: boolean,
  /** If true, the children will be laid out horizontally */
  horizontal?: boolean,
  /** Spacing between children. Does not provide margin or padding in the stack itself. */
  spacing?: number,
  /** Render the stack as a different html element */
  className?: string
  style?: React.CSSProperties
}

export interface StackItemProps {
  className?: string
}

export type StackItem = React.FunctionComponent<StackItemProps>

export type StackComponent = React.FunctionComponent<StackProps> & { Item: StackItem }

export type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch'
