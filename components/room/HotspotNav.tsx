'use client'

import { hotspots } from '@/data/room'
import { useRoom } from '@/store/room'

/**
 * A canvas is not keyboard navigable and a screen reader sees nothing inside it.
 * This strip is the accessible route to every hotspot — and it doubles as the
 * affordance that tells visitors the room is clickable at all, which a bare 3D
 * scene never communicates on its own.
 */
export default function HotspotNav() {
  const focus = useRoom((s) => s.focus)
  const focusHotspot = useRoom((s) => s.focusHotspot)
  const close = useRoom((s) => s.closeOverlay)

  return (
    <nav
      aria-label="Things in the room"
      className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4 sm:p-6"
    >
      <ul className="pointer-events-auto mx-auto flex max-w-reading flex-wrap items-center gap-2">
        {hotspots.map((hotspot) => {
          const active = focus === hotspot.id
          return (
            <li key={hotspot.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => (active ? close() : focusHotspot(hotspot.id))}
                className={[
                  'rounded-full border px-3 py-1.5 font-mono text-2xs uppercase tracking-label',
                  'transition-colors duration-200',
                  active
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-line bg-background/80 text-faint backdrop-blur hover:text-foreground',
                ].join(' ')}
              >
                {hotspot.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
