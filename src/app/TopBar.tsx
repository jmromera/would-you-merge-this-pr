import { GitMergeIcon, RestartIcon, SoundOffIcon, SoundOnIcon } from '@/shared/ui/icons'
import { IconButton } from '@/shared/ui/Button'
import { useSound } from '@/shared/sound/SoundProvider'

interface TopBarProps {
  onHome: () => void
  /** Restart is only offered once there is progress to throw away. */
  onRestart?: () => void
}

export function TopBar({ onHome, onRestart }: TopBarProps) {
  const { enabled, toggle } = useSound()

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={onHome}
          className="-ml-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-raised"
        >
          <GitMergeIcon className="text-accent" />
          <span>Would You Merge This PR?</span>
        </button>

        <div className="-mr-2 flex items-center gap-1">
          <IconButton label={enabled ? 'Turn sound effects off' : 'Turn sound effects on'} aria-pressed={enabled} onClick={toggle}>
            {enabled ? <SoundOnIcon /> : <SoundOffIcon />}
          </IconButton>
          {onRestart && (
            <IconButton label="Restart" onClick={onRestart}>
              <RestartIcon />
            </IconButton>
          )}
        </div>
      </div>
    </header>
  )
}
