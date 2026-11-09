import { AnimatePresence, motion } from 'framer-motion'
import type { Choice, Scenario } from '@/core/types'
import { ProgressIndicator } from './ProgressIndicator'
import { ScenarioView } from './ScenarioView'

interface GameScreenProps {
  scenario: Scenario
  index: number
  scenarioCount: number
  answeredCount: number
  selectedChoice?: Choice
  isLast: boolean
  onChoose: (choiceId: string) => void
  onNext: () => void
}

export function GameScreen({
  scenario,
  index,
  scenarioCount,
  answeredCount,
  selectedChoice,
  isLast,
  onChoose,
  onNext,
}: GameScreenProps) {
  return (
    <section className="space-y-10 py-10 sm:py-14">
      <h1 className="sr-only">Would You Merge This PR?</h1>
      <ProgressIndicator current={index} total={scenarioCount} answered={answeredCount} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ScenarioView
            scenario={scenario}
            selectedChoice={selectedChoice}
            isLast={isLast}
            onChoose={onChoose}
            onNext={onNext}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
