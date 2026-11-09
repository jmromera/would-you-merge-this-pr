import { Button } from '@/shared/ui/Button'
import { ArrowRightIcon } from '@/shared/ui/icons'
import type { Progress } from '@/features/game/useGame'
import { SystemChecks } from './SystemChecks'

interface HomeScreenProps {
  progress: Progress
  answeredCount: number
  scenarioCount: number
  onStart: () => void
  onRestart: () => void
}

const startLabel: Record<Progress, string> = {
  new: 'Start Simulation',
  'in-progress': 'Resume Simulation',
  complete: 'View Results',
}

export function HomeScreen({ progress, answeredCount, scenarioCount, onStart, onRestart }: HomeScreenProps) {
  return (
    <section className="py-14 sm:py-24">
      <h1 className="max-w-[16ch] text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
        Would You Merge This PR?
      </h1>

      <div className="mt-6 max-w-[34ch] space-y-1 text-lg text-muted sm:text-xl">
        <p>Every backend engineer thinks they would make the right decision.</p>
        <p className="text-fg">Let's find out.</p>
      </div>

      <div className="mt-12 max-w-md">
        <SystemChecks />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button variant="primary" className="h-11 px-5 text-base" autoFocus onClick={onStart}>
          {startLabel[progress]}
          <ArrowRightIcon />
        </Button>
        {progress !== 'new' && <Button onClick={onRestart}>Restart</Button>}
      </div>

      {progress === 'in-progress' && (
        <p className="mt-4 text-sm text-muted">
          Saved progress: {answeredCount} of {scenarioCount} scenarios.
        </p>
      )}
    </section>
  )
}
