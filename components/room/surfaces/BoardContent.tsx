'use client'

import { hotspotById } from '@/data/room'

/**
 * What is written on the whiteboard. Laid out as a board rather than a
 * document: a heading, ruled entries, and the links down in the tray area.
 */
export default function BoardContent() {
  const hotspot = hotspotById('whiteboard')
  if (!hotspot) return null

  return (
    <div className="flex h-full w-full flex-col bg-[#f8f6f2] px-7 py-6 text-[#23211e]">
      <div className="flex items-baseline justify-between border-b-2 border-[#23211e]/80 pb-2">
        <h2 className="text-[20px] font-semibold tracking-tight">Achievements</h2>
        <span className="text-[11px] uppercase tracking-[0.14em] text-black/40">
          {hotspot.kicker}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-3.5 overflow-y-auto">
        {hotspot.body.map((entry, i) => {
          const [head, ...rest] = entry.split(' — ')
          return (
            <div key={entry} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.45rem] h-2 w-2 flex-none rotate-45"
                style={{ background: ['#2b4f63', '#8a4b32', '#3f5b52'][i % 3] }}
              />
              <p className="text-[13px] leading-relaxed">
                <span className="font-semibold">{head}</span>
                {rest.length > 0 && <span className="text-black/65"> — {rest.join(' — ')}</span>}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/15 pt-3 text-[12px]">
        {hotspot.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#a8552a] underline decoration-[#a8552a]/40 underline-offset-2 hover:decoration-[#a8552a]"
          >
            {link.label} →
          </a>
        ))}
      </div>
    </div>
  )
}
