import * as React from 'react'

export interface ModalProps {
  ariaLabel: string
  isOpen: boolean
  onClose: () => void
  ariaDescription?: string
  backdropTimeout?: number
  centerContent?: boolean
  disableEnforceFocus?: boolean
}

export const Modal: React.FC<ModalProps>
