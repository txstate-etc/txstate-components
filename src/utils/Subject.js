const _handlers = {}

export const Subject = {
  subscribe (event, handler) {
    if (!_handlers[event]) _handlers[event] = []
    _handlers[event].push(handler)
  },
  unsubscribe (event, handler) {
    if (!_handlers[event]) return
    _handlers[event] = _handlers[event].filter(func => func !== handler)
  },
  next (event, ...args) {
    if (!_handlers[event]) return
    _handlers[event].forEach(handler => {
      if (typeof handler === 'function') {
        handler(...args)
      }
    })
  }
}

Object.freeze(Subject)
