import React from 'react'
import { Alignment, Stack as OfficeStack } from '@fluentui/react/lib/Stack'

export interface StackProps {
  /**
   * Vertical alignment of immediate children in the stack. Follows flexbox alignment rules.
   */
  verticalAlign?: Alignment;
  /**
   * Same as verticalAlign, only horizontal! 😲
   */
  horizontalAlign?: Alignment;
  /**
   * If true, the children will be laid out horizontally
   */
  horizontal?: boolean;
  /**
   * Spacing between children. Does not provide margin or padding in the stack itself.
   */
  spacing?: number;
  /**
   * If true, items in the stack will wrap
   */
  wrap?: boolean;
  /**
   * Render the stack as a different html element
   */
  renderAs?: React.ElementType<React.HTMLAttributes<HTMLElement>, keyof React.JSX.IntrinsicElements> | undefined;
  style?: any;
  className?: string;
  children?: React.ReactNode
}

export const Stack: React.FC<StackProps> = ({
  horizontal = false,
  verticalAlign = 'start',
  horizontalAlign = 'start',
  renderAs = 'div',
  spacing,
  style,
  wrap,
  className,
  children
}) => {

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
