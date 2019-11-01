import * as React from 'react'

export interface ModalProps {
  ariaLabel: string
  ariaDescription?: string
  isOpen: boolean
  onClose: () => void
  backdropTimeout: number
  centerContent?: boolean
  disableEnforceFocus: boolean
}

export const Modal: React.FC<ModalProps>
