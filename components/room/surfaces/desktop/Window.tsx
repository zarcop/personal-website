'use client'

import { useRef, type ReactNode } from 'react'
import { designScale } from './Cursor'
import type { Bounds, WindowAction, WindowState } from './state'

/**
 * Window chrome: a title bar you can drag (double-click to zoom), and the three
 * traffic lights — close, minimize to the dock, zoom to fill the desktop.
 *
 * Drag deltas arrive in screen pixels and are converted back into the desktop's
 * design pixels, or the window would trail behind the pointer at any zoom.
 */
export default function Window({
  win,
  title,
  active,
  bounds,
  dark,
  dispatch,
  children,
}: {
  win: WindowState
  title: string
  active: boolean
  bounds: Bounds
  dark?: boolean
  dispatch: (action: WindowAction) => void
  children: ReactNode
}) {
  const drag = useRef<{ x: number; y: number; left: number; top: number; scale: number } | null>(null)
  const frame = win.maximized ? { x: 0, y: 0, w: bounds.w, h: bounds.h } : win

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (win.maximized || (e.target as Element).closest('button')) return
    const surface = e.currentTarget.closest<HTMLElement>('[data-surface]')
    if (!surface) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY, left: win.x, top: win.y, scale: designScale(surface) }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current
    if (!start) return
    dispatch({
      type: 'move',
      id: win.id,
      x: start.left + (e.clientX - start.x) * start.scale,
      y: start.top + (e.clientY - start.y) * start.scale,
      bounds,
    })
  }

  const endDrag = () => {
    drag.current = null
  }

  return (
    <div
      role="dialog"
      aria-label={title}
      onPointerDownCapture={() => dispatch({ type: 'focus', id: win.id })}
      className={[
        'absolute flex animate-window-open flex-col overflow-hidden transition-[opacity,transform] duration-200',
        win.maximized ? 'rounded-none' : 'rounded-[10px]',
        dark ? 'bg-[#1e1f24] text-white/90 ring-white/10' : 'bg-[#f6f3ee] text-[#1c1a17] ring-black/25',
        active ? 'shadow-[0_22px_50px_rgba(0,0,0,0.5)]' : 'shadow-[0_10px_26px_rgba(0,0,0,0.32)]',
        'ring-1',
        win.minimized ? 'pointer-events-none translate-y-[60%] scale-[0.2] opacity-0' : '',
      ].join(' ')}
      style={{ left: frame.x, top: frame.y, width: frame.w, height: frame.h, zIndex: win.z }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => dispatch({ type: 'toggleMaximize', id: win.id })}
        className={[
          'group relative flex h-[28px] flex-none items-center px-3 select-none',
          dark ? 'bg-[#2a2b31]' : 'bg-[#ddd7cd]',
        ].join(' ')}
      >
        <span className="flex gap-1.5">
          <Light label="Close" colour="#e06c5a" glyph="×" active={active} onClick={() => dispatch({ type: 'close', id: win.id })} />
          <Light label="Minimize" colour="#e0b45a" glyph="−" active={active} onClick={() => dispatch({ type: 'minimize', id: win.id })} />
          <Light
            label={win.maximized ? 'Restore' : 'Zoom'}
            colour="#7fb86b"
            glyph="+"
            active={active}
            onClick={() => dispatch({ type: 'toggleMaximize', id: win.id })}
          />
        </span>
        <span
          className={[
            'pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium',
            dark ? 'text-white/60' : 'text-black/55',
            active ? '' : 'opacity-60',
          ].join(' ')}
        >
          {title}
        </span>
      </div>

      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

/** One traffic light. Grey when the window is in the back, glyph on hover. */
function Light({
  label,
  colour,
  glyph,
  active,
  onClick,
}: {
  label: string
  colour: string
  glyph: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative z-10 grid h-[12px] w-[12px] place-items-center rounded-full text-[10px] font-bold leading-none text-black/0 ring-1 ring-black/15 group-hover:text-black/55"
      style={{ background: active ? colour : '#b9b3aa' }}
    >
      {glyph}
    </button>
  )
}
