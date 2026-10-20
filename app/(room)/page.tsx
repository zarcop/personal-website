import Link from 'next/link'
import RoomCanvasLoader from '@/components/room/RoomCanvasLoader'
import { intro } from '@/data/about'

export const metadata = {
  description:
    'An interactive 3D room. Every object opens something about Elias Zarco — his work, his history, and what he reads.',
}

export default function RoomPage() {
  return (
    <div className="relative h-full w-full">
      {/*
        Real text in the DOM, underneath the canvas. Crawlers and screen readers
        get this; sighted visitors see the canvas painted over it. It is also the
        no-JS experience, so it must stand on its own.

        focus-within lifts it above the canvas: a keyboard user tabs into this link
        before reaching the room, and must be able to see what they have focused.
      */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center px-6 focus-within:z-30 focus-within:bg-background/95">
        <div className="max-w-reading">
          <h1 className="text-[clamp(1.5rem,7vw,2rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {intro.name}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-[1.75] text-muted">
            An interactive 3D room. Every object opens something — the desk, the map,
            the bookshelf, the football.
          </p>
          <p className="mt-6">
            <Link
              href="/about"
              className="font-mono text-2xs uppercase tracking-label text-foreground underline decoration-faint decoration-dotted underline-offset-[5px] transition-colors hover:decoration-accent"
            >
              Prefer to read? The written version →
            </Link>
          </p>
        </div>
      </div>

      <RoomCanvasLoader />
    </div>
  )
}
