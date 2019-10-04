import * as React from 'react';

export type StackVerticalAlign = "start" | "center" | "end" | "space-evenly" | "space-between" | "space-around" | "stretch" | "baseline";

export type StackHorizontalAlign = "start" | "center" | "end" | "space-evenly" | "space-between" | "space-around" | "stretch" | "baseline";

export type StackRenderAs = string | React.ReactElement<any>;

export interface StackProps {
  /**
   * Vertical alignment of immediate children in the stack. Follows flexbox alignment rules.
   */
  verticalAlign?: StackVerticalAlign;
  /**
   * Same as verticalAlign, only horizontal! 😲
   */
  horizontalAlign?: StackHorizontalAlign;
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
  renderAs?: StackRenderAs;
}

export const Stack: React.FC<StackProps>;

