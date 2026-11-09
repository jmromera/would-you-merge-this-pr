import type { Dimension } from '@/core/types'

interface DimensionInfo {
  label: string
  description: string
  /** Said about the player when this is their best dimension. */
  strength: string
  /** Said about the player when this is their weakest dimension. */
  gap: string
}

export const dimensionInfo: Record<Dimension, DimensionInfo> = {
  technical: {
    label: 'Technical Judgment',
    description: 'Reading the code, finding the cause, picking the boring solution.',
    strength: 'You look before you leap. Your instinct is to understand the problem before touching it.',
    gap: 'You sometimes reach for the fast fix before the real cause. Read the diff, read the logs, then act.',
  },
  risk: {
    label: 'Risk Management',
    description: 'Knowing what can go wrong and keeping the blast radius small.',
    strength: 'You keep the blast radius small. Rollbacks, tests and scope cuts are your default tools.',
    gap: 'You tend to accept risk you could have avoided. Future you is already writing the postmortem.',
  },
  collaboration: {
    label: 'Team Collaboration',
    description: 'Using reviews, conversations and honest scope talks to move together.',
    strength: 'You pull people in at the right moments. Reviews and honest scope talks make your work safer.',
    gap: 'You carry too much alone. A second reviewer or a five-minute conversation would have saved you hours.',
  },
  survival: {
    label: 'Production Survival',
    description: 'Keeping customers happy and the pager quiet.',
    strength: 'Production stays up when you are around. You stop the bleeding first and explain it later.',
    gap: 'Production pays for some of your decisions. Mitigate first, investigate second.',
  },
}
