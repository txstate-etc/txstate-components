import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { DerivedStore } from '../utils'
import { skip } from 'rxjs/operators'

export const useAndUpdateStore = store => {
  const [value, setState] = useState(store.value)
  useEffect(() => {
    const sub = store.pipe(skip(1)).subscribe(s => setState(s))
    return () => sub.unsubscribe()
  }, [store])
  const newSetState = useCallback(state => store.next(state), [store])
  return [value, newSetState]
}

export const useStore = store => {
  const [value] = useAndUpdateStore(store)
  return value
}

export const useStoreFromContext = context => {
  const store = useContext(context)
  return useStore(store)
}

export const useAndUpdateDerivedStore = (store, getter, setter) => {
  const derived = useMemo(() => new DerivedStore(store, getter, setter), [store, getter.toString(), (setter || '').toString()])
  useEffect(() => {
    return () => derived.complete()
  }, [derived])
  return useAndUpdateStore(derived)
}

export const useAndUpdateDerivedStoreFromContext = (context, getter, setter) => {
  const store = useContext(context)
  return useAndUpdateDerivedStore(store, getter, setter)
}

export const useDerivedStore = (store, getter) => {
  const [value] = useAndUpdateDerivedStore(store, getter)
  return value
}

export const useDerivedStoreFromContext = (context, getter) => {
  const store = useContext(context)
  return useDerivedStore(store, getter)
}
