import type { Choice, Scenario } from '@/core/types'
import { useFocusOnMount } from '@/shared/hooks/useFocusOnMount'
import { useKeydown } from '@/shared/hooks/useKeydown'
import { ChoiceList } from './ChoiceList'
import { CodeSnippet } from './CodeSnippet'
import { Consequence } from './Consequence'

interface ScenarioViewProps {
  scenario: Scenario
  selectedChoice?: Choice
  isLast: boolean
  onChoose: (choiceId: string) => void
  onNext: () => void
}

export function ScenarioView({ scenario, selectedChoice, isLast, onChoose, onNext }: ScenarioViewProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>()
  const { title, when, situation, quote, snippet, choices } = scenario

  // 1-4 pick an option while the scenario is open.
  useKeydown((event) => {
    const choice = choices[Number(event.key) - 1]
    if (choice) onChoose(choice.id)
  }, !selectedChoice)

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-sm text-accent">{when}</p>
        <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl">
          {title}
        </h2>
      </header>

      <div className="max-w-[60ch] space-y-3 text-lg leading-relaxed text-muted">
        {situation.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {quote && (
        <blockquote className="border-l-2 border-line-strong pl-5">
          <div className="space-y-0.5 text-xl">
            {quote.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <footer className="mt-2 text-sm text-muted">{quote.from}</footer>
        </blockquote>
      )}

      {snippet && <CodeSnippet snippet={snippet} />}

      <section aria-labelledby="choices-heading" className="space-y-4">
        <h3 id="choices-heading" className="text-lg font-medium">
          What do you do?
        </h3>
        <ChoiceList choices={choices} selectedId={selectedChoice?.id} onChoose={onChoose} />
        <div aria-live="polite">
          {selectedChoice && <Consequence choice={selectedChoice} isLast={isLast} onNext={onNext} />}
        </div>
      </section>
    </article>
  )
}
