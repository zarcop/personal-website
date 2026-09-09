'use client'

import Image from 'next/image'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type NarrativeState = {
  isOpen: (id: string) => boolean
  toggle: (id: string) => void
  anyOpened: boolean
}

const NarrativeContext = createContext<NarrativeState | null>(null)

function useNarrative(component: string): NarrativeState {
  const ctx = useContext(NarrativeContext)
  if (!ctx) throw new Error(`<${component}> must be rendered inside <Narrative>`)
  return ctx
}

/**
 * Wraps the intro prose. Keywords inside expand a <Detail> with the matching id.
 * Several can be open at once — reading the bio shouldn't feel like an accordion
 * fighting you.
 */
export function Narrative({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set())
  const [anyOpened, setAnyOpened] = useState(false)

  const toggle = useCallback((id: string) => {
    setAnyOpened(true)
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  const value = useMemo<NarrativeState>(
    () => ({ isOpen: (id) => open.has(id), toggle, anyOpened }),
    [open, toggle, anyOpened],
  )

  return <NarrativeContext.Provider value={value}>{children}</NarrativeContext.Provider>
}

/** An inline word in the prose that reveals the <Detail> sharing its id. */
export function Keyword({ id, children }: { id: string; children: React.ReactNode }) {
  const { isOpen, toggle } = useNarrative('Keyword')
  const open = isOpen(id)

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-expanded={open}
      aria-controls={`detail-${id}`}
      className={[
        'group/kw relative -mx-0.5 rounded-[3px] px-0.5 text-left',
        'font-medium text-foreground transition-colors duration-200',
        'decoration-1 underline-offset-[5px]',
        open
          ? 'bg-accent/10 underline decoration-accent decoration-solid'
          : 'underline decoration-dotted decoration-faint hover:bg-accent/[0.07] hover:decoration-accent',
      ].join(' ')}
    >
      {children}
      <span
        aria-hidden
        className={[
          'ml-1 inline-block font-mono text-[0.75em] font-normal leading-none',
          'transition-colors duration-200',
          open ? 'text-accent' : 'text-faint group-hover/kw:text-accent',
        ].join(' ')}
      >
        {open ? '\u2212' : '+'}
      </span>
    </button>
  )
}

/**
 * The panel a Keyword reveals. Height animates via grid-template-rows 0fr→1fr;
 * `visibility` keeps collapsed content out of the tab order and the a11y tree
 * while still transitioning (CSS keeps it `visible` for the whole animation).
 *
 * Pass `image` to sit a photo alongside the text — it stacks above the copy on
 * narrow screens. Collapsed panels never fetch their image (`loading="lazy"`),
 * so a page full of them still loads on one request.
 */
export function Detail({
  id,
  image,
  children,
}: {
  id: string
  image?: { src: string; alt: string }
  children: React.ReactNode
}) {
  const { isOpen } = useNarrative('Detail')
  const open = isOpen(id)

  return (
    <div
      id={`detail-${id}`}
      className={[
        'grid transition-[grid-template-rows,visibility,opacity] duration-300 ease-out',
        open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0',
      ].join(' ')}
    >
      <div className="overflow-hidden">
        <div className="my-4 border-l border-accent/40 pl-5 text-[0.9375rem] leading-relaxed text-muted">
          {image ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={440}
                height={440}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 11rem"
                className="h-auto w-full flex-none rounded-xl object-cover sm:w-44"
              />
              <div className="min-w-0 space-y-3">{children}</div>
            </div>
          ) : (
            <div className="space-y-3">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

/** One-line nudge that fades out for good once the reader expands anything. */
export function KeywordHint({ children }: { children: React.ReactNode }) {
  const { anyOpened } = useNarrative('KeywordHint')

  return (
    <p
      aria-hidden={anyOpened}
      className={[
        'mt-8 font-mono text-2xs uppercase tracking-label text-faint',
        'transition-opacity duration-500',
        anyOpened ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      {children}
    </p>
  )
}
