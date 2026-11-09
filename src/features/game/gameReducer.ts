import { isComplete } from '@/core/scoring'
import type { Answers, Scenario } from '@/core/types'
import type { SavedGame } from './persistence'

export type Phase = 'home' | 'playing' | 'results'

export interface GameState {
  phase: Phase
  index: number
  answers: Answers
}

export type GameAction =
  | { type: 'start' }
  | { type: 'choose'; scenarioId: string; choiceId: string }
  | { type: 'next' }
  | { type: 'home' }
  | { type: 'restart' }

/** The app always opens on the home screen; a save only restores progress. */
export const initialState = (saved: SavedGame | null): GameState => ({
  phase: 'home',
  index: saved?.index ?? 0,
  answers: saved?.answers ?? {},
})

export function gameReducer(scenarios: Scenario[]) {
  return (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case 'start':
        return { ...state, phase: isComplete(scenarios, state.answers) ? 'results' : 'playing' }
      case 'choose':
        if (state.phase !== 'playing' || action.scenarioId in state.answers) return state
        return { ...state, answers: { ...state.answers, [action.scenarioId]: action.choiceId } }
      case 'next':
        return state.index >= scenarios.length - 1
          ? { ...state, phase: 'results' }
          : { ...state, index: state.index + 1 }
      case 'home':
        return { ...state, phase: 'home' }
      case 'restart':
        return initialState(null)
    }
  }
}
