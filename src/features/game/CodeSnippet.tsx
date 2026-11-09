import type { LineTone, Snippet } from '@/core/types'
import { Window } from '@/shared/ui/Window'

const toneClass: Record<LineTone, string> = {
  plain: 'text-fg/90',
  add: 'bg-add/10 text-add',
  del: 'bg-del/10 text-del',
  error: 'text-del',
  warn: 'text-warn',
  muted: 'text-faint',
}

export function CodeSnippet({ snippet }: { snippet: Snippet }) {
  const { filename, caption, stats, lines } = snippet

  return (
    <Window
      title={filename}
      trailing={
        stats && (
          <span>
            <span className="text-add">+{stats.additions}</span>{' '}
            <span className="text-del">-{stats.deletions}</span>
          </span>
        )
      }
    >
      {/* Focusable so keyboard users can scroll long lines. */}
      <pre tabIndex={0} className="overflow-x-auto py-3 font-mono text-[13px] leading-6">
        <code>
          {lines.map(({ text, tone = 'plain' }, index) => (
            <div key={index} className={`min-w-max px-4 whitespace-pre ${toneClass[tone]}`}>
              {text || ' '}
            </div>
          ))}
        </code>
      </pre>
      {caption && <p className="border-t border-line px-4 py-2 font-mono text-xs text-faint">{caption}</p>}
    </Window>
  )
}
