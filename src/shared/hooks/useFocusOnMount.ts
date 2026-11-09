import { useEffect, useRef } from 'react'

/** Moves focus to the returned element on mount so screen readers announce a new screen or step. */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])
  return ref
}
