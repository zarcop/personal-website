/**
 * Can this device reasonably run the 3D room?
 *
 * Runs in the browser only — call it from an effect, never during render, or it
 * will disagree with the server and break hydration.
 */
export type Capability = {
  ok: boolean
  /** Why we bailed, for the fallback UI and for debugging. */
  reason?: 'no-webgl' | 'reduced-motion' | 'low-power'
  /** Scene detail to render when ok. */
  quality: 'high' | 'low'
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
  if (typeof window === 'undefined') return { ok: false, quality: 'low' }

  if (!hasWebGL2()) return { ok: false, reason: 'no-webgl', quality: 'low' }

  // honour the OS setting: a camera that flies around is exactly what this asks us not to do
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { ok: false, reason: 'reduced-motion', quality: 'low' }
  }

  // hardwareConcurrency is a weak signal, but it's the only portable one we have.
  // Treat it as a quality hint, not a gate — plenty of capable phones report 4.
  const cores = navigator.hardwareConcurrency ?? 4
  const quality: Capability['quality'] = cores >= 8 ? 'high' : 'low'

  return { ok: true, quality }
}
