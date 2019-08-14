import { useState, useCallback } from 'react'

export const usePanel = (defaultOpen) => {
  const [isOpen, setIsOpen] = useState(!!defaultOpen)

  const toggle = useCallback(() => {
    setIsOpen(isOpen => !isOpen)
  }, [setIsOpen])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return {
    isOpen,
    open,
    toggle,
    close
  }
}
