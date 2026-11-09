export const DIMENSIONS = ['technical', 'risk', 'collaboration', 'survival'] as const

export type Dimension = (typeof DIMENSIONS)[number]

/** How much a single choice moves each dimension. Hidden from the player until the end. */
export type Effects = Record<Dimension, number>

export type LineTone = 'plain' | 'add' | 'del' | 'error' | 'warn' | 'muted'

export interface SnippetLine {
  text: string
  tone?: LineTone
}

export interface Snippet {
  filename: string
  caption?: string
  stats?: { additions: number; deletions: number }
  lines: SnippetLine[]
}

export interface Choice {
  id: string
  label: string
  /** One-line hint shown under the label. */
  detail: string
  /** What happens next. Shown right after the choice, without any scoring. */
  consequence: string
  effects: Effects
}

export interface Scenario {
  id: string
  title: string
  when: string
  situation: string[]
  quote?: { from: string; lines: string[] }
  snippet?: Snippet
  choices: Choice[]
}

/** scenario id -> chosen choice id */
export type Answers = Record<string, string>

export interface Title {
  id: string
  name: string
  /** Lowest overall score (0-100) that earns this title. */
  minScore: number
  tagline: string
  description: string
}

export type DimensionScores = Record<Dimension, number>

export type ReviewState = 'approved' | 'commented' | 'changes-requested'

export interface Decision {
  scenario: Scenario
  choice: Choice
  review: ReviewState
}

export interface ScoreReport {
  dimensions: DimensionScores
  overall: number
  title: Title
  decisions: Decision[]
  strongest: Dimension
  weakest: Dimension
}
