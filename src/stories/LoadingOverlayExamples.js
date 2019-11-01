import React from 'react'
import { LoadingOverlay, Button } from '../components'

class LoadingOverlayExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidUpdate () {
    if (this.state.isLoading) {
      this.timeout = setTimeout(() => {
        this.setState({ isLoading: false })
      }, 3000)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  handleClose () {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render () {
    return (
      <>
        <Button label='Start loading' onClick={() => this.setState({ isLoading: true })} />
        <LoadingOverlay isLoading={this.state.isLoading} ariaDescription='Please wait, content is loading' variant={this.props.variant} />
      </>
    )
  }
}

export default LoadingOverlayExamples
