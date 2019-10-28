import { useState, useEffect } from 'react'
import { skip } from 'rxjs/operators'
export const useSubject = subject => {
  const [value, setState] = useState(subject.getValue())
  useEffect(() => {
    const sub = subject.pipe(skip(1)).subscribe(s => setState(s))
    return () => sub.unsubscribe()
  })
  const newSetState = state => subject.next(state)
  return [value, newSetState]
}
