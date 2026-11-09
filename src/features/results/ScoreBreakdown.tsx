import { motion } from 'framer-motion'
import { DIMENSIONS } from '@/core/types'
import type { DimensionScores } from '@/core/types'
import { dimensionInfo } from '@/data/dimensions'

export function ScoreBreakdown({ scores }: { scores: DimensionScores }) {
  return (
    <ul className="space-y-6">
      {DIMENSIONS.map((dimension) => {
        const { label, description } = dimensionInfo[dimension]
        return (
          <li key={dimension} className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium">{label}</span>
              <span className="font-mono text-sm tabular-nums">{scores[dimension]}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${scores[dimension]}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <p className="text-sm text-muted">{description}</p>
          </li>
        )
      })}
    </ul>
  )
}
