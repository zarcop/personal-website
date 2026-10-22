'use client'

import { useEffect, useState } from 'react'
import { useNarrowViewport } from '@/lib/useNarrow'
import { useRoom } from '@/store/room'
import DesktopOS, { PX_H, PX_W } from './DesktopOS'

/** A 16px gutter each side, plus the 10px bezel. Height leaves room for the button above and the hint below. */
const MARGIN_X = 52
const MARGIN_Y = 150
/** Below this width a portrait screen is a phone held upright. */
const PHONE_W = 600

function fitScale() {
  return Math.min((window.innerWidth - MARGIN_X) / PX_W, (window.innerHeight - MARGIN_Y) / PX_H, 1.4)
}

/**
 * The computer on a portrait screen. Mounted on the 3D monitor there it would
 * be viewed from too far back to read, so instead it fills the screen as its
 * own layer — the same DesktopOS, scaled to fit, inside a bezel.
 *
 * `data-surface` lets the desktop's pointer and window dragging convert
 * screen pixels back to its design pixels exactly as they do on the monitor.
 */
export default function ScreenOverlay() {
  const overlay = useRoom((s) => s.overlay)
  const narrow = useNarrowViewport()
  const open = narrow && overlay === 'desk'
  const [scale, setScale] = useState(1)
  const [phone, setPhone] = useState(false)

  useEffect(() => {
    if (!open) return
    const update = () => {
      setScale(fitScale())
      setPhone(window.innerWidth < PHONE_W)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [open])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#0c0a08]/70 backdrop-blur-[3px]">
      {/* the bezel, sized to the scaled screen so it hugs it */}
      <div
        className="rounded-[14px] bg-[#111] p-[10px] shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
        style={{ width: PX_W * scale + 20, height: PX_H * scale + 20 }}
      >
        <div className="overflow-hidden rounded-[4px]" style={{ width: PX_W * scale, height: PX_H * scale }}>
          <div data-surface="desk" style={{ width: PX_W, height: PX_H, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
            <DesktopOS />
          </div>
        </div>
      </div>

      {phone && (
        <p className="flex items-center gap-2 px-4 text-center font-mono text-2xs uppercase tracking-label text-[#e9dcc0]/70">
          <span aria-hidden className="inline-block rotate-90 text-[14px]">▯</span>
          Turn your phone sideways for a bigger screen
        </p>
      )}
    </div>
  )
}
