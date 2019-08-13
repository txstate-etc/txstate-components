import ReactDOM from 'react-dom'
import { observable, autorun } from 'mobx'
import { observer } from 'mobx-react-lite'

const store = observable({
  modalElement: null,
  initModal () {
    const el = document.createElement('div')
    el.id = 'REACT-PORTAL'
    this.modalElement = el
  }
})

autorun(reaction => {
  if (!store.modalElement) {
    store.initModal()
  }
  document.body.appendChild(store.modalElement)
  reaction.dispose()
})

export const Portal = observer(props => {
  const { children } = props

  return ReactDOM.createPortal(children, store.modalElement)
})
