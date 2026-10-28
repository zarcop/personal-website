'use client'

import { useReducer, useState } from 'react'
import { useNowPlaying } from '@/components/room/NowPlaying'
import { GitHubIcon, LinkedInIcon, SpotifyIcon, XIcon } from '@/components/room/surfaces/BrandIcons'
import { socialById } from '@/data/socials'
import { useRoom } from '@/store/room'
import Browser, { PAGE_TITLE } from './apps/Browser'
import Finder, { FILES, FileIcon, type FileAction } from './apps/Finder'
import Music from './apps/Music'
import Cursor from './Cursor'
import LockScreen, { useNow } from './LockScreen'
import {
  back,
  currentPage,
  forward,
  frontWindow,
  initialWindows,
  startHistory,
  visit,
  windowsReducer,
  type AppId,
  type Frame,
} from './state'
import Window from './Window'

/**
 * The screen inside the monitor: a small working computer.
 *
 * Laid out in its own 900 x 528 pixel space and mapped onto the screen plane by
 * SurfaceUI — so these sizes are design pixels, not CSS pixels on the
 * visitor's display. At the desk pose the screen fills roughly 72% of frame
 * height, which renders them about 1.2x larger than written here.
 *
 * It wakes on a lock screen, then opens with the browser up on the intro,
 * because the intro is the reason anyone lands here. Windows drag, close,
 * minimize to the dock and zoom; the pointer is the computer's own.
 */

export const PX_W = 900
export const PX_H = 528
const MENU_H = 24
const DOCK_H = 62
/** The area windows live in: between the menu bar and the dock. */
const DESK = { w: PX_W, h: PX_H - MENU_H - DOCK_H }

/**
 * The browser's frame matches the window painted onto the monitor in
 * props/Monitor.tsx, so the swap from painted to live does not jump.
 */
const FRAMES: Record<AppId, Frame> = {
  browser: { x: 12, y: 6, w: 876, h: DESK.h - 8 },
  finder: { x: 170, y: 54, w: 520, h: 290 },
  music: { x: 470, y: 36, w: 380, h: 150 },
}

const APP_NAME: Record<AppId, string> = { browser: 'Browser', finder: 'Finder', music: 'Music' }

/**
 * The desktop picture: a system wallpaper, not a nameplate. Three layers —
 * a sweep through blue into violet and warm pink, a glow bottom-right, and a
 * highlight top-left — because a single linear gradient across 900px reads flat
 * and banded where a layered one reads lit.
 */
const WALLPAPER = [
  'radial-gradient(85% 70% at 14% 4%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 58%)',
  'radial-gradient(115% 95% at 88% 104%, rgba(236,142,96,0.58) 0%, rgba(236,142,96,0) 56%)',
  'linear-gradient(152deg, #0d1f55 0%, #262a7c 28%, #4f2f85 52%, #8a3a7c 76%, #b85070 100%)',
].join(', ')

const SOCIAL_DOCK = [
  { id: 'github', Icon: GitHubIcon, bg: '#1f2328' },
  { id: 'linkedin', Icon: LinkedInIcon, bg: '#0a66c2' },
  { id: 'x', Icon: XIcon, bg: '#16181c' },
] as const

export default function DesktopOS() {
  const locked = useRoom((s) => s.screenLocked)
  const setLocked = useRoom((s) => s.setScreenLocked)
  const reducedMotion = useRoom((s) => s.reducedMotion)
  const nowPlaying = useNowPlaying(true)
  const now = useNow()

  const [windows, dispatch] = useReducer(windowsReducer, FRAMES, (frames) => initialWindows(frames, ['browser']))
  const [history, setHistory] = useState(() => startHistory('about'))
  const [selected, setSelected] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const front = frontWindow(windows)
  const byId = (id: AppId) => windows.find((w) => w.id === id)!

  const open = (action: FileAction) => {
    switch (action.kind) {
      case 'page':
        setHistory((h) => visit(h, action.page))
        dispatch({ type: 'open', id: 'browser' })
        break
      case 'app':
        dispatch({ type: 'open', id: action.app })
        break
      case 'external':
        window.open(action.href, '_blank', 'noopener,noreferrer')
        break
      case 'site':
        // drei's <Html> renders this screen in its own React root, outside the
        // App Router's context, so useRouter() is unavailable here. Leaving the
        // room is a full navigation anyway, and it frees the WebGL context.
        window.location.assign(action.href)
        break
    }
  }

  const title: Record<AppId, string> = {
    browser: PAGE_TITLE[currentPage(history)],
    finder: 'Desktop',
    music: 'Music',
  }

  return (
    <div
      className="relative flex cursor-none select-none flex-col overflow-hidden text-[#eef1f6] [&_*]:cursor-none"
      style={{ width: PX_W, height: PX_H, background: WALLPAPER }}
    >
      {/* ——— menu bar ——— */}
      <div
        className="relative z-[60] flex flex-none items-center justify-between bg-black/30 px-3 text-[11px] backdrop-blur-md"
        style={{ height: MENU_H }}
      >
        <span className="flex items-center gap-3.5">
          <button
            type="button"
            aria-label="Computer menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className={[
              'grid h-[16px] w-[18px] place-items-center rounded-[4px] text-[8px] font-bold',
              menuOpen ? 'bg-white/25 text-white' : 'bg-[#c2703c] text-[#140f0b]',
            ].join(' ')}
          >
            EZ
          </button>
          <span className="font-semibold tracking-tight">{APP_NAME[front?.id ?? 'finder']}</span>
          {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
            <span key={item} className="text-white/70">
              {item}
            </span>
          ))}
        </span>

        <span className="flex items-center gap-3 text-white/75">
          {nowPlaying?.playing && nowPlaying.title && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'open', id: 'music' })}
              className="flex max-w-[220px] items-center gap-1.5 text-[#7fd6a0]"
            >
              <SpotifyIcon className="h-3 w-3 flex-none" />
              <span className="truncate">{nowPlaying.title}</span>
            </button>
          )}
          <StatusIcons />
          <span className="tabular-nums">
            {now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}{' '}
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </span>

        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close the menu"
              className="fixed inset-0 z-0"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-2 top-[22px] z-10 w-[190px] rounded-md bg-[#2a2b31]/95 p-1 text-[11px] shadow-xl ring-1 ring-white/10 backdrop-blur">
              <MenuItem
                label="About this computer"
                onClick={() => {
                  setMenuOpen(false)
                  open({ kind: 'page', page: 'about' })
                }}
              />
              <MenuItem
                label="Open Finder"
                onClick={() => {
                  setMenuOpen(false)
                  open({ kind: 'app', app: 'finder' })
                }}
              />
              <div className="my-1 h-px bg-white/10" />
              <MenuItem
                label="Lock Screen"
                onClick={() => {
                  setMenuOpen(false)
                  setLocked(true)
                }}
              />
              <MenuItem label="Go to the written site" onClick={() => open({ kind: 'site', href: '/about' })} />
            </div>
          </>
        )}
      </div>

      {/* ——— desktop ——— */}
      <div className="relative flex-1" onClick={() => setSelected(null)}>
        {/* icons sit along the right edge, the way they land on a real desktop */}
        <div className="absolute right-3 top-3 flex flex-col items-center gap-2">
          {FILES.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelected(file.id)
              }}
              onDoubleClick={() => open(file.action)}
              className="flex w-[74px] flex-col items-center gap-1 text-center"
            >
              <span className={['rounded-md p-1', selected === file.id ? 'bg-white/20' : ''].join(' ')}>
                <FileIcon icon={file.icon} size={36} />
              </span>
              <span
                className={[
                  'rounded px-1 text-[10px] leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]',
                  selected === file.id ? 'bg-[#2f6fd1] text-white' : 'text-white/90',
                ].join(' ')}
              >
                {file.label}
              </span>
            </button>
          ))}
        </div>

        {windows
          .filter((w) => w.open)
          .map((win) => (
            <Window
              key={win.id}
              win={win}
              title={title[win.id]}
              active={front?.id === win.id}
              bounds={DESK}
              dark={win.id === 'music'}
              dispatch={dispatch}
            >
              {win.id === 'browser' && (
                <Browser
                  history={history}
                  onVisit={(page) => setHistory((h) => visit(h, page))}
                  onBack={() => setHistory(back)}
                  onForward={() => setHistory(forward)}
                />
              )}
              {win.id === 'finder' && <Finder onOpen={open} />}
              {win.id === 'music' && <Music data={nowPlaying} />}
            </Window>
          ))}
      </div>

      {/* ——— dock ——— */}
      <div className="relative z-[60] flex flex-none items-end justify-center pb-1.5" style={{ height: DOCK_H }}>
        <div className="flex items-end gap-2 rounded-[16px] bg-[#3a3540]/55 px-2.5 pb-1.5 pt-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-md">
          {(['browser', 'finder', 'music'] as const).map((id) => (
            <DockButton
              key={id}
              label={APP_NAME[id]}
              running={byId(id).open}
              onClick={() => dispatch({ type: 'open', id })}
            >
              <AppIcon id={id} />
            </DockButton>
          ))}

          <span aria-hidden className="mx-0.5 mb-1 h-9 w-px bg-white/20" />

          {SOCIAL_DOCK.map(({ id, Icon, bg }) => {
            const social = socialById(id)
            if (!social) return null
            return (
              <a
                key={id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative flex flex-col items-center"
              >
                <DockTile bg={bg}>
                  <Icon className="h-[19px] w-[19px]" />
                </DockTile>
                <DockLabel>{social.label}</DockLabel>
              </a>
            )
          })}
        </div>
      </div>

      {locked && <LockScreen reducedMotion={reducedMotion} onUnlock={() => setLocked(false)} />}

      <Cursor />
    </div>
  )
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full rounded px-2.5 py-[5px] text-left text-white/85 hover:bg-[#2f6fd1] hover:text-white"
    >
      {label}
    </button>
  )
}

function DockTile({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <span
      className="grid h-[40px] w-[40px] place-items-center rounded-[11px] text-white shadow-[0_3px_8px_rgba(0,0,0,0.3)] ring-1 ring-white/15 transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110"
      style={{ background: bg }}
    >
      {children}
    </span>
  )
}

/** The name that floats above a dock icon on hover. */
function DockLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute -top-[26px] whitespace-nowrap rounded-md bg-[#2a2b31]/90 px-2 py-[2px] text-[10px] text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
      {children}
    </span>
  )
}

function DockButton({
  label,
  running,
  onClick,
  children,
}: {
  label: string
  running: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="group relative flex flex-col items-center">
      {children}
      <DockLabel>{label}</DockLabel>
      {/* the dot under an app that has a window open */}
      <span className={['mt-[3px] h-[3px] w-[3px] rounded-full', running ? 'bg-white/80' : 'bg-transparent'].join(' ')} />
    </button>
  )
}

function AppIcon({ id }: { id: AppId }) {
  if (id === 'music') {
    return (
      <span className="transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110">
        <FileIcon icon="music" size={40} />
      </span>
    )
  }
  if (id === 'finder') {
    return (
      <DockTile bg="linear-gradient(90deg, #6cb0f2 50%, #e9f2fb 50%)">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3v18" stroke="#1d4f8a" strokeWidth="1.6" />
          <circle cx="7.5" cy="9" r="1.3" fill="#1d4f8a" />
          <circle cx="16.5" cy="9" r="1.3" fill="#1d4f8a" />
          <path d="M6 15.5c3.5 3 8.5 3 12 0" stroke="#1d4f8a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </DockTile>
    )
  }
  // the browser: a compass, the way browser icons have looked for twenty years
  return (
    <DockTile bg="linear-gradient(160deg, #f4f1ec, #d9d3c9)">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <circle cx="14" cy="14" r="11.5" fill="#2f80d1" stroke="#1d5fa3" strokeWidth="1" />
        <path d="M14 14l5.5-7.5L14 14l-5.5 7.5z" fill="#fff" />
        <path d="M14 14l5.5-7.5-3 9.5z" fill="#e0533f" />
        <path d="M14 14l-5.5 7.5 3-9.5z" fill="#fff" />
      </svg>
    </DockTile>
  )
}

/** Wi-Fi and battery in the menu bar. Decoration, but their absence reads as a mock-up. */
function StatusIcons() {
  return (
    <span aria-hidden className="flex items-center gap-2.5">
      <svg width="14" height="10" viewBox="0 0 14 10">
        <path d="M7 9.2l1.6-1.9a2.2 2.2 0 0 0-3.2 0z" fill="currentColor" />
        <path d="M3.4 5.4a5 5 0 0 1 7.2 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M1 3a8.4 8.4 0 0 1 12 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
      <svg width="22" height="10" viewBox="0 0 22 10">
        <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="currentColor" fill="none" opacity="0.6" />
        <rect x="2" y="2" width="13" height="6" rx="1.3" fill="currentColor" />
        <rect x="19.5" y="3.2" width="1.6" height="3.6" rx="0.8" fill="currentColor" opacity="0.6" />
      </svg>
    </span>
  )
}
