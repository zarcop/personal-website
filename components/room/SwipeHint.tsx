'use client'

import { useNarrowViewport } from '@/lib/useNarrow'
import { useRoom } from '@/store/room'

/**
 * Portrait screens only see the desk at rest, and nothing about that frame says
 * the bookcase and the window are a swipe away. Shown on the idle view until the
 * first swipe, then gone for good.
 */
export default function SwipeHint() {
  const narrow = useNarrowViewport()
  const ready = useRoom((s) => s.ready)
  const focus = useRoom((s) => s.focus)
  const panned = useRoom((s) => s.panned)
  const reducedMotion = useRoom((s) => s.reducedMotion)

  const visible = narrow && ready && !focus && !panned

  return (
    <p
      aria-hidden
      className={[
        'pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center',
        'font-mono text-2xs uppercase tracking-label text-muted',
        reducedMotion ? '' : 'transition-opacity duration-700',
        visible ? 'opacity-80' : 'opacity-0',
      ].join(' ')}
    >
      ← Swipe to look around →
    </p>
  )
}
