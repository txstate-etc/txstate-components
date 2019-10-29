import { useState, useEffect } from 'react'
export const useSubject = subject => {
  const [value, setState] = useState(subject.getValue())
  useEffect(() => {
    const sub = subject.subscribe(s => setState(s))
    return () => sub.unsubscribe()
  }, [subject])
  const newSetState = state => subject.next(state)
  return [value, newSetState]
}
