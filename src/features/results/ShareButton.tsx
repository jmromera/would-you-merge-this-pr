import { useEffect, useState } from 'react'
import { share } from '@/core/share'
import type { ShareOutcome, SharePayload } from '@/core/share'
import { Button } from '@/shared/ui/Button'
import { ShareIcon } from '@/shared/ui/icons'

const FEEDBACK_MS = 2500

const feedback: Partial<Record<ShareOutcome, string>> = {
  shared: 'Shared',
  copied: 'Copied to clipboard',
  failed: 'Could not share. Copy the address from the browser instead.',
}

export function ShareButton({ payload }: { payload: SharePayload }) {
  const [outcome, setOutcome] = useState<ShareOutcome | null>(null)

  useEffect(() => {
    if (!outcome) return
    const timer = window.setTimeout(() => setOutcome(null), FEEDBACK_MS)
    return () => window.clearTimeout(timer)
  }, [outcome])

  const message = outcome && feedback[outcome]

  return (
    <>
      <Button variant="primary" onClick={async () => setOutcome(await share(payload))}>
        <ShareIcon />
        Share result
      </Button>
      <span role="status" className="text-sm text-muted">
        {message}
      </span>
    </>
  )
}
