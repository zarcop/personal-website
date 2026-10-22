/**
 * Can this device reasonably run the 3D room?
 *
 * Runs in the browser only — call it from an effect, never during render, or it
 * will disagree with the server and break hydration.
 */
export type Capability = {
  ok: boolean
  /** Why we bailed, for the fallback UI and for debugging. */
  reason?: 'no-webgl' | 'low-power'
  /** Scene detail to render when ok. */
  quality: 'high' | 'low'
  /**
   * Viewer asked for less movement. Not a reason to withhold the room — only a
   * reason to stop moving the camera. Bouncing these people to the text site
   * excluded them from the whole thing over an animation preference.
   */
  reducedMotion: boolean
}

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2'))
  } catch {
    // some privacy modes throw rather than return null
    return false
  }
}

export function detectCapability(): Capability {
  if (typeof window === 'undefined') return { ok: false, quality: 'low', reducedMotion: false }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hasWebGL2()) return { ok: false, reason: 'no-webgl', quality: 'low', reducedMotion }

  // hardwareConcurrency is a weak signal, but it's the only portable one we have.
  // Treat it as a quality hint, not a gate — plenty of capable phones report 4.
  const cores = navigator.hardwareConcurrency ?? 4
  const quality: Capability['quality'] = cores >= 8 ? 'high' : 'low'

  return { ok: true, quality, reducedMotion }
}
