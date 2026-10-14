'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import DraftBadge from '@/components/DraftBadge'
import NowPlayingLine, { useNowPlaying } from '@/components/room/NowPlaying'
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
  const panel = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  // the desk panel is the only one that shows what Elias is listening to
  const nowPlaying = useNowPlaying(overlay === 'desk')

  useEffect(() => {
    if (!overlay) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlay, close])

  // Move focus into the panel when it opens and hand it back when it closes.
  // Without this a keyboard user opens a dialog and their focus stays behind it
  // on the chip, with no way to reach the links inside.
  useEffect(() => {
    if (!overlay) {
      returnFocus.current?.focus()
      returnFocus.current = null
      return
    }
    returnFocus.current = document.activeElement as HTMLElement | null
    // wait for the visibility transition, or focus lands on a hidden element
    const id = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>('button, a[href]')?.focus()
    }, 60)
    return () => window.clearTimeout(id)
  }, [overlay])

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
          ref={panel}
          role="dialog"
          aria-modal="false"
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

          <NowPlayingLine data={nowPlaying} />

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
