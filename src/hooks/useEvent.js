import { useEffect } from 'react'
import { Subject } from '../utils'

export const useEvent = (event, handler) => {
  useEffect(() => {
    if (typeof handler !== 'function') return
    Subject.subscribe(event, handler)
    return () => Subject.unsubscribe(event, handler)
  }, [event, handler])

  return value => Subject.next(event, value)
}
