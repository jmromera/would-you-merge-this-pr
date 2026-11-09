import type { Title } from '@/core/types'

/** Ordered from lowest to highest `minScore`. */
export const titles: Title[] = [
  {
    id: 'junior-survivor',
    name: 'Junior Survivor',
    minScore: 0,
    tagline: 'You are still here. That counts.',
    description:
      'The week was rough, but nothing was permanently deleted. Probably. Every senior engineer has a week like this in their history, usually with a funnier story attached.',
  },
  {
    id: 'backend-adventurer',
    name: 'Backend Adventurer',
    minScore: 25,
    tagline: 'Brave, curious, and one incident away from a great story.',
    description:
      'You make bold calls and learn fast. A few of them could have been safer, but you will remember each one forever, which is how instincts get built.',
  },
  {
    id: 'battle-tested-developer',
    name: 'Battle-Tested Developer',
    minScore: 45,
    tagline: 'You have been paged before. It shows.',
    description:
      'You make solid calls most of the time and recover well from the rest. Teams like having you around when things get weird.',
  },
  {
    id: 'production-firefighter',
    name: 'Production Firefighter',
    minScore: 62,
    tagline: 'Calm under fire, mostly because you have seen worse.',
    description:
      'When the dashboard turns red you are the person who knows what to do next. You contain first and investigate second, which is exactly the right order.',
  },
  {
    id: 'backend-wizard',
    name: 'Backend Wizard',
    minScore: 78,
    tagline: 'Your instincts are suspiciously good.',
    description:
      'You read the diff, protect production, and still keep the team moving. People assume you are lucky. You are not.',
  },
  {
    id: 'legendary-staff-engineer',
    name: 'Legendary Staff Engineer',
    minScore: 92,
    tagline: 'You would have blocked the PR, written the runbook and mentored the author.',
    description:
      'Technical depth, careful risk management and a team that trusts you. The kind of engineer whose name appears in other people\'s postmortems as "thankfully, they caught it."',
  },
]
