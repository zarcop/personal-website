'use client'

import Image from 'next/image'
import { experience } from '@/data/experience'
import { hotspotById } from '@/data/room'
import type { Experience } from '@/lib/types'

/**
 * What is written on the whiteboard: the timeline, newest first.
 *
 * Laid out in its own 700 x 538 pixel space and mapped onto the board by
 * SurfaceUI, so these are design pixels. The rail, the dots and the tiles line
 * up with the ones drawn into the board's geometry, so focusing the board
 * sharpens what was already there rather than replacing it.
 *
 * Entries come from data/experience.ts, which also feeds the written
 * /experience page — the two cannot drift apart.
 */

const PX_W = 700
const PX_H = 538

/** The logo square. A real file when there is one, a lettered tile when not. */
function Mark({ role }: { role: Experience }) {
  if (role.logo) {
    return (
      <Image
        src={role.logo}
        alt=""
        width={72}
        height={72}
        aria-hidden
        // A few KB each, so the optimizer's cold round trip costs more than it
        // saves. Eager because lazy images inside the 3D-transformed board (and
        // the nested scrollers of the phone panel) are not reliably noticed as
        // on screen, and some browsers never fetch them.
        unoptimized
        loading="eager"
        className="h-[34px] w-[34px] flex-none rounded-[7px] object-contain ring-1 ring-black/10"
      />
    )
  }

  const short = role.mark?.short ?? role.org.slice(0, 2).toUpperCase()
  const size = short.length >= 4 ? 9 : short.length === 3 ? 11 : 13

  return (
    <span
      aria-hidden
      className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] font-semibold tracking-tight ring-1 ring-black/10"
      style={{
        background: role.mark?.bg ?? '#3a4a55',
        color: role.mark?.fg ?? '#ffffff',
        fontSize: size,
      }}
    >
      {short}
    </span>
  )
}

/**
 * `fit` drops the fixed board size so the same timeline can fill the bottom
 * panel on a portrait screen, where the board in the room is too far back to read.
 */
export default function BoardContent({ fit = false }: { fit?: boolean }) {
  const hotspot = hotspotById('whiteboard')
  if (!hotspot) return null

  return (
    <div
      className={`flex flex-col bg-[#f8f6f2] text-[#23211e] ${fit ? 'rounded-md px-4 py-4' : 'px-6 py-5'}`}
      style={fit ? undefined : { width: PX_W, height: PX_H }}
    >
      <div className="flex flex-none items-baseline justify-between border-b-2 border-[#23211e]/80 pb-2">
        <h2 className="text-[19px] font-semibold tracking-tight">{hotspot.label}</h2>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-black/40">
          {hotspot.kicker}
        </span>
      </div>

      <p className="mt-2 flex-none text-[11px] text-black/50">{hotspot.body[0]}</p>

      <ol className="relative mt-3 flex-1 overflow-y-auto">
        {/* the rail the dots hang on */}
        <span aria-hidden className="absolute bottom-3 left-[13px] top-3 w-px bg-black/15" />

        {experience.slice(0, 5).map((role) => (
          <li key={role.slug} className="relative flex gap-3 py-[15px] pl-8">
            <span
              aria-hidden
              className="absolute left-[8px] top-[26px] h-[11px] w-[11px] rounded-full border-2 border-[#2b4f63] bg-[#f8f6f2]"
            />

            <Mark role={role} />

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-[12.5px] font-semibold leading-snug">{role.org}</p>
                <p className="flex-none font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">
                  {role.period}
                </p>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                {/* truncated on the wall, where the board has a fixed size; free to wrap in the panel */}
                <p
                  className={`${fit ? '' : 'truncate'} font-mono text-[9px] uppercase tracking-[0.13em] text-[#a8552a]`}
                >
                  {role.role}
                </p>
                {role.location && (
                  <p className="flex-none font-mono text-[9px] text-black/35">{role.location}</p>
                )}
              </div>
              <p className="mt-[3px] text-[11px] leading-[1.45] text-black/65">{role.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-2 flex flex-none flex-wrap gap-x-5 gap-y-2 border-t border-black/15 pt-2.5 text-[10.5px]">
        {hotspot.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#a8552a] underline decoration-[#a8552a]/35 underline-offset-[3px] hover:decoration-[#a8552a]"
          >
            {link.label} →
          </a>
        ))}
      </div>
    </div>
  )
}
