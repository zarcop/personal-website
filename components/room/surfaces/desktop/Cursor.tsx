'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Design pixels per screen pixel for a surface. The surface is laid out at its
 * design size and scaled by a CSS transform, so its layout width over its
 * on-screen width converts pointer movement back into its own space.
 */
export function designScale(surface: HTMLElement) {
  return surface.offsetWidth / surface.getBoundingClientRect().width
}

const CLICKABLE = 'a, button, [role="button"]'

/**
 * The computer's own pointer. The visitor's cursor is hidden over the screen
 * and this one follows it in the screen's coordinates, so it is drawn at the
 * screen's scale and stays inside the bezel like a real one.
 *
 * Position is written straight to the element's transform rather than through
 * state: a pointer moves at frame rate, and re-rendering the desktop for each
 * move would be wasted work.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [hand, setHand] = useState(false)

  useEffect(() => {
    const cursor = ref.current
    const surface = cursor?.parentElement
    if (!cursor || !surface) return

    const onMove = (e: PointerEvent) => {
      // a finger has no pointer to draw; a mouse does
      if (e.pointerType !== 'mouse') return
      const rect = surface.getBoundingClientRect()
      const scale = designScale(surface)
      const x = (e.clientX - rect.left) * scale
      const y = (e.clientY - rect.top) * scale
      cursor.style.transform = `translate(${x}px, ${y}px)`
      cursor.style.opacity = '1'
      setHand(Boolean((e.target as Element | null)?.closest(CLICKABLE)))
    }
    const onLeave = () => {
      cursor.style.opacity = '0'
    }

    surface.addEventListener('pointermove', onMove)
    surface.addEventListener('pointerleave', onLeave)
    return () => {
      surface.removeEventListener('pointermove', onMove)
      surface.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[100] opacity-0"
      style={{ willChange: 'transform' }}
    >
      {hand ? (
        // the hand's hotspot is its fingertip, so it hangs left of the point
        <svg width="20" height="22" viewBox="0 0 20 22" className="-translate-x-[6px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
          <path
            d="M6.5 1.5c1 0 1.8.8 1.8 1.8v6.2l.4-.1V7.6c0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7v1.6l.4-.1c0-.9.8-1.6 1.7-1.6s1.7.8 1.7 1.7v1.1l.3-.1c.9 0 1.6.8 1.6 1.7v4.2c0 3.3-2.6 5.9-5.9 5.9H10c-1.9 0-3.6-.9-4.7-2.4L1.9 14.6c-.6-.8-.4-1.9.4-2.5.7-.5 1.7-.4 2.3.3l.2.3V3.3c0-1 .8-1.8 1.7-1.8z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="22" viewBox="0 0 16 22" className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
          <path
            d="M1 1v17.2l4.3-4.1 2.8 6.5 2.9-1.2-2.8-6.4h6z"
            fill="#111"
            stroke="#fff"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
