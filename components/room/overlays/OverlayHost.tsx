'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import DraftBadge from '@/components/DraftBadge'
import NowPlayingLine, { useNowPlaying } from '@/components/room/NowPlaying'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { hotspotById } from '@/data/room'
import { useNarrowViewport } from '@/lib/useNarrow'
import { useRoom } from '@/store/room'

/**
 * Hotspot content as DOM above the canvas, not drei's <Html transform>.
 *
 * Rendering real DOM into 3D space is tempting for the monitor, but text goes
 * soft at an angle, it costs a lot per frame, and it breaks the tab order. A
 * plain overlay keeps the copy crisp, selectable and reachable by keyboard —
 * and it inherits the design tokens the written site already uses.
 *
 * The monitor and the whiteboard are the two exceptions: on a wide viewport
 * they carry their own content on their own surfaces and this skips them. On a
 * portrait one no surface can be made readable, so they come back here.
 */
export default function OverlayHost() {
  const overlay = useRoom((s) => s.overlay)
  const close = useRoom((s) => s.closeOverlay)
  const found = hotspotById(overlay)
  const narrow = useNarrowViewport()
  // on a wide viewport the monitor and the whiteboard carry their own content
  const hotspot = found?.surface && !narrow ? undefined : found
  const panel = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  // the desk panel is the only one that shows what Elias is listening to, and
  // only when it is the panel doing the work — the screen polls for itself
  const nowPlaying = useNowPlaying(narrow && overlay === 'desk')

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
          className="pointer-events-auto mx-auto max-h-[70vh] w-full max-w-reading overflow-y-auto rounded-xl border border-line bg-background/95 p-6 shadow-lg backdrop-blur-md"
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

          {/* the whiteboard's timeline, for viewports that cannot read the board */}
          {hotspot.id === 'whiteboard' && (
            <ol className="mt-4 space-y-4">
              {experience.slice(0, 5).map((role) => (
                <li key={role.slug} className="border-l border-line pl-4">
                  <p className="text-[0.9375rem] font-medium leading-snug text-foreground">
                    {role.org}
                  </p>
                  <p className="mt-0.5 font-mono text-2xs uppercase tracking-label text-faint">
                    {role.role} · {role.period}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">{role.summary}</p>
                </li>
              ))}
            </ol>
          )}

          {hotspot.id === 'projects' && (
            <ol className="mt-4 space-y-4">
              {projects.slice(0, 4).map((project) => (
                <li key={project.slug} className="border-l border-line pl-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[0.9375rem] font-medium leading-snug text-foreground">
                      {project.title}
                    </p>
                    <p className="flex-none font-mono text-2xs uppercase tracking-label text-faint">
                      {project.year ?? '—'}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                    {project.summary}
                  </p>
                </li>
              ))}
            </ol>
          )}

          {hotspot.id === 'desk' && <NowPlayingLine data={nowPlaying} />}

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
