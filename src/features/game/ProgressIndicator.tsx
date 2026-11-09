interface ProgressIndicatorProps {
  /** Zero-based position of the scenario on screen. */
  current: number
  total: number
  answered: number
}

export function ProgressIndicator({ current, total, answered }: ProgressIndicatorProps) {
  const text = `Scenario ${current + 1} of ${total}`

  return (
    <div
      role="progressbar"
      aria-label="Simulation progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={answered}
      aria-valuetext={`${text}, ${answered} answered`}
      className="space-y-3"
    >
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index < answered ? 'bg-accent' : index === current ? 'bg-muted' : 'bg-line'
            }`}
          />
        ))}
      </div>
      <p className="font-mono text-xs text-muted" aria-hidden="true">
        {text}
      </p>
    </div>
  )
}
