import BaseModal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import React from 'react'

export interface ModalProps {
  ariaLabel: string
  isOpen: boolean
  onClose: () => void
  ariaDescription?: string
  backdropTimeout?: number
  centerContent?: boolean
  disableEnforceFocus?: boolean
  disableRestoreFocus?: boolean
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  backdropTimeout = 500,
  disableEnforceFocus = false,
  ariaLabel,
  onClose,
  ariaDescription,
  centerContent,
  disableRestoreFocus,
  children
}) => {
  
  return (
    <BaseModal
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      disableAutoFocus={disableEnforceFocus}
      disableEnforceFocus={disableEnforceFocus}
      BackdropProps={{
        timeout: backdropTimeout
      }}
      slots={{
        backdrop: Backdrop
      }}
      disableRestoreFocus={disableRestoreFocus}
      component='div'
    >
      <Fade in={isOpen}>
        <div style={centerContent ? { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } : undefined}>
          {children}
        </div>
      </Fade>
    </BaseModal>
  )
}

export default Modal
