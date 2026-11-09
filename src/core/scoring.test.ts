import { describe, expect, it } from 'vitest'
import { scenarios } from '@/data/scenarios'
import { titles } from '@/data/titles'
import { DIMENSIONS } from './types'
import type { Answers } from './types'
import { buildReport, isComplete, titleFor } from './scoring'

/** Picks the choice at `rank` after sorting each scenario's options by their total effect. */
function answersBy(pick: (sortedIds: string[]) => string): Answers {
  return Object.fromEntries(
    scenarios.map((scenario) => {
      const sorted = [...scenario.choices]
        .sort(
          (a, b) =>
            DIMENSIONS.reduce((sum, d) => sum + a.effects[d], 0) - DIMENSIONS.reduce((sum, d) => sum + b.effects[d], 0),
        )
        .map(({ id }) => id)
      return [scenario.id, pick(sorted)]
    }),
  )
}

describe('scenario data', () => {
  it('has 3 or 4 uniquely identified choices per scenario', () => {
    for (const { choices } of scenarios) {
      expect(choices.length).toBeGreaterThanOrEqual(3)
      expect(choices.length).toBeLessThanOrEqual(4)
      expect(new Set(choices.map(({ id }) => id)).size).toBe(choices.length)
    }
    expect(new Set(scenarios.map(({ id }) => id)).size).toBe(scenarios.length)
  })

  it('lists titles in ascending score order starting at zero', () => {
    expect(titles[0]?.minScore).toBe(0)
    expect(titles.map(({ minScore }) => minScore)).toEqual([...titles.map(({ minScore }) => minScore)].sort((a, b) => a - b))
  })
})

describe('buildReport', () => {
  it('gives the strongest answers a near-perfect score and the top title', () => {
    const report = buildReport(scenarios, answersBy((sorted) => sorted[sorted.length - 1]!), titles)
    expect(report.overall).toBeGreaterThanOrEqual(92)
    expect(report.title.name).toBe('Legendary Staff Engineer')
  })

  it('gives the weakest answers a near-zero score and the first title', () => {
    const report = buildReport(scenarios, answersBy((sorted) => sorted[0]!), titles)
    expect(report.overall).toBeLessThanOrEqual(5)
    expect(report.title.name).toBe('Junior Survivor')
  })

  it('keeps every dimension within 0-100', () => {
    const report = buildReport(scenarios, answersBy((sorted) => sorted[1]!), titles)
    for (const dimension of DIMENSIONS) {
      expect(report.dimensions[dimension]).toBeGreaterThanOrEqual(0)
      expect(report.dimensions[dimension]).toBeLessThanOrEqual(100)
    }
  })

  it('can award every title', () => {
    const awarded = new Set<string>()
    const total = scenarios.reduce((count, { choices }) => count * choices.length, 1)
    for (let combo = 0; combo < total; combo++) {
      let rest = combo
      const answers: Answers = {}
      for (const { id, choices } of scenarios) {
        answers[id] = choices[rest % choices.length]!.id
        rest = Math.floor(rest / choices.length)
      }
      awarded.add(buildReport(scenarios, answers, titles).title.id)
    }
    expect([...awarded].sort()).toEqual(titles.map(({ id }) => id).sort())
  })

  it('flags the best option of a scenario as approved and the worst as changes requested', () => {
    const best = buildReport(scenarios, answersBy((sorted) => sorted[sorted.length - 1]!), titles)
    const worst = buildReport(scenarios, answersBy((sorted) => sorted[0]!), titles)
    expect(best.decisions.every(({ review }) => review === 'approved')).toBe(true)
    expect(worst.decisions.every(({ review }) => review === 'changes-requested')).toBe(true)
  })
})

describe('isComplete', () => {
  it('requires a valid answer for every scenario', () => {
    const answers = answersBy((sorted) => sorted[0]!)
    expect(isComplete(scenarios, answers)).toBe(true)
    expect(isComplete(scenarios, { ...answers, [scenarios[0]!.id]: 'nope' })).toBe(false)
    expect(isComplete(scenarios, {})).toBe(false)
  })
})

describe('titleFor', () => {
  it('picks the highest title whose threshold has been reached', () => {
    expect(titleFor(24, titles).name).toBe('Junior Survivor')
    expect(titleFor(25, titles).name).toBe('Backend Adventurer')
    expect(titleFor(100, titles).name).toBe('Legendary Staff Engineer')
  })
})
