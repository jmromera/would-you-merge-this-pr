export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'failed'

export interface SharePayload {
  title: string
  text: string
  url: string
}

/** Uses the native share sheet when available and falls back to the clipboard. */
export async function share({ title, text, url }: SharePayload): Promise<ShareOutcome> {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url })
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
      // Any other failure falls through to the clipboard.
    }
  }

  try {
    await navigator.clipboard.writeText(`${text} ${url}`)
    return 'copied'
  } catch {
    return 'failed'
  }
}
