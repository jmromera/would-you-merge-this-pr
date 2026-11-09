import { DIMENSIONS } from './types'
import type {
  Answers,
  Choice,
  Decision,
  Dimension,
  DimensionScores,
  ReviewState,
  Scenario,
  ScoreReport,
  Title,
} from './types'

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

const totalEffect = (choice: Choice) => sum(DIMENSIONS.map((dimension) => choice.effects[dimension]))

const toPercent = (value: number, min: number, max: number) =>
  max === min ? 100 : Math.round(((value - min) / (max - min)) * 100)

export function findChoice(scenario: Scenario, answers: Answers): Choice | undefined {
  return scenario.choices.find((choice) => choice.id === answers[scenario.id])
}

export function isComplete(scenarios: Scenario[], answers: Answers): boolean {
  return scenarios.every((scenario) => findChoice(scenario, answers))
}

/** Where a choice sits between the worst and best option of its own scenario. */
function reviewStateFor(choice: Choice, scenario: Scenario): ReviewState {
  const totals = scenario.choices.map(totalEffect)
  const position = toPercent(totalEffect(choice), Math.min(...totals), Math.max(...totals))
  if (position >= 75) return 'approved'
  if (position >= 40) return 'commented'
  return 'changes-requested'
}

function scoreDimension(dimension: Dimension, decisions: Decision[]): number {
  const bound = (pick: (...values: number[]) => number) =>
    sum(decisions.map(({ scenario }) => pick(...scenario.choices.map(({ effects }) => effects[dimension]))))
  const value = sum(decisions.map(({ choice }) => choice.effects[dimension]))
  return toPercent(value, bound(Math.min), bound(Math.max))
}

export function titleFor(overall: number, titles: Title[]): Title {
  const earned = titles.filter((title) => overall >= title.minScore)
  return earned[earned.length - 1] ?? titles[0]!
}

/** Scores the answered scenarios, each dimension normalised to 0-100 against its possible range. */
export function buildReport(scenarios: Scenario[], answers: Answers, titles: Title[]): ScoreReport {
  const decisions = scenarios.flatMap<Decision>((scenario) => {
    const choice = findChoice(scenario, answers)
    return choice ? [{ scenario, choice, review: reviewStateFor(choice, scenario) }] : []
  })

  const dimensions = Object.fromEntries(
    DIMENSIONS.map((dimension) => [dimension, scoreDimension(dimension, decisions)]),
  ) as DimensionScores

  const overall = Math.round(sum(DIMENSIONS.map((dimension) => dimensions[dimension])) / DIMENSIONS.length)
  const ranked = [...DIMENSIONS].sort((a, b) => dimensions[b] - dimensions[a])

  return {
    dimensions,
    overall,
    title: titleFor(overall, titles),
    decisions,
    strongest: ranked[0]!,
    weakest: ranked[ranked.length - 1]!,
  }
}
