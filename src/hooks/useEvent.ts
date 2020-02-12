import { useEffect, useCallback } from 'react'
import { Subject, HandlerFunc, SubjectEvent } from '../utils/Subject'

export const useEvent = (event: SubjectEvent, handler?: HandlerFunc) => {
  useEffect(() => {
    if (typeof handler !== 'function') return
    Subject.subscribe(event, handler)
    return () => Subject.unsubscribe(event, handler)
  }, [event, handler])

  return useCallback((...values) => Subject.next(event, ...values), [event])
}
