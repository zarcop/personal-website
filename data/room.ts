import type { Vec3 } from '@/lib/types'

/**
 * The room's interactive objects.
 *
 * Each hotspot owns a camera pose: where the camera sits and what it looks at
 * when that object is selected. Poses are authored by hand rather than derived
 * from bounding boxes — framing an object well is a judgement call, and a
 * computed pose always looks almost right.
 *
 * Two rules the poses follow, learned from looking at them:
 *   - stay far enough back that the room is still readable behind the object
 *   - aim a little BELOW the object, so it rides in the upper half of the frame
 *     and the overlay panel does not cover it
 *
 * `mesh` is the name the greybox uses now and the name the real glTF node must
 * use in M2, so swapping the model in does not touch this file.
 */
export type Hotspot = {
  id: string
  /** Shown in the hover label and in the keyboard navigation list. */
  label: string
  /** One line of orientation, shown under the label in the overlay. */
  kicker: string
  mesh: string
  camera: { position: Vec3; target: Vec3 }
  /** Overlay body. Each string is a paragraph. Keep it short — this is not the CV. */
  body: string[]
  links?: { label: string; href: string; external?: boolean }[]
  /** Flagged by `npm run content:check` and badged in dev. */
  todo?: string
}

/** Where the camera rests when nothing is selected. */
export const IDLE_POSE = {
  position: [6.5, 4.2, 6.5] as Vec3,
  target: [0, 1.1, -0.5] as Vec3,
}

export const hotspots: Hotspot[] = [
  {
    id: 'desk',
    label: 'The desk',
    kicker: 'Who I am, and where to find me',
    mesh: 'monitor',
    camera: { position: [-1.1, 2.0, 0.6], target: [-1.1, 1.05, -3.6] },
    body: [
      'Industrial engineer from Toluca, Mexico. I study Industrial & Systems Engineering and CS at Georgia Tech, and I work at the intersection of AI and optimization.',
      'Google in 2025, HSBC Mexico the summer after. Mostly interested in problems where the math and the system have to agree with each other.',
    ],
    links: [
      { label: 'The written version', href: '/' },
      { label: 'GitHub', href: 'https://github.com/zarcop', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/eliaszarcog', external: true },
      { label: 'Email', href: 'mailto:eliaszarco@gmail.com', external: true },
    ],
  },
  {
    id: 'map',
    label: 'The map',
    kicker: 'Toluca, and how I got from there to here',
    mesh: 'map',
    camera: { position: [2.1, 2.15, -0.7], target: [2.1, 1.5, -3.95] },
    body: [
      'Born and raised in Toluca, an hour outside Mexico City. Home for the first 18 years.',
      'Left for Georgia Tech, which is where industrial engineering turned into software and then into AI.',
    ],
    links: [{ label: 'The longer story', href: '/' }],
  },
  {
    id: 'bookshelf',
    label: 'The bookshelf',
    kicker: 'Economics, history, and what I am reading',
    mesh: 'bookshelf',
    camera: { position: [-0.7, 1.9, 0.9], target: [-3.7, 0.9, 0.2] },
    todo: 'Needs the actual shelf: 4-6 books with a line each on why they stuck.',
    body: [
      'Mostly economics and history, with a bias toward Latin America.',
      '[Placeholder — the real books go here, with a line each.]',
    ],
  },
  {
    id: 'football',
    label: 'The ball',
    kicker: 'Toluca FC, Bayern, and a decent pair of gloves',
    mesh: 'football',
    camera: { position: [2.9, 1.7, 4.2], target: [2.6, -0.1, 1.2] },
    body: [
      'Goalkeeper, and a decent one. Toluca FC first, Bayern Munich second.',
      'Football is also how I keep up with home from four thousand kilometres away.',
    ],
  },
]

export const hotspotById = (id: string | null): Hotspot | undefined =>
  id ? hotspots.find((h) => h.id === id) : undefined
