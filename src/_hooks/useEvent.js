import { useEffect, useCallback } from 'react'
import { Subject } from '../utils'

export const useEvent = (event, handler) => {
  useEffect(() => {
    if (typeof handler !== 'function') return
    Subject.subscribe(event, handler)
    return () => Subject.unsubscribe(event, handler)
  }, [event, handler])

  return useCallback((...values) => Subject.next(event, ...values), [event])
}
