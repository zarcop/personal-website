'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DraftBadge from '@/components/DraftBadge'
import ProjectsPanel from '@/components/ProjectsPanel'
import BoardContent from '@/components/room/surfaces/BoardContent'
import { featuredProjects } from '@/data/projects'
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
 * The whiteboard is an exception on a wide viewport, where it carries its own
 * content on its surface; on a portrait one it comes back here. The desk and
 * the bookcase never show here: they open the desktop and the books.
 */
export default function OverlayHost() {
  const overlay = useRoom((s) => s.overlay)
  const close = useRoom((s) => s.closeOverlay)
  const found = hotspotById(overlay)
  const narrow = useNarrowViewport()
  // On a wide viewport the monitor and the whiteboard carry their own content.
  // The bookcase always opens in BookReader, and the desk always runs its
  // desktop: on the monitor, or full-screen in ScreenOverlay when portrait.
  const hotspot =
    (found?.surface && !narrow) || found?.id === 'bookcase' || found?.id === 'desk' ? undefined : found
  const panel = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

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
  // the projects panel and the board carry their own titles, so nothing goes around them but Close
  const panelOnly = hotspot?.id === 'projects' || hotspot?.id === 'whiteboard'

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
          className={[
            'pointer-events-auto mx-auto w-full overflow-y-auto overscroll-contain rounded-xl border border-line bg-background/95 p-6 shadow-lg backdrop-blur-md',
            // the projects panel and the résumé are the content here, not a caption to the object, so they take most of the screen
            hotspot.id === 'projects'
              ? 'max-h-[86dvh] max-w-6xl'
              : hotspot.id === 'resume'
                ? 'max-h-[86dvh] max-w-3xl'
                : 'max-h-[70dvh] max-w-reading',
          ].join(' ')}
        >
          <div className="flex items-start justify-between gap-4">
            {!panelOnly && (
              <div>
                <h2 className="text-[1.0625rem] font-semibold leading-snug text-foreground">
                  {hotspot.label}
                </h2>
                <p className="mt-1 font-mono text-2xs uppercase tracking-label text-faint">
                  {hotspot.kicker}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={close}
              className="-m-2 ml-auto rounded-md p-2 font-mono text-2xs uppercase tracking-label text-faint transition-colors hover:text-foreground"
            >
              Close
              <span className="sr-only"> (or press Escape)</span>
            </button>
          </div>

          {!panelOnly && (
            <>
              {hotspot.todo && <DraftBadge note={hotspot.todo} />}

              <div className="mt-4 space-y-3">
                {hotspot.body.map((paragraph) => (
                  <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* the board itself, for viewports too narrow to read it on the wall */}
          {hotspot.id === 'whiteboard' && (
            <div className="mt-3">
              <BoardContent fit />
            </div>
          )}

          {hotspot.id === 'resume' && (
            <Image
              src="/images/resume/page-1.png"
              alt="Page 1 of Elias Zarco's résumé"
              width={1600}
              height={2070}
              sizes="(max-width: 768px) 100vw, 46rem"
              className="mt-5 h-auto w-full rounded-md bg-white ring-1 ring-line"
            />
          )}

          {hotspot.id === 'projects' && (
            <ProjectsPanel projects={featuredProjects} className="mt-3 text-[0.875rem] sm:text-[0.9375rem]" />
          )}

          {!panelOnly && hotspot.links && hotspot.links.length > 0 && (
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
