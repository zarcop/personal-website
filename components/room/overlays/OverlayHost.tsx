'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import DraftBadge from '@/components/DraftBadge'
import { hotspotById } from '@/data/room'
import { useRoom } from '@/store/room'

/**
 * Hotspot content as DOM above the canvas, not drei's <Html transform>.
 *
 * Rendering real DOM into 3D space is tempting for the monitor, but text goes
 * soft at an angle, it costs a lot per frame, and it breaks the tab order. A
 * plain overlay keeps the copy crisp, selectable and reachable by keyboard —
 * and it inherits the design tokens the written site already uses.
 */
export default function OverlayHost() {
  const overlay = useRoom((s) => s.overlay)
  const close = useRoom((s) => s.closeOverlay)
  const hotspot = hotspotById(overlay)

  useEffect(() => {
    if (!overlay) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlay, close])

  const open = Boolean(hotspot)

  return (
    <div
      aria-live="polite"
      className={[
        'pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6',
        'transition-all duration-300 ease-out',
        open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0',
      ].join(' ')}
    >
      {hotspot && (
        <div
          role="dialog"
          aria-label={hotspot.label}
          className="pointer-events-auto mx-auto w-full max-w-reading rounded-xl border border-line bg-background/95 p-6 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[1.0625rem] font-semibold leading-snug text-foreground">
                {hotspot.label}
              </h2>
              <p className="mt-1 font-mono text-2xs uppercase tracking-label text-faint">
                {hotspot.kicker}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="-m-2 rounded-md p-2 font-mono text-2xs uppercase tracking-label text-faint transition-colors hover:text-foreground"
            >
              Close
              <span className="sr-only"> (or press Escape)</span>
            </button>
          </div>

          {hotspot.todo && <DraftBadge note={hotspot.todo} />}

          <div className="mt-4 space-y-3">
            {hotspot.body.map((paragraph) => (
              <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          {hotspot.links && hotspot.links.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {hotspot.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-mono text-2xs uppercase tracking-label text-faint transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span aria-hidden className="ml-1.5 inline-block group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group font-mono text-2xs uppercase tracking-label text-faint transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span aria-hidden className="ml-1.5 inline-block group-hover:text-accent">
                      →
                    </span>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
