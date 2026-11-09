import { dimensionInfo } from '@/data/dimensions'
import type { ScoreReport } from '@/core/types'

/** A short, personalised read-out built from the player's strongest and weakest dimensions. */
export function buildSummary({ title, dimensions, strongest, weakest, decisions }: ScoreReport): string[] {
  const spread = dimensions[strongest] - dimensions[weakest]
  const approved = decisions.filter(({ review }) => review === 'approved').length
  const toRevisit = decisions.find(({ review }) => review === 'changes-requested')

  const paragraphs = [
    title.description,
    dimensionInfo[strongest].strength,
    spread >= 15
      ? dimensionInfo[weakest].gap
      : 'Your scores are evenly balanced across the board, which is rarer than it sounds.',
  ]

  const tally = `${approved} of ${decisions.length} decisions would have been approved in review.`
  paragraphs.push(
    toRevisit
      ? `${tally} The one to revisit: "${toRevisit.choice.label}" in "${toRevisit.scenario.title}".`
      : `${tally} No changes requested.`,
  )
  return paragraphs
}
