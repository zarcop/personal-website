'use client'

import Image from 'next/image'
import { EB_Garamond, IM_Fell_English } from 'next/font/google'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DraftBadge from '@/components/DraftBadge'
import { books, type Book, type BookPage } from '@/data/books'
import { useNarrowViewport } from '@/lib/useNarrow'
import { useRoom } from '@/store/room'
import { pageNumber, toSpreads, type Spread } from './spreads'

const body = EB_Garamond({ subsets: ['latin'], display: 'swap', style: ['normal', 'italic'] })
const display = IM_Fell_English({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-fell',
})

const PAPER = '#f3ead6'
const INK = '#2b241c'
const FLIP_MS = 700

type Turn = { dir: 'next' | 'prev'; to: number }

/**
 * The bookcase opens as a real book: an open spread with a cloth cover behind
 * it, pages that turn, and type set like print. Four books, picked from the
 * ribbons along the top.
 *
 * Sizes are in container-query units (cqw) of the book itself, so the type
 * scales with the book instead of with the viewport and every page keeps the
 * same layout at any size.
 *
 * A page turn is one leaf rotating about the spine. While it turns, the side
 * it is uncovering already shows the destination spread, so when the leaf
 * lands nothing jumps.
 */
export default function BookReader() {
  const overlay = useRoom((s) => s.overlay)
  const reducedMotion = useRoom((s) => s.reducedMotion)
  const narrow = useNarrowViewport()
  const open = overlay === 'bookcase'

  const [bookId, setBookId] = useState(books[0].id)
  const [spread, setSpread] = useState(0)
  const [page, setPage] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)

  const book = books.find((b) => b.id === bookId) ?? books[0]
  const spreads = useMemo(() => toSpreads(book.pages), [book])

  const choose = (id: string) => {
    setBookId(id)
    setSpread(0)
    setPage(0)
    setTurn(null)
  }

  const go = useCallback(
    (dir: Turn['dir']) => {
      if (narrow) {
        setPage((p) => Math.min(Math.max(p + (dir === 'next' ? 1 : -1), 0), book.pages.length - 1))
        return
      }
      if (turn) return
      const to = spread + (dir === 'next' ? 1 : -1)
      if (to < 0 || to >= spreads.length) return
      if (reducedMotion) setSpread(to)
      else setTurn({ dir, to })
    },
    [narrow, turn, spread, spreads.length, reducedMotion, book.pages.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go('next')
      if (e.key === 'ArrowLeft') go('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  // A timer, not animationend, lands the turn: the event never fires if the tab
  // is backgrounded mid-turn, and the book would be stuck between spreads.
  useEffect(() => {
    if (!turn) return
    const id = setTimeout(() => {
      setSpread(turn.to)
      setTurn(null)
    }, FLIP_MS)
    return () => clearTimeout(id)
  }, [turn])

  const atStart = narrow ? page === 0 : spread === 0
  const atEnd = narrow ? page === book.pages.length - 1 : spread === spreads.length - 1

  return (
    <div
      className={[
        display.variable,
        'absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#120d09]/60 px-4 pb-6 pt-16 backdrop-blur-[3px]',
        'transition-opacity duration-300',
        open ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
      ].join(' ')}
    >
      {open && (
        <>
          <Ribbons current={book.id} onChoose={choose} />

          <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
            <TurnButton dir="prev" disabled={atStart} onClick={() => go('prev')} />

            {narrow ? (
              <SinglePage book={book} index={page} />
            ) : (
              <OpenBook
                book={book}
                spreads={spreads}
                spread={spread}
                turn={turn}
                onTurn={go}
              />
            )}

            <TurnButton dir="next" disabled={atEnd} onClick={() => go('next')} />
          </div>

          <p className={`${display.className} text-[13px] italic text-[#e9dcc0]/70`}>
            {narrow ? `Page ${page + 1} of ${book.pages.length}` : spreadLabel(spreads[spread], spread, book.pages.length)}
            <span className="hidden sm:inline"> · use ← → to turn</span>
          </p>

          {book.todo && <DraftBadge note={book.todo} />}
        </>
      )}
    </div>
  )
}

/** "Pages 2–3 of 10", or "Page 1 of 10" when one side of the spread is blank. */
function spreadLabel([left, right]: Spread<BookPage>, spread: number, total: number) {
  const sides = [left && pageNumber(spread, 'left'), right && pageNumber(spread, 'right')].filter(Boolean)
  return sides.length === 2 ? `Pages ${sides[0]}–${sides[1]} of ${total}` : `Page ${sides[0]} of ${total}`
}

function Ribbons({ current, onChoose }: { current: string; onChoose: (id: string) => void }) {
  return (
    <div role="tablist" aria-label="Books" className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
      {books.map((b) => {
        const active = b.id === current
        return (
          <button
            key={b.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChoose(b.id)}
            className={[
              display.className,
              'rounded-t-md px-3 pb-1.5 pt-2 text-[13px] tracking-wide text-[#f3ead6] shadow-md transition-transform sm:px-4 sm:text-[15px]',
              active ? '-translate-y-1 ring-1 ring-[#d9b46a]/70' : 'opacity-75 hover:-translate-y-0.5 hover:opacity-100',
            ].join(' ')}
            style={{ background: b.cloth }}
          >
            {b.spine}
          </button>
        )
      })}
    </div>
  )
}

function TurnButton({ dir, disabled, onClick }: { dir: 'next' | 'prev'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 'next' ? 'Next page' : 'Previous page'}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#f3ead6]/10 text-[20px] text-[#f3ead6] ring-1 ring-[#f3ead6]/20 transition hover:bg-[#f3ead6]/20 disabled:opacity-20"
    >
      {dir === 'next' ? '›' : '‹'}
    </button>
  )
}

function OpenBook({
  book,
  spreads,
  spread,
  turn,
  onTurn,
}: {
  book: Book
  spreads: Spread<BookPage>[]
  spread: number
  turn: Turn | null
  onTurn: (dir: Turn['dir']) => void
}) {
  const [left, right] = spreads[spread]
  const dest = turn ? spreads[turn.to] : null
  // during a turn the uncovered side already shows where we are going
  const shownLeft = turn?.dir === 'prev' && dest ? dest[0] : left
  const shownRight = turn?.dir === 'next' && dest ? dest[1] : right

  const destSpread = turn?.to ?? spread

  return (
    // the cover boards: a little larger than the pages, in the book's cloth
    <div
      className="relative rounded-[6px] p-[0.9%] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
      style={{
        background: book.cloth,
        width: 'min(84vw, 1060px, calc((100dvh - 210px) * 1.48))',
      }}
    >
      <div className="relative flex aspect-[1.48] w-full [container-type:inline-size] [perspective:2400px]">
        <Side side="left" onClick={() => onTurn('prev')}>
          <PageFace page={shownLeft} book={book} number={pageNumber(turn?.dir === 'prev' ? destSpread : spread, 'left')} side="left" />
        </Side>
        <Side side="right" onClick={() => onTurn('next')}>
          <PageFace page={shownRight} book={book} number={pageNumber(turn?.dir === 'next' ? destSpread : spread, 'right')} side="right" />
        </Side>

        {/* the gutter: where the pages curve into the binding */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[6%] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(60,40,20,0.22) 42%, rgba(30,20,10,0.38) 50%, rgba(60,40,20,0.22) 58%, rgba(0,0,0,0) 100%)',
          }}
        />

        {turn && dest && (
          <div
            className="absolute inset-y-0 w-1/2 [transform-style:preserve-3d]"
            style={{
              left: turn.dir === 'next' ? '50%' : '0%',
              transformOrigin: turn.dir === 'next' ? 'left center' : 'right center',
              animation: `${turn.dir === 'next' ? 'leaf-next' : 'leaf-prev'} ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.3, 1) forwards`,
            }}
          >
            {/* front: the page being lifted */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <PageFace
                page={turn.dir === 'next' ? right : left}
                book={book}
                number={pageNumber(spread, turn.dir === 'next' ? 'right' : 'left')}
                side={turn.dir === 'next' ? 'right' : 'left'}
              />
            </div>
            {/* back: the page it reveals once it lands on the other side */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <PageFace
                page={turn.dir === 'next' ? dest[0] : dest[1]}
                book={book}
                number={pageNumber(turn.to, turn.dir === 'next' ? 'left' : 'right')}
                side={turn.dir === 'next' ? 'left' : 'right'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/** A clickable half of the spread: clicking a page turns it, like reaching for its corner. */
function Side({ side, onClick, children }: { side: 'left' | 'right'; onClick: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClick}
      className={['relative h-full w-1/2', side === 'left' ? 'cursor-w-resize' : 'cursor-e-resize'].join(' ')}
    >
      {children}
    </div>
  )
}

function SinglePage({ book, index }: { book: Book; index: number }) {
  return (
    <div
      className="relative rounded-[5px] p-[1.6%] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      style={{ background: book.cloth, width: 'min(80vw, 440px)' }}
    >
      {/* on a phone the type stays readable and the page scrolls instead */}
      <div className="w-full [container-type:inline-size]" style={{ height: 'calc(100dvh - 300px)' }}>
        <PageFace page={book.pages[index]} book={book} number={index + 1} side="right" single />
      </div>
    </div>
  )
}

/**
 * One side of paper. In a spread, sizes are in cqw of the whole book (so a
 * page is 50cqw wide); a single page on a phone doubles them, since there the
 * container is the page itself.
 */
function PageFace({
  page,
  book,
  number,
  side,
  single,
}: {
  page: BookPage | null
  book: Book
  number: number
  side: 'left' | 'right'
  single?: boolean
}) {
  const k = single ? 2.9 : 1
  const u = (n: number) => `${n * k}cqw`
  const shade =
    side === 'left'
      ? 'linear-gradient(90deg, rgba(120,90,50,0.05), rgba(120,90,50,0) 30%, rgba(90,60,30,0.12))'
      : 'linear-gradient(270deg, rgba(120,90,50,0.05), rgba(120,90,50,0) 30%, rgba(90,60,30,0.12))'

  return (
    <div
      className={`${body.className} relative flex h-full w-full flex-col overflow-hidden`}
      style={{
        background: `${single ? '' : `${shade}, `}radial-gradient(120% 90% at 50% 40%, rgba(255,250,235,0.6), rgba(255,250,235,0) 70%), ${PAPER}`,
        color: INK,
        padding: `${u(3.6)} ${u(4.2)} ${u(2.6)}`,
        borderRadius: single ? 3 : side === 'left' ? '3px 0 0 3px' : '0 3px 3px 0',
      }}
    >
      {page === null ? (
        // the inside of the cover, or the back of the last page: endpaper
        <div
          aria-hidden
          className="-m-[1px] flex-1 rounded-sm"
          style={{
            background: `repeating-linear-gradient(45deg, ${book.cloth}22 0 1px, transparent 1px 9px), ${PAPER}`,
          }}
        />
      ) : (
        <>
          {/* print convention: no running head on a page that opens a section */}
          {page.kind !== 'title' && !('heading' in page && page.heading) && (
            <p
              className={`${display.className} text-center uppercase tracking-[0.2em] text-[#7a6a52]`}
              style={{ fontSize: u(0.95) }}
            >
              {book.spine}
            </p>
          )}

          <div className={['flex min-h-0 flex-1 flex-col', single ? 'overflow-y-auto' : 'justify-center'].join(' ')}>
            {page.kind === 'title' && <TitlePage page={page} book={book} u={u} />}
            {page.kind === 'text' && <TextPage page={page} book={book} u={u} />}
            {page.kind === 'figure' && <FigurePage page={page} u={u} />}
          </div>

          <p className={`${display.className} text-center text-[#7a6a52]`} style={{ fontSize: u(1.05) }}>
            {number}
          </p>
        </>
      )}
    </div>
  )
}

type Unit = (n: number) => string

function TitlePage({ page, book, u }: { page: Extract<BookPage, { kind: 'title' }>; book: Book; u: Unit }) {
  return (
    <div className="text-center">
      <p className={display.className} style={{ fontSize: u(1.1), color: book.cloth, letterSpacing: '0.3em' }}>
        ❦
      </p>
      <h2 className={`${display.className} leading-[1.05]`} style={{ fontSize: u(4.6), marginTop: u(1.2) }}>
        {page.title}
      </h2>
      <p className="italic text-[#5c4f3d]" style={{ fontSize: u(1.75), marginTop: u(1) }}>
        {page.subtitle}
      </p>
      <div className="mx-auto" style={{ width: u(8), height: 1, background: '#b6a07a', margin: `${u(2.4)} auto` }} />
      <blockquote className="mx-auto italic" style={{ fontSize: u(1.55), maxWidth: u(30), lineHeight: 1.45 }}>
        “{page.epigraph.text}”
      </blockquote>
      <p
        className={`${display.className} uppercase tracking-[0.18em] text-[#7a6a52]`}
        style={{ fontSize: u(0.95), marginTop: u(1) }}
      >
        {page.epigraph.source}
      </p>
    </div>
  )
}

function TextPage({ page, book, u }: { page: Extract<BookPage, { kind: 'text' }>; book: Book; u: Unit }) {
  return (
    <div>
      {page.heading && (
        <>
          <h3 className={`${display.className} text-center leading-tight`} style={{ fontSize: u(2.5) }}>
            {page.heading}
          </h3>
          <p className="text-center" style={{ fontSize: u(1), color: book.cloth, margin: `${u(0.5)} 0 ${u(1.4)}` }}>
            ❧
          </p>
        </>
      )}
      <div className="space-y-[0.6em] hyphens-auto text-justify" style={{ fontSize: u(1.58), lineHeight: 1.5 }} lang="en">
        {page.paragraphs.map((paragraph, i) => (
          <p
            key={paragraph}
            // a drop cap opens each section, set in the display face and the book's colour
            className={
              i === 0 && page.heading
                ? `first-letter:float-left first-letter:mr-[0.08em] first-letter:mt-[0.06em] first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:text-[color:var(--cap)] first-letter:[font-family:var(--font-fell)]`
                : i > 0
                  ? 'indent-[1.4em]'
                  : 'italic'
            }
            style={i === 0 && page.heading ? ({ '--cap': book.cloth } as React.CSSProperties) : undefined}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

function FigurePage({ page, u }: { page: Extract<BookPage, { kind: 'figure' }>; u: Unit }) {
  const { figure } = page
  return (
    <figure className="flex h-full flex-col items-center justify-center">
      {/* a plate tipped into the book: matted, with a hairline frame */}
      <div className="relative min-h-0 flex-1" style={{ width: '100%' }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ padding: u(0.6) }}
        >
          <div className="relative h-full w-full bg-[#fbf7ec] shadow-[0_2px_6px_rgba(60,40,20,0.25)] ring-1 ring-[#c9b896]" style={{ padding: u(0.8) }}>
            <div className="relative h-full w-full">
              <Image
                src={figure.src}
                alt={figure.alt}
                fill
                // only two pages exist at a time; lazy loading would leave a
                // blank plate as the page lands
                loading="eager"
                sizes="(max-width: 768px) 80vw, 520px"
                className="object-contain [filter:sepia(0.12)_contrast(1.02)]"
              />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="text-center" style={{ marginTop: u(1.2) }}>
        <span className="block italic" style={{ fontSize: u(1.4), lineHeight: 1.35 }}>
          {figure.caption}
        </span>
        <span className="mt-[0.4em] block text-[#8a7a62]" style={{ fontSize: u(0.85) }}>
          {figure.credit}
        </span>
      </figcaption>
    </figure>
  )
}
