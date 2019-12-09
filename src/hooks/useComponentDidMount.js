import { useEffect, useRef } from 'react'

function useComponentDidMount (effect) {
  const dependencyArray = useRef(effect)
  useEffect(effect, [dependencyArray.current])
}

export default useComponentDidMount
