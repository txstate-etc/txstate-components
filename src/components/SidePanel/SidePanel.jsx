import React from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelType } from '@fluentui/react/lib/Panel'

const panelTypeMap = ({ size, side }) => {
  switch (size) {
    case 'small':
      if (side === 'near') return PanelType.smallFixedNear
      if (side === 'far') return PanelType.smallFixedFar
      return PanelType.smallFixedNear
    case 'medium':
      return PanelType.medium
    case 'large':
      return PanelType.largeFixed
    case 'custom':
      if (side === 'near') return PanelType.customNear
      return PanelType.custom
    default:
      return PanelType.smallFixedNear
  }
}

export const SidePanel = props => {
  const {
    children,
    isOpen,
    className,
    customWidth,
    elementToFocusOnDismiss,
    isBlocking,
    isFooterAtBottom,
    isHiddenOnDismiss,
    isScrimDismiss,
    onDismiss,
    onDismissed,
    onScrimDismissClick,
    onOpen,
    onOpened,
    onRenderHeader,
    onRenderFooter,
    onRenderNavigation,
    size,
    side
  } = props

  return (
    <Panel
      isOpen={isOpen}
      className={className}
      type={panelTypeMap({ size, side })}
      customWidth={customWidth}
      elementToFocusOnDismiss={elementToFocusOnDismiss}
      isBlocking={isBlocking}
      isFooterAtBottom={isFooterAtBottom}
      isHiddenOnDismiss={isHiddenOnDismiss}
      isLightDismiss={isScrimDismiss}
      onDismiss={onDismiss}
      onDismissed={onDismissed}
      onScrimDismissClick={onScrimDismissClick}
      onOpen={onOpen}
      onOpened={onOpened}
      onRenderHeader={onRenderHeader}
      onRenderFooterContent={onRenderFooter}
      onRenderNavigationContent={onRenderNavigation}
    >
      {children}
    </Panel>
  )
}

SidePanel.defaultProps = {
  size: 'small',
  side: 'far',
  isBlocking: true,
  isHiddenOnDismiss: false,
  isScrimDismiss: true
}

SidePanel.propTypes = {
  /** Sets the size to one of three defaults or a custom value */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'custom']),
  /** Controls which side of the screen the panel will appear on, near is the side you start reading on. */
  side: PropTypes.oneOf(['near', 'far']),
  /** Used when size is set to custom, ignored otherwise */
  customWidth: PropTypes.number,
  /** Uses a modal overlay (scrim) when set to true  */
  isBlocking: PropTypes.bool,
  /** Hides the panel on dismiss instead of unmounting/destroying it */
  isHiddenOnDismiss: PropTypes.bool,
  /** Allows a click on the scrim to dismiss */
  isScrimDismiss: PropTypes.bool,
  /** Controls visibility of the panel */
  isOpen: PropTypes.bool,
  /** Focuses this element when the panel is dismissed */
  elementToFocusOnDismiss: PropTypes.element,
  /** Fixes the footer at the bottom of the panel regardless of the height of the content in it */
  isFooterAtBottom: PropTypes.bool,
  /** Called when the panel is dismissed. */
  onDismiss: PropTypes.func,
  /** Callback fired after the panel is dismissed */
  onDismissed: PropTypes.func,
  /** Callback fired when user clicks on the scrim to dismiss */
  onScrimDismissClick: PropTypes.func,
  /** Callback fired when the panel is opened, __before__ animation finishes */
  onOpen: PropTypes.func,
  /** Callback fired when the panel is opened, __after__ animation finishes */
  onOpened: PropTypes.func,
  /** Returns custom header element. */
  onRenderHeader: PropTypes.func,
  /** Returns custom footer element. */
  onRenderFooter: PropTypes.func,
  /** Returns custom navigation area, which normally holds the X icon to close the panel */
  onRenderNavigation: PropTypes.func
}
