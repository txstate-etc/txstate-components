import { useRef, useEffect } from 'react'
import { Maybe } from '../utils/helper.types'

export const useEventListener = (
  eventName: string,
  handler: Function,
  _element?: Maybe<Element | typeof window>
) => {
  const savedHandler = useRef<Function>()
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = _element ?? window
    const isSupported = element && element.addEventListener

    if (!isSupported) return
    const eventListener = (event: any) =>
      savedHandler.current && savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, _element])
}
