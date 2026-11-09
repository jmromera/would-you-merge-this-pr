import { readStorage, removeStorage, writeStorage } from '@/core/storage'
import type { Answers, Scenario } from '@/core/types'

const SAVE_KEY = 'wymtpr:save:v1'

export interface SavedGame {
  index: number
  answers: Answers
}

/** Keeps only answers that still match a known scenario and choice, so stale saves cannot break the game. */
export function sanitizeSave(saved: unknown, scenarios: Scenario[]): SavedGame | null {
  if (typeof saved !== 'object' || saved === null) return null
  const { index, answers } = saved as Partial<SavedGame>
  if (typeof index !== 'number' || typeof answers !== 'object' || answers === null) return null

  const valid: Answers = {}
  for (const scenario of scenarios) {
    const choiceId = answers[scenario.id]
    if (scenario.choices.some((choice) => choice.id === choiceId)) valid[scenario.id] = choiceId as string
  }
  if (Object.keys(valid).length === 0) return null

  return { index: Math.min(Math.max(Math.trunc(index), 0), scenarios.length - 1), answers: valid }
}

export const loadGame = (scenarios: Scenario[]) => sanitizeSave(readStorage(SAVE_KEY), scenarios)

export const saveGame = (game: SavedGame) => writeStorage(SAVE_KEY, game)

export const clearGame = () => removeStorage(SAVE_KEY)
