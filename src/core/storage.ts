/** Thin localStorage wrapper. Storage can be unavailable (private mode, quota), so it never throws. */
export function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Progress simply will not persist.
  }
}

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Nothing to clean up.
  }
}
