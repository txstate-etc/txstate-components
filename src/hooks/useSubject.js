import { useState, useEffect, useContext, useMemo } from 'react'
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

export const useDerivedSubject = (subject, transform, mutate) => {
  const derived = useMemo(() => new DerivedSubject(subject, transform, mutate), [subject, transform.toString(), mutate.toString()])
  return useSubject(derived)
}

export const useDerivedSub = (subject, transform) => {
  const derived = useMemo(() => new DerivedSubject(subject, transform), [subject, transform.toString()])
  return useSub(derived)
}

export const useDerivedSubFromContext = (context, transform) => {
  const subject = useContext(context)
  return useDerivedSub(subject, transform)
}
