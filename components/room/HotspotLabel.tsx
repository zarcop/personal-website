'use client'

import { Html } from '@react-three/drei'
import type { Hotspot } from '@/data/room'
import { useRoom } from '@/store/room'

/**
 * The label that hangs over each object.
 *
 * `Html` without `transform` keeps the label in screen space: always facing the
 * viewer, always crisply rendered at device resolution. The alternative — real
 * 3D text lying on the wall — goes soft at an angle and costs a text-rendering
 * dependency for seven short strings.
 *
 * Because it is real DOM, each label is also a real button: keyboard reachable
 * and announced properly, which is what the chip bar used to provide.
 */
export default function HotspotLabel({ hotspot }: { hotspot: Hotspot }) {
  const focus = useRoom((s) => s.focus)
  const focusHotspot = useRoom((s) => s.focusHotspot)
  const close = useRoom((s) => s.closeOverlay)
  const reducedMotion = useRoom((s) => s.reducedMotion)

  const active = focus === hotspot.id
  // once something is selected, the other labels step back so the chosen object
  // is not competing with six bits of floating text
  const dimmed = focus !== null && !active

  return (
    <Html
      position={hotspot.anchor}
      center
      zIndexRange={[18, 10]}
      // labels must not block the objects underneath them
      style={{ pointerEvents: 'none' }}
    >
      <button
        type="button"
        aria-pressed={active}
        onClick={() => (active ? close() : focusHotspot(hotspot.id))}
        style={{ pointerEvents: 'auto' }}
        className={[
          'group whitespace-nowrap rounded-full border px-3 py-1.5',
          'font-mono text-2xs uppercase tracking-label backdrop-blur-sm',
          reducedMotion ? '' : 'transition-all duration-300',
          active
            ? 'border-accent/60 bg-accent/12 text-accent opacity-100'
            : dimmed
              ? 'border-line/50 bg-background/40 text-faint opacity-35 hover:opacity-100'
              : 'border-line/70 bg-background/70 text-muted opacity-90 hover:border-accent/50 hover:bg-background/90 hover:text-foreground',
        ].join(' ')}
      >
        {hotspot.label}
        <span className="sr-only"> — {hotspot.object}</span>
      </button>

      {/* a hairline tying the label to the thing it names */}
      <span
        aria-hidden
        className={[
          'absolute left-1/2 top-full h-3 w-px -translate-x-1/2',
          reducedMotion ? '' : 'transition-opacity duration-300',
          active ? 'bg-accent/50' : dimmed ? 'bg-line/40' : 'bg-line/70',
        ].join(' ')}
      />
    </Html>
  )
}
