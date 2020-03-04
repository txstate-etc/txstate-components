type HandlerMap = {
  [key: string]: HandlerFunc[]
}

export type SubjectEvent = string

export type HandlerFunc = (...args: any[]) => void

const _handlers: HandlerMap = {}

export const Subject = {
  subscribe (event: SubjectEvent, handler: HandlerFunc) {
    if (!handler || typeof handler !== 'function') {
      throw new Error(`Subscribing to event ${event} requires a handler function.`)
    }
    if (!_handlers[event]) _handlers[event] = []
    _handlers[event].push(handler)
  },
  unsubscribe (event: SubjectEvent, handler: HandlerFunc) {
    if (!_handlers[event]) return
    _handlers[event] = _handlers[event].filter(func => func !== handler)
  },
  next (event: SubjectEvent, ...args: any[]) {
    if (!_handlers[event]) return
    _handlers[event].forEach(handler => {
      if (typeof handler === 'function') {
        handler(...args)
      }
    })
  }
}

Object.freeze(Subject)
