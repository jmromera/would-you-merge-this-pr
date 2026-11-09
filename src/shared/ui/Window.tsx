import type { ReactNode } from 'react'

interface WindowProps {
  title: string
  trailing?: ReactNode
  children: ReactNode
  className?: string
}

/** A bordered panel with a file-name title bar, used for code, logs and terminal output. */
export function Window({ title, trailing, children, className = '' }: WindowProps) {
  return (
    <figure className={`overflow-hidden rounded-lg border border-line bg-surface ${className}`}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-raised/60 px-4 py-2.5 font-mono text-xs text-muted">
        <span className="truncate">{title}</span>
        {trailing && <span className="shrink-0">{trailing}</span>}
      </figcaption>
      {children}
    </figure>
  )
}
