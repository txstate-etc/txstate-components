import shortid from 'shortid'
import './Toast.css'

export const Toast = {
  GRAVITY: {
    TOP_LEFT: 'toast-top-left',
    TOP_CENTER: 'toast-top-center',
    TOP_RIGHT: 'toast-top-right',
    BOTTOM_CENTER: 'toast-bottom-center',
    BOTTOM_LEFT: 'toast-bottom-left',
    BOTTOM_RIGHT: 'toast-bottom-right'
  },
  makeText ({ message, gravity = Toast.GRAVITY.TOP_CENTER, duration = 3000 }) {
    new TOAST({ message, gravity, duration }).show()
  }
}

class TOAST {
  constructor ({ message, gravity, duration }) {
    this.message = message
    this.duration = duration
    this.gravity = gravity
    this._toast = document.createElement('div')
    this._toast.id = shortid.generate()
  }

  addStyles () {
    this._toast.classList.add('toast', 'toast-visible', this.gravity)
  }

  addAria () {
    this._toast.setAttribute('aria-live', 'polite')
  }

  addMessage () {
    const el = document.createElement('span')
    const text = document.createTextNode(this.message)
    el.appendChild(text)
    this._toast.appendChild(el)
  }

  addToastToBody () {
    document.body.appendChild(this._toast)
  }

  removeToastFromBody () {
    const timeout = setTimeout(() => {
      document.body.removeChild(this._toast)
      clearTimeout(timeout)
    }, 800)
  }

  expireToast () {
    const timeout = setTimeout(() => {
      this._toast.classList.remove('toast-visible')
      this.removeToastFromBody()
      clearTimeout(timeout)
    }, this.duration)
  }

  show () {
    this.addStyles()
    this.addAria()
    this.addMessage()
    this.addToastToBody()
    this.expireToast()
  }
}
