import { useEffect } from 'react'
import type { ScoreReport } from '@/core/types'
import { AboutSection } from '@/features/about/AboutSection'
import { useFocusOnMount } from '@/shared/hooks/useFocusOnMount'
import { useSound } from '@/shared/sound/SoundProvider'
import { Button } from '@/shared/ui/Button'
import { GitMergeIcon, RestartIcon } from '@/shared/ui/icons'
import { buildSummary } from './buildSummary'
import { DecisionTimeline } from './DecisionTimeline'
import { ScoreBreakdown } from './ScoreBreakdown'
import { ShareButton } from './ShareButton'

interface ResultsScreenProps {
  report: ScoreReport
  onRestart: () => void
}

const APP_NAME = 'Would You Merge This PR?'

export function ResultsScreen({ report, onRestart }: ResultsScreenProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>()
  const { play } = useSound()
  const { title, overall, dimensions, decisions } = report

  useEffect(() => {
    play('complete')
  }, [play])

  return (
    <>
      <section className="space-y-14 py-12 sm:py-16">
        <div className="space-y-6">
          <p className="flex items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-solid px-3 py-1 font-medium text-white">
              <GitMergeIcon />
              Merged
            </span>
            Week complete
          </p>

          <div className="space-y-3">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-[clamp(2.25rem,7vw,3.75rem)] leading-[1.05] font-semibold tracking-tight text-balance outline-none"
            >
              {title.name}
            </h1>
            <p className="max-w-[50ch] text-xl text-muted">{title.tagline}</p>
            <p className="font-mono text-sm text-muted">
              Overall score <span className="text-fg">{overall}/100</span>
            </p>
          </div>

          <div className="max-w-[60ch] space-y-3 leading-relaxed">
            {buildSummary(report).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ShareButton
              payload={{
                title: APP_NAME,
                text: `I got "${title.name}" (${overall}/100) on ${APP_NAME}. Would you make better calls?`,
                url: `${window.location.origin}${window.location.pathname}`,
              }}
            />
            <Button onClick={onRestart}>
              <RestartIcon />
              Restart
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">How you scored</h2>
          <ScoreBreakdown scores={dimensions} />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Your decisions</h2>
          <DecisionTimeline decisions={decisions} />
        </div>
      </section>

      <AboutSection />
    </>
  )
}
