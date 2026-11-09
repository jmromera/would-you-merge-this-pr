import { beforeEach, describe, expect, it } from 'vitest'
import { scenarios } from '@/data/scenarios'
import { gameReducer, initialState } from './gameReducer'
import type { GameState } from './gameReducer'
import { loadGame, saveGame, sanitizeSave } from './persistence'

const reduce = gameReducer(scenarios)
const [first, second] = scenarios as [(typeof scenarios)[number], (typeof scenarios)[number]]

describe('gameReducer', () => {
  const playing: GameState = { ...initialState(null), phase: 'playing' }

  it('records an answer once and ignores changes of mind', () => {
    const answered = reduce(playing, { type: 'choose', scenarioId: first.id, choiceId: first.choices[0]!.id })
    const again = reduce(answered, { type: 'choose', scenarioId: first.id, choiceId: first.choices[1]!.id })
    expect(again.answers[first.id]).toBe(first.choices[0]!.id)
  })

  it('moves to results after the last scenario', () => {
    const last: GameState = { ...playing, index: scenarios.length - 1 }
    expect(reduce(last, { type: 'next' }).phase).toBe('results')
    expect(reduce(playing, { type: 'next' }).index).toBe(1)
  })

  it('resumes saved progress and clears it on restart', () => {
    const saved = { index: 1, answers: { [first.id]: first.choices[0]!.id } }
    const resumed = reduce(initialState(saved), { type: 'start' })
    expect(resumed).toMatchObject({ phase: 'playing', index: 1 })
    expect(reduce(resumed, { type: 'restart' })).toEqual(initialState(null))
  })

  it('opens results directly when every scenario was already answered', () => {
    const answers = Object.fromEntries(scenarios.map((s) => [s.id, s.choices[0]!.id]))
    const state = reduce(initialState({ index: scenarios.length - 1, answers }), { type: 'start' })
    expect(state.phase).toBe('results')
  })
})

describe('persistence', () => {
  beforeEach(() => window.localStorage.clear())

  it('round-trips a saved game', () => {
    const game = { index: 1, answers: { [first.id]: first.choices[2]!.id } }
    saveGame(game)
    expect(loadGame(scenarios)).toEqual(game)
  })

  it('drops unknown scenarios and choices from a stale save', () => {
    const saved = sanitizeSave(
      { index: 99, answers: { [second.id]: second.choices[0]!.id, ghost: 'x', [first.id]: 'removed-choice' } },
      scenarios,
    )
    expect(saved).toEqual({ index: scenarios.length - 1, answers: { [second.id]: second.choices[0]!.id } })
  })

  it('ignores corrupt data', () => {
    window.localStorage.setItem('wymtpr:save:v1', '{not json')
    expect(loadGame(scenarios)).toBeNull()
    expect(sanitizeSave('nonsense', scenarios)).toBeNull()
    expect(sanitizeSave({ index: 0, answers: {} }, scenarios)).toBeNull()
  })
})
