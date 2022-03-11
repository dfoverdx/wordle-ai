import { useState, useRef, useEffect } from 'react'

const usePrevState = initialValue => {
  const [state, setState] = useState(initialValue)
  const prevRef = useRef(state)
  
  useEffect(() => () => prevRef.current = state)
  
  const updatePrev = useRef(
    () => (prevRef.current = state)
  ).current
  
  return [
    state,
    setState,
    prevRef,
    updatePrev,
  ]
}

export default usePrevState