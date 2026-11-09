import type { ComponentType, SVGProps } from 'react'
import type { Decision, ReviewState } from '@/core/types'
import { CheckIcon, CommentIcon, XIcon } from '@/shared/ui/icons'

const reviewMeta: Record<ReviewState, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string }> = {
  approved: { label: 'Approved', Icon: CheckIcon, tone: 'text-add border-add/40' },
  commented: { label: 'Commented', Icon: CommentIcon, tone: 'text-muted border-line-strong' },
  'changes-requested': { label: 'Changes requested', Icon: XIcon, tone: 'text-del border-del/40' },
}

/** Each decision as a code-review event, in the order the week happened. */
export function DecisionTimeline({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="relative space-y-8">
      <span className="absolute top-2 bottom-2 left-4 w-px bg-line" aria-hidden="true" />
      {decisions.map(({ scenario, choice, review }) => {
        const { label, Icon, tone } = reviewMeta[review]
        return (
          <li key={scenario.id} className="relative pl-12">
            <span
              className={`absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border bg-canvas ${tone}`}
              aria-hidden="true"
            >
              <Icon />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="font-medium">{scenario.title}</h3>
              <span className={`text-sm ${tone.split(' ')[0]}`}>{label}</span>
            </div>
            <p className="mt-0.5 text-sm text-muted">
              You chose <span className="text-fg">{choice.label}</span>
            </p>
            <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted">{choice.consequence}</p>
          </li>
        )
      })}
    </ol>
  )
}
