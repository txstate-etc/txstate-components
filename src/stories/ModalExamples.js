import React from 'react'
import { Modal, Button } from '../components'

class ModalExamples extends React.Component {
    state = {
      isOpen: false
    }

    handleClose = () => {
      console.log('Modal closed')
      this.setState({ isOpen: !this.state.isOpen })
    }

    render () {
      return (
        <>
          <Button label='Open Modal' onClick={() => this.setState({ isOpen: true })} />
          <Modal
            aria-labelledby='Modal Label'
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

export default ModalExamples
