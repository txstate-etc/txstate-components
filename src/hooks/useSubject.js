import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { DerivedSubject } from '../utils/DerivedSubject'
import { skip } from 'rxjs/operators'
export const useSubject = subject => {
  const [value, setState] = useState(subject.value)
  useEffect(() => {
    const sub = subject.pipe(skip(1)).subscribe(s => setState(s))
    return () => sub.unsubscribe()
  }, [subject])
  const newSetState = state => subject.next(state)
  return [value, newSetState]
}

export const useSub = subject => {
  const [value] = useSubject(subject)
  return value
}

export const useSubFromContext = context => {
  const subject = useContext(context)
  return useSub(subject)
}

export const useDerivedSub = (subject, transform) => {
  const derivedtransform = useCallback(transform)
  const derived = useMemo(() => new DerivedSubject(subject, derivedtransform), [subject, derivedtransform])
  return useSub(derived)
}

export const useDerivedSubFromContext = (context, transform) => {
  const subject = useContext(context)
  return useDerivedSub(subject, transform)
}
