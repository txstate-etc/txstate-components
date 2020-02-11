import { useEffect, useRef } from 'react'
import { BehaviorSubject, from, of } from 'rxjs'
import {
  tap,
  debounceTime,
  map,
  catchError,
  switchMap
} from 'rxjs/operators'

const useTypeAhead = ({
  initialValue = null,
  debounce = 500,
  promise = (() => null),
  transform = (result => result),
  handler = (() => null)
}) => {
  const subject$ = useRef(new BehaviorSubject(null))

  if (initialValue) subject$.current.next(initialValue)

  useEffect(() => {
    subject$.current.pipe(
      debounceTime(debounce),
      switchMap(value => {
        return from(promise(value)).pipe(
          catchError(err => of(err))
        )
      }),
      map(transform),
      tap(handler)
    ).subscribe()

    return () => subject$.current.unsubscribe
  }, [])

  return subject$.current
}

export default useTypeAhead
