import BaseModal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import PropTypes from 'prop-types'

import React from 'react'

export const Modal = props => {
  const surroundStyles = props.centerContent
    ? { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    : undefined

  return (
    <BaseModal
      aria-labelledby={props.ariaLabel}
      aria-describedby={props.ariaDescription}
      open={props.isOpen}
      onClose={props.onClose}
      centerContent={props.centerContent}
      closeAfterTransition
      disableAutoFocus={props.disableEnforceFocus}
      disableEnforceFocus={props.disableEnforceFocus}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: props.backdropTimeout
      }}
    >
      <Fade in={props.isOpen}>
        <div style={surroundStyles}>
          {props.children}
        </div>
      </Fade>
    </BaseModal>
  )
}

Modal.defaultProps = {
  isOpen: false,
  backdropTimeout: 500,
  onClose: () => {},
  disableEnforceFocus: false
}

Modal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  ariaDescription: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  backdropTimeout: PropTypes.number,
  centerContent: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool
}

export default Modal
