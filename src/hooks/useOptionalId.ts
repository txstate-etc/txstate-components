import { useRef } from 'react'
import nanoid from 'nanoid'

export const useOptionalId = (id?: string) => {
  const _id = useRef(id ?? nanoid(10))
  return _id.current
}
