import { useEffect, useMemo, useReducer } from 'react'
import { buildReport, findChoice, isComplete } from '@/core/scoring'
import { scenarios } from '@/data/scenarios'
import { titles } from '@/data/titles'
import { gameReducer, initialState } from './gameReducer'
import { clearGame, loadGame, saveGame } from './persistence'

export type Progress = 'new' | 'in-progress' | 'complete'

const reducer = gameReducer(scenarios)

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState(loadGame(scenarios)))
  const { answers, index, phase } = state

  const answeredCount = Object.keys(answers).length

  useEffect(() => {
    if (answeredCount === 0) clearGame()
    else saveGame({ index, answers })
  }, [answeredCount, index, answers])

  const scenario = scenarios[index]!
  const complete = isComplete(scenarios, answers)
  const progress: Progress = complete ? 'complete' : answeredCount > 0 ? 'in-progress' : 'new'
  const report = useMemo(
    () => (phase === 'results' ? buildReport(scenarios, answers, titles) : null),
    [phase, answers],
  )

  return {
    phase,
    progress,
    scenario,
    scenarioCount: scenarios.length,
    index,
    answeredCount,
    selectedChoice: findChoice(scenario, answers),
    isLastScenario: index === scenarios.length - 1,
    report,
    start: () => dispatch({ type: 'start' }),
    choose: (choiceId: string) => dispatch({ type: 'choose', scenarioId: scenario.id, choiceId }),
    next: () => dispatch({ type: 'next' }),
    goHome: () => dispatch({ type: 'home' }),
    restart: () => dispatch({ type: 'restart' }),
  }
}
