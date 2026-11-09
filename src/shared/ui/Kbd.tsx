import type { ReactNode } from 'react'

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-line-strong bg-raised px-1 font-mono text-[11px] text-muted">
      {children}
    </kbd>
  )
}
