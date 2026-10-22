'use client'

import { useRoom } from '@/store/room'

/**
 * The way out.
 *
 * Zoomed into an object, every other label projects off-screen, so without this
 * the only exit is the Escape key — which nobody discovers. Appears only while
 * something is focused, so the wall view stays clean.
 */
export default function BackToRoom() {
  const focus = useRoom((s) => s.focus)
  const close = useRoom((s) => s.closeOverlay)
  const reducedMotion = useRoom((s) => s.reducedMotion)

  return (
    <div
      className={[
        'pointer-events-none absolute left-0 top-0 z-30 p-4 sm:p-6',
        reducedMotion ? '' : 'transition-all duration-300',
        focus ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={close}
        className="pointer-events-auto rounded-full border border-line bg-background/85 px-3.5 py-2 font-mono text-2xs uppercase tracking-label text-muted backdrop-blur transition-colors hover:border-accent/50 hover:text-foreground"
      >
        <span aria-hidden className="mr-1.5">←</span>
        Back to the room
        <span className="sr-only"> (or press Escape)</span>
      </button>
    </div>
  )
}
