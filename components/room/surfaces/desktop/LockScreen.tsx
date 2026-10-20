'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { intro } from '@/data/about'

/** The time, refreshed often enough that a minute never reads stale. */
export function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  return now
}

const LIFT_MS = 420

/**
 * What the monitor shows before anyone has used it: the desktop blurred behind
 * a clock, the way a real one wakes. A click or any key lifts it away.
 *
 * Escape is left alone: in the room it means "back to the wall", and taking it
 * over here would trap a keyboard user at the desk.
 */
export default function LockScreen({
  onUnlock,
  reducedMotion,
}: {
  onUnlock: () => void
  reducedMotion: boolean
}) {
  const now = useNow()
  const [lifting, setLifting] = useState(false)

  useEffect(() => {
    if (!lifting) return
    if (reducedMotion) return onUnlock()
    const id = setTimeout(onUnlock, LIFT_MS)
    return () => clearTimeout(id)
  }, [lifting, reducedMotion, onUnlock])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') setLifting(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <button
      type="button"
      aria-label="Unlock the computer"
      onClick={() => setLifting(true)}
      className={[
        'absolute inset-0 z-[90] flex flex-col items-center justify-between bg-[#0d1030]/55 py-12 text-white backdrop-blur-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]',
        'transition-[transform,opacity] ease-in',
        lifting ? '-translate-y-full opacity-0' : '',
      ].join(' ')}
      style={{ transitionDuration: `${LIFT_MS}ms` }}
    >
      <span className="flex flex-col items-center">
        <span className="text-[15px] font-medium text-white/80">
          {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <span className="mt-1 text-[92px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-white/95">
          {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}
        </span>
      </span>

      <span className="flex flex-col items-center gap-2.5">
        <Image
          src={intro.photo.src}
          alt=""
          width={120}
          height={120}
          className="h-[54px] w-[54px] rounded-full object-cover ring-2 ring-white/30"
        />
        <span className="text-[14px] font-medium">{intro.name}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-[11px] text-white/80 ring-1 ring-white/15">
          Click or press any key to unlock
        </span>
      </span>
    </button>
  )
}
