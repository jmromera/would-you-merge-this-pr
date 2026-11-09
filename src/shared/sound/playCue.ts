/** Tiny synthesized cues, so there are no audio assets to ship or license. */
export type SoundCue = 'select' | 'next' | 'complete'

interface Note {
  frequency: number
  delay: number
  duration: number
  volume: number
}

const cues: Record<SoundCue, Note[]> = {
  select: [{ frequency: 523, delay: 0, duration: 0.09, volume: 0.07 }],
  next: [{ frequency: 392, delay: 0, duration: 0.07, volume: 0.05 }],
  complete: [
    { frequency: 523, delay: 0, duration: 0.14, volume: 0.07 },
    { frequency: 659, delay: 0.11, duration: 0.14, volume: 0.07 },
    { frequency: 784, delay: 0.22, duration: 0.28, volume: 0.07 },
  ],
}

let context: AudioContext | undefined

export function playCue(cue: SoundCue): void {
  const AudioContextImpl =
    window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextImpl) return

  context ??= new AudioContextImpl()
  if (context.state === 'suspended') void context.resume()

  const now = context.currentTime
  for (const { frequency, delay, duration, volume } of cues[cue]) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = now + delay

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

    oscillator.connect(gain).connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
  }
}
