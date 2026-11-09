import { useEffect } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { GameScreen } from '@/features/game/GameScreen'
import { useGame } from '@/features/game/useGame'
import { HomeScreen } from '@/features/home/HomeScreen'
import { ResultsScreen } from '@/features/results/ResultsScreen'
import { useSound } from '@/shared/sound/SoundProvider'
import { TopBar } from './TopBar'

export default function App() {
  const game = useGame()
  const { play } = useSound()
  const { phase, index } = game

  // Every new screen or scenario starts at the top.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [phase, index])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <TopBar onHome={game.goHome} onRestart={game.progress === 'new' ? undefined : game.restart} />
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 sm:px-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {phase === 'home' && (
                <HomeScreen
                  progress={game.progress}
                  answeredCount={game.answeredCount}
                  scenarioCount={game.scenarioCount}
                  onStart={() => {
                    play('next')
                    game.start()
                  }}
                  onRestart={game.restart}
                />
              )}
              {phase === 'playing' && (
                <GameScreen
                  scenario={game.scenario}
                  index={index}
                  scenarioCount={game.scenarioCount}
                  answeredCount={game.answeredCount}
                  selectedChoice={game.selectedChoice}
                  isLast={game.isLastScenario}
                  onChoose={(choiceId) => {
                    play('select')
                    game.choose(choiceId)
                  }}
                  onNext={() => {
                    play('next')
                    game.next()
                  }}
                />
              )}
              {phase === 'results' && game.report && (
                <ResultsScreen report={game.report} onRestart={game.restart} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  )
}
