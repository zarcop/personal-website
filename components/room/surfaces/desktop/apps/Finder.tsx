'use client'

import { useState } from 'react'
import { resumePdf } from '@/data/socials'
import type { AppId, Page } from '../state'

/** What opening a file does: a page in the browser, another app, or a real link out. */
export type FileAction =
  | { kind: 'page'; page: Page }
  | { kind: 'app'; app: AppId }
  | { kind: 'external'; href: string }
  | { kind: 'site'; href: string }

export type DesktopFile = {
  id: string
  label: string
  icon: 'pdf' | 'folder' | 'web' | 'music'
  action: FileAction
}

/** One list for both the desktop icons and the Finder window, so they cannot disagree. */
export const FILES: DesktopFile[] = [
  { id: 'resume', label: 'Résumé.pdf', icon: 'pdf', action: { kind: 'external', href: resumePdf } },
  { id: 'projects', label: 'Projects', icon: 'folder', action: { kind: 'page', page: 'projects' } },
  { id: 'experience', label: 'Experience', icon: 'folder', action: { kind: 'page', page: 'experience' } },
  { id: 'music', label: 'Now Playing', icon: 'music', action: { kind: 'app', app: 'music' } },
  { id: 'site', label: 'Written site', icon: 'web', action: { kind: 'site', href: '/about' } },
]

export function FileIcon({ icon, size = 40 }: { icon: DesktopFile['icon']; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
      {icon === 'folder' && (
        <>
          <path d="M3 9a3 3 0 0 1 3-3h9l3 3h16a3 3 0 0 1 3 3v2H3z" fill="#4a90d9" />
          <rect x="3" y="12" width="34" height="22" rx="3" fill="#6cb0f2" />
          <rect x="3" y="12" width="34" height="2" fill="#8cc4f6" />
        </>
      )}
      {icon === 'pdf' && (
        <>
          <path d="M9 3h16l7 7v25a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#fbfaf7" />
          <path d="M25 3v5a2 2 0 0 0 2 2h5z" fill="#d9d4cb" />
          <rect x="7" y="22" width="26" height="9" rx="1.5" fill="#d9483b" />
          <text x="20" y="29" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="system-ui">
            PDF
          </text>
          <rect x="11" y="12" width="12" height="1.6" rx="0.8" fill="#c9c3b9" />
          <rect x="11" y="16" width="16" height="1.6" rx="0.8" fill="#c9c3b9" />
        </>
      )}
      {icon === 'web' && (
        <>
          <circle cx="20" cy="20" r="16" fill="#2f80d1" />
          <path
            d="M4 20h32M20 4c5 5 5 27 0 32M20 4c-5 5-5 27 0 32M7 12h26M7 28h26"
            stroke="#cfe6fb"
            strokeWidth="1.4"
            fill="none"
          />
        </>
      )}
      {icon === 'music' && (
        <>
          <rect x="4" y="4" width="32" height="32" rx="8" fill="#1db954" />
          <path d="M16 27V13l12-3v14" stroke="#0b2b16" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="14" cy="27" r="3" fill="#0b2b16" />
          <circle cx="26" cy="24" r="3" fill="#0b2b16" />
        </>
      )}
    </svg>
  )
}

const SIDEBAR = ['Desktop', 'Documents', 'Downloads', 'Projects']

/** A Finder window on the same files the desktop shows. Click selects, double-click opens. */
export default function Finder({ onOpen }: { onOpen: (action: FileAction) => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex h-full">
      <nav className="w-[120px] flex-none border-r border-black/10 bg-[#ebe6de] px-2 py-3 text-[11px]">
        <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/35">Favourites</p>
        {SIDEBAR.map((item) => (
          <p
            key={item}
            className={[
              'rounded-md px-2 py-[3px]',
              item === 'Desktop' ? 'bg-black/[0.08] font-medium text-black/80' : 'text-black/55',
            ].join(' ')}
          >
            {item}
          </p>
        ))}
      </nav>

      <div className="grid flex-1 grid-cols-4 content-start gap-2 p-4" onClick={() => setSelected(null)}>
        {FILES.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelected(file.id)
            }}
            onDoubleClick={() => onOpen(file.action)}
            className="flex flex-col items-center gap-1 rounded-md p-1.5 text-center"
          >
            <FileIcon icon={file.icon} />
            <span
              className={[
                'rounded px-1 text-[10px] leading-tight',
                selected === file.id ? 'bg-[#2f6fd1] text-white' : 'text-black/70',
              ].join(' ')}
            >
              {file.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
