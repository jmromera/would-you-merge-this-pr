import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { readStorage, writeStorage } from '@/core/storage'
import { playCue } from './playCue'
import type { SoundCue } from './playCue'

const SOUND_KEY = 'wymtpr:sound:v1'

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  play: (cue: SoundCue) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  // Off by default: nobody expects a beep when opening a link at work.
  const [enabled, setEnabled] = useState(() => readStorage<boolean>(SOUND_KEY) === true)

  // Read through a ref so `play` stays stable and effects that call it do not re-run on toggle.
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  const toggle = useCallback(() => {
    const next = !enabled
    setEnabled(next)
    writeStorage(SOUND_KEY, next)
    if (next) playCue('select')
  }, [enabled])

  const play = useCallback((cue: SoundCue) => {
    if (enabledRef.current) playCue(cue)
  }, [])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])
  return <SoundContext value={value}>{children}</SoundContext>
}

export function useSound(): SoundContextValue {
  const value = useContext(SoundContext)
  if (!value) throw new Error('useSound must be used inside <SoundProvider>')
  return value
}
