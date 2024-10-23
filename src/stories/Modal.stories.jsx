import React from 'react'
import { Modal, Button } from '../components'

class ModalExamples extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <>
        <Button label='Open modal' onClick={() => this.setState({ isOpen: true })} />
        <Modal
          ariaLabel='Modal Label'
          isOpen={this.state.isOpen}
          onClose={this.handleClose}
          centerContent
        >
          <div style={{ background: 'white', padding: 32 }}>
            <p>I am in a modal</p>
          </div>
        </Modal>
      </>
    )
  }
}

export default {
  title: 'Component | Modal',
  component: ModalExamples
}

export const ModalEx = {
  name: 'Modal',
  component: ModalExamples
}
