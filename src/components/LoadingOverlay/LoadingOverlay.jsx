import { Modal } from '../Modal'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { Theme } from '../Theme'
import { CircularProgress } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  colorPrimary: {
    color: Theme.maroon.hex()
  },
  colorSecondary: {
    color: Theme.white.hex()
  }
})

export const LoadingOverlay = props => {
  const classes = useStyles()

  const doNothing = useCallback(() => {}, [])

  return (
    <Modal
      ariaLabel='loading'
      onClose={doNothing}
      isOpen={props.isLoading}
      centerContent
      disableEnforceFocus
    >
      <CircularProgress color={props.variant} classes={{ colorPrimary: classes.colorPrimary, colorSecondary: classes.colorSecondary }} size={80} />
    </Modal>
  )
}

LoadingOverlay.defaultProps = {
  isLoading: false,
  variant: 'primary'
}

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool,
  ariaDescription: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

export default LoadingOverlay
