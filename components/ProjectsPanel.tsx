'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Project } from '@/lib/types'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * A small console over a list of projects: a numbered index beside the
 * selected one, stepped through with the arrows (wrapping at the ends).
 *
 * Every size is in em, so the caller sets the scale with a font size: the room
 * computer renders it in tiny design pixels, the written site at reading size.
 * The two columns wrap rather than hitting a breakpoint, because the computer's
 * screen is a fixed 900px design space whatever the viewport is. A
 * `#slug` in the URL opens on that project, for links from the about page.
 */
export default function ProjectsPanel({
  projects,
  className = '',
}: {
  projects: Project[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const project = projects[index]
  const extraFigures = project.figures?.slice(1) ?? []

  const wrap = (i: number) => (i + projects.length) % projects.length
  const step = (dir: 1 | -1) => setIndex((i) => wrap(i + dir))

  useEffect(() => {
    const fromHash = projects.findIndex((p) => `#${p.slug}` === window.location.hash)
    if (fromHash >= 0) setIndex(fromHash)
  }, [projects])

  // left and right only: up and down still scroll the page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % projects.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + projects.length) % projects.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [projects.length])

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[0.9em] bg-[#1c1a17] text-[#ece6dc] ring-1 ring-black/25 ${className}`}
    >
      {/*
        The 1px gap over a light background is the divider, whichever way the
        columns wrap. A wrapping row grows to fit its tallest column instead of
        shrinking it, so the scroll lives here rather than on the article.
      */}
      <div className="flex min-h-0 flex-1 flex-wrap gap-px overflow-y-auto bg-white/10">
        <nav className="flex flex-[1_1_16em] flex-col bg-[#1c1a17]">
          <ol className="flex-1 py-[0.5em]">
            {projects.map((item, i) => {
              const active = i === index
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active}
                    className={[
                      'relative flex w-full items-baseline gap-[0.9em] px-[1.3em] py-[0.6em] text-left',
                      active ? 'bg-white/[0.07] text-white' : 'text-white/50 hover:bg-white/[0.03] hover:text-white/80',
                    ].join(' ')}
                  >
                    {active && (
                      <span aria-hidden className="absolute inset-y-[0.35em] left-0 w-[2px] rounded-full bg-[#c2703c]" />
                    )}
                    <span className={['font-mono text-[0.8em]', active ? 'text-[#e39a63]' : 'text-white/30'].join(' ')}>
                      {pad(i + 1)}
                    </span>
                    <span className="font-medium leading-snug">{item.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          <div className="flex flex-none items-center justify-between border-t border-white/10 px-[1.3em] py-[0.7em] font-mono text-[0.8em] text-white/40">
            <button type="button" onClick={() => step(-1)} className="hover:text-white/80">
              ← prev
            </button>
            <span>
              <span className="text-[#e39a63]">{pad(index + 1)}</span> / {pad(projects.length)}
            </span>
            <button type="button" onClick={() => step(1)} className="hover:text-white/80">
              next →
            </button>
          </div>
        </nav>

        {/* detail; keyed so each switch replays the entrance */}
        <article
          key={project.slug}
          className="flex-[999_1_24em] animate-rise bg-[#1c1a17] px-[1.45em] py-[1.25em]"
        >
          <div className="flex flex-wrap gap-[1.45em]">
            {project.figures?.[0] ? (
              <Image
                src={project.figures[0].src}
                alt={project.figures[0].alt}
                width={project.figures[0].width}
                height={project.figures[0].height}
                // without sizes, next/image picks by the width prop and a ~280px thumbnail downloads a 1920px image
                sizes="360px"
                className="h-[10.7em] w-[17.3em] flex-none rounded-[0.5em] object-cover ring-1 ring-white/10"
              />
            ) : (
              <TitleCard slug={project.slug} tech={project.tech} />
            )}
            <div className="min-w-0 flex-[1_1_14em]">
              <div className="flex items-baseline justify-between gap-[1em]">
                <h2 className="text-[1.45em] font-semibold leading-tight tracking-tight">{project.title}</h2>
                <span className="flex-none font-mono text-[0.8em] uppercase tracking-[0.12em] text-white/40">
                  {project.year ?? '—'}
                </span>
              </div>
              <p className="mt-[0.4em] text-[1.05em] leading-[1.5] text-[#e39a63]">{project.summary}</p>
              <p className="mt-[0.6em] text-[0.95em] leading-[1.55] text-white/60">{project.description}</p>
            </div>
          </div>

          {project.highlights && (
            <ul className="mt-[1.1em] space-y-[0.35em] border-t border-white/10 pt-[0.9em]">
              {project.highlights.map((line) => (
                <li key={line} className="flex gap-[0.7em] text-[0.95em] leading-[1.5] text-white/75">
                  <span aria-hidden className="text-[#c2703c]">▸</span>
                  {line}
                </li>
              ))}
            </ul>
          )}

          {extraFigures.map((figure) => (
            <figure key={figure.src} className="mt-[1.1em]">
              <Image
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                sizes="(max-width: 640px) 90vw, 600px"
                // capped, not full width: a portrait photo at full width runs several screens tall
                className="h-auto max-h-[20em] w-auto max-w-full rounded-[0.5em] ring-1 ring-white/10"
              />
              {figure.caption && (
                <figcaption className="mt-[0.5em] text-[0.85em] leading-[1.5] text-white/45">{figure.caption}</figcaption>
              )}
            </figure>
          ))}

          <div className="mt-[1.1em] flex flex-wrap items-center justify-between gap-[0.7em]">
            <p className="flex flex-wrap gap-[0.35em]">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-white/[0.08] px-[0.6em] py-[0.1em] font-mono text-[0.8em] text-white/60"
                >
                  {tech}
                </span>
              ))}
            </p>
            <p className="flex gap-[1.4em] text-[0.95em]">
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e39a63] underline decoration-[#e39a63]/35 underline-offset-[3px] hover:decoration-[#e39a63]"
                >
                  {link.label} ↗
                </a>
              ))}
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

/** Stands in for a screenshot on projects that have none, so the layout never has a hole. */
function TitleCard({ slug, tech }: { slug: string; tech: string[] }) {
  return (
    <div
      aria-hidden
      className="flex h-[10.7em] w-[17.3em] flex-none flex-col justify-between rounded-[0.5em] p-[1.1em] font-mono ring-1 ring-white/10"
      style={{
        backgroundColor: '#24211d',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '1.3em 1.3em',
      }}
    >
      <span className="text-[0.8em] text-white/35">~/projects/</span>
      <span className="break-all text-[1.2em] leading-tight text-[#e39a63]">{slug}</span>
      <span className="text-[0.75em] uppercase tracking-[0.14em] text-white/35">{tech.slice(0, 2).join(' · ')}</span>
    </div>
  )
}
