'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { experience } from '@/data/experience'
import ProjectsPanel from '@/components/ProjectsPanel'
import { featuredProjects } from '@/data/projects'
import { hotspotById } from '@/data/room'
import { canGoBack, canGoForward, currentPage, type History, type Page } from '../state'

export const PAGE_TITLE: Record<Page, string> = {
  about: 'About — Elias Zarco',
  experience: 'Experience — Elias Zarco',
  projects: 'Projects — Elias Zarco',
}

/** Links on the about page that this browser can open itself, rather than leaving the room. */
const IN_WINDOW: Record<string, Page> = { '/experience': 'experience', '/projects': 'projects' }

const LINK =
  'text-[#a8552a] underline decoration-[#a8552a]/35 underline-offset-[3px] hover:decoration-[#a8552a]'

/**
 * A browser on the written site. The pages are the same data the real pages
 * render, laid out small enough for the screen; moving between them happens
 * inside the window, with history, so back and forward behave.
 */
export default function Browser({
  history,
  onVisit,
  onBack,
  onForward,
}: {
  history: History
  onVisit: (page: Page) => void
  onBack: () => void
  onForward: () => void
}) {
  const page = currentPage(history)
  const scroller = useRef<HTMLDivElement>(null)
  // a reload or a navigation shows a progress bar, so it reads as a page load
  const [loads, setLoads] = useState(0)

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setLoads((n) => n + 1)
  }, [history])

  const path = `/${page}`

  return (
    <div className="flex h-full flex-col">
      {/* address bar */}
      <div className="relative flex flex-none items-center gap-2 border-b border-black/10 bg-[#efeae3] px-3 py-[6px]">
        <NavButton label="Back" glyph="←" disabled={!canGoBack(history)} onClick={onBack} />
        <NavButton label="Forward" glyph="→" disabled={!canGoForward(history)} onClick={onForward} />
        <NavButton label="Reload" glyph="⟳" onClick={() => setLoads((n) => n + 1)} />
        <span className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-[3px] text-[10.5px] text-black/45 ring-1 ring-black/5">
          <span aria-hidden>🔒</span>
          <span className="text-black/70">eliaszarco.com</span>
          <span>{path}</span>
        </span>
        <Link href={path} title="Open in a real tab" className="px-1 text-[12px] text-black/40 hover:text-black/70">
          ↗
        </Link>
        <span
          key={loads}
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] animate-load bg-[#c2703c]"
        />
      </div>

      {/* page */}
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-7 py-4">
        {page === 'about' && <About onVisit={onVisit} />}
        {page === 'experience' && <Experience />}
        {page === 'projects' && <Projects />}
      </div>
    </div>
  )
}

function NavButton({
  label,
  glyph,
  disabled,
  onClick,
}: {
  label: string
  glyph: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-[20px] w-[20px] place-items-center rounded text-[12px] leading-none text-black/55 hover:bg-black/5 disabled:text-black/20 disabled:hover:bg-transparent"
    >
      {glyph}
    </button>
  )
}

function Heading({ title, kicker }: { title: string; kicker: string }) {
  return (
    <>
      <h1 className="text-[21px] font-semibold leading-tight tracking-tight">{title}</h1>
      <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.17em] text-black/45">{kicker}</p>
    </>
  )
}

function About({ onVisit }: { onVisit: (page: Page) => void }) {
  const hotspot = hotspotById('desk')

  return (
    // a column the height of the page, so the links sit on the bottom edge
    <div className="flex min-h-full flex-col">
      <Heading title="Elias Zarco" kicker="AI · Optimization · Systems" />

      <div className="mt-3 flex-1 space-y-3">
        {hotspot?.body.map((paragraph) => (
          <p key={paragraph} className="text-justify text-[13px] leading-[1.7] text-black/72">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-3 flex flex-none flex-wrap gap-x-5 gap-y-1.5 border-t border-black/10 pt-2.5 text-[11px]">
        {hotspot?.links?.map((link) => {
          const inWindow = IN_WINDOW[link.href]
          if (inWindow) {
            return (
              <button key={link.href} type="button" onClick={() => onVisit(inWindow)} className={LINK}>
                {link.label} →
              </button>
            )
          }
          return link.external ? (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className={LINK}>
              {link.label} ↗
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Experience() {
  return (
    <>
      <Heading title="Experience" kicker="Newest first" />
      <ol className="mt-3 divide-y divide-black/10">
        {experience.map((role) => (
          <li key={role.slug} className="flex gap-3 py-2.5">
            {role.logo ? (
              <Image
                src={role.logo}
                alt=""
                width={56}
                height={56}
                className="h-[28px] w-[28px] flex-none rounded-[6px] object-contain ring-1 ring-black/10"
              />
            ) : (
              <span
                className="grid h-[28px] w-[28px] flex-none place-items-center rounded-[6px] text-[9px] font-bold"
                style={{ background: role.mark?.bg ?? '#ddd7cd', color: role.mark?.fg ?? '#1c1a17' }}
              >
                {role.mark?.short ?? role.org.slice(0, 2).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[12.5px] font-semibold">{role.org}</p>
                <p className="flex-none font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">
                  {role.period}
                </p>
              </div>
              <p className="text-[11px] text-black/55">{role.role}</p>
              <p className="mt-1 text-[11.5px] leading-[1.55] text-black/72">{role.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

function Projects() {
  return <ProjectsPanel projects={featuredProjects} className="h-full text-[11px]" />
}
