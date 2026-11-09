import { motion } from 'framer-motion'
import type { Choice } from '@/core/types'
import { Button } from '@/shared/ui/Button'
import { ArrowRightIcon } from '@/shared/ui/icons'

interface ConsequenceProps {
  choice: Choice
  isLast: boolean
  onNext: () => void
}

export function Consequence({ choice, isLast, onNext }: ConsequenceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-6 space-y-5 border-l-2 border-accent pl-5"
    >
      <div className="space-y-1.5">
        <p className="text-sm text-muted">
          You chose <span className="text-fg">{choice.label}</span>
        </p>
        <p className="max-w-[60ch] text-base leading-relaxed">{choice.consequence}</p>
      </div>
      <Button variant="primary" autoFocus onClick={onNext}>
        {isLast ? 'View Results' : 'Next scenario'}
        <ArrowRightIcon />
      </Button>
    </motion.div>
  )
}
