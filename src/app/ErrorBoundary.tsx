import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { clearGame } from '@/features/game/persistence'
import { Button } from '@/shared/ui/Button'
import { RestartIcon } from '@/shared/ui/icons'
import { Window } from '@/shared/ui/Window'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/** Shows an in-character incident screen instead of a blank page when rendering crashes. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Simulation crashed', error, info.componentStack)
  }

  private restart = () => {
    // A corrupt save could crash the game again on reload, so start clean.
    clearGame()
    window.location.reload()
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 px-5 py-16 sm:px-8">
        <div className="space-y-3">
          <p className="font-mono text-sm text-muted">500 Internal Server Error</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Production incident</h1>
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted">
            Something broke and this time it wasn't your merge. Restarting the simulation usually fixes it.
          </p>
        </div>
        <Window title="stderr">
          <pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-muted">
            {error.name}: {error.message}
          </pre>
        </Window>
        <div>
          <Button variant="primary" onClick={this.restart}>
            <RestartIcon />
            Restart simulation
          </Button>
        </div>
      </main>
    )
  }
}
