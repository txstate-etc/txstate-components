import React from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'

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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'custom']),
  side: PropTypes.oneOf(['near', 'far'])
}
