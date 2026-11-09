import type { KeyboardEvent } from 'react'
import type { Choice } from '@/core/types'
import { Kbd } from '@/shared/ui/Kbd'

interface ChoiceListProps {
  choices: Choice[]
  selectedId?: string
  onChoose: (choiceId: string) => void
}

export function ChoiceList({ choices, selectedId, onChoose }: ChoiceListProps) {
  const answered = selectedId !== undefined

  // Arrow keys move focus between options; Enter or Space on a focused option chooses it.
  const moveFocus = (event: KeyboardEvent<HTMLUListElement>) => {
    const step = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
    if (step === 0) return
    const options = Array.from(event.currentTarget.querySelectorAll('button'))
    const current = options.indexOf(document.activeElement as HTMLButtonElement)
    options[(current + step + options.length) % options.length]?.focus()
    event.preventDefault()
  }

  return (
    <ul className="space-y-2" onKeyDown={moveFocus}>
      {choices.map((choice, index) => {
        const selected = choice.id === selectedId
        return (
          <li key={choice.id}>
            <button
              type="button"
              aria-pressed={answered ? selected : undefined}
              aria-disabled={answered || undefined}
              onClick={() => !answered && onChoose(choice.id)}
              className={`flex w-full items-start gap-4 rounded-lg border px-4 py-3.5 text-left transition-colors ${
                selected
                  ? 'border-accent bg-raised'
                  : answered
                    ? 'cursor-default border-line bg-surface opacity-45'
                    : 'border-line bg-surface hover:border-line-strong hover:bg-raised'
              }`}
            >
              <span className="mt-0.5">
                <Kbd>{index + 1}</Kbd>
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{choice.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{choice.detail}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
