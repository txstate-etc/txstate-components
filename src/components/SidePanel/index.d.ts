import * as React from 'react';

export type SidePanelSize = "small" | "medium" | "large" | "custom";

export type SidePanelSide = "near" | "far";

export interface SidePanelProps {
  /**
   * Sets the size to one of three defaults or a custom value
   */
  size?: SidePanelSize;
  /**
   * Controls which side of the screen the panel will appear on, near is the side you start reading on.
   */
  side?: SidePanelSide;
  /**
   * Used when size is set to custom, ignored otherwise
   */
  customWidth?: number;
  /**
   * Uses a modal overlay (scrim) when set to true
   */
  isBlocking?: boolean;
  /**
   * Hides the panel on dismiss instead of unmounting/destroying it
   */
  isHiddenOnDismiss?: boolean;
  /**
   * Allows a click on the scrim to dismiss
   */
  isScrimDismiss?: boolean;
  /**
   * Controls visibility of the panel
   */
  isOpen?: boolean;
  /**
   * Focuses this element when the panel is dismissed
   */
  elementToFocusOnDismiss?: React.ReactElement<any>;
  /**
   * Fixes the footer at the bottom of the panel regardless of the height of the content in it
   */
  isFooterAtBottom?: boolean;
  /**
   * Called when the panel is dismissed.
   */
  onDismiss?: (...args: any[]) => any;
  /**
   * Callback fired after the panel is dismissed
   */
  onDismissed?: (...args: any[]) => any;
  /**
   * Callback fired when user clicks on the scrim to dismiss
   */
  onScrimDismissClick?: (...args: any[]) => any;
  /**
   * Callback fired when the panel is opened, __before__ animation finishes
   */
  onOpen?: (...args: any[]) => any;
  /**
   * Callback fired when the panel is opened, __after__ animation finishes
   */
  onOpened?: (...args: any[]) => any;
  /**
   * Returns custom header element.
   */
  onRenderHeader?: (...args: any[]) => any;
  /**
   * Returns custom footer element.
   */
  onRenderFooter?: (...args: any[]) => any;
  /**
   * Returns custom navigation area, which normally holds the X icon to close the panel
   */
  onRenderNavigation?: (...args: any[]) => any;
}

export const SidePanel: React.FC<SidePanelProps>;

