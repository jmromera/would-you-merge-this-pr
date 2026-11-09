import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Window } from '@/shared/ui/Window'
import { CheckIcon } from '@/shared/ui/icons'

const checks = [
  { label: 'Node.js', detail: 'v22 LTS' },
  { label: 'TypeScript', detail: 'strict: true' },
  { label: 'CI/CD', detail: 'all green (this time)' },
  { label: 'Monitoring', detail: '3 alerts muted' },
  { label: 'Legacy Code', detail: 'do not touch' },
]

const FIRST_CHECK_DELAY_MS = 600
const CHECK_INTERVAL_MS = 420

/** CI-style pre-flight that passes one check at a time. Shows everything at once for reduced motion. */
export function SystemChecks() {
  const reduceMotion = useReducedMotion()
  const [passed, setPassed] = useState(reduceMotion ? checks.length : 0)
  const done = passed === checks.length

  useEffect(() => {
    if (done) return
    const timer = window.setTimeout(
      () => setPassed((count) => count + 1),
      passed === 0 ? FIRST_CHECK_DELAY_MS : CHECK_INTERVAL_MS,
    )
    return () => window.clearTimeout(timer)
  }, [passed, done])

  return (
    <Window title="npm run preflight">
      <ul className="space-y-2 px-4 py-4 font-mono text-sm" aria-label="System checks">
        {checks.map(({ label, detail }, index) => {
          const isPassed = index < passed
          return (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-4 shrink-0 items-center justify-center">
                {isPassed ? (
                  <CheckIcon className="text-add" />
                ) : (
                  <span className={`size-1.5 rounded-full bg-faint ${index === passed ? 'animate-pending' : ''}`} />
                )}
              </span>
              <span className={isPassed ? 'text-fg' : 'text-faint'}>{label}</span>
              <span className="sr-only">{isPassed ? 'passed' : 'pending'}</span>
              <span className={`ml-auto text-right text-xs text-faint transition-opacity ${isPassed ? 'opacity-100' : 'opacity-0'}`}>
                {detail}
              </span>
            </li>
          )
        })}
      </ul>
    </Window>
  )
}
