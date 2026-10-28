import { email, resumePdf } from '@/data/socials'
import type { Vec3 } from '@/lib/types'

/**
 * The room's interactive objects.
 *
 * Everything lives on ONE wall. The camera never orbits behind it, which means
 * every frame a visitor can reach is a frame we composed on purpose, and nothing
 * needs modelling on its back side.
 *
 * Each hotspot owns a camera pose. Poses are authored by hand rather than derived
 * from bounding boxes — framing is a judgement call and a computed pose always
 * looks almost right. Two rules they follow:
 *   - stay far enough back that neighbouring objects stay in shot for context
 *   - aim a little BELOW the object so it rides in the upper half of the frame,
 *     clear of the overlay panel
 *
 * The two `surface` hotspots break the second rule on purpose: their content is
 * mounted on the object itself, so they are framed dead flat-on and centred.
 * Those two poses are derived from the surface size and the 42° vertical fov —
 * change the geometry and the distance has to move with it.
 */
export type Hotspot = {
  id: string
  /** What you get from it, not what it is. This is the floating label. */
  label: string
  /** The object itself. Only for screen readers, so "Achievements" has a place. */
  object: string
  kicker: string
  /** Where the floating label hangs, in world space. */
  anchor: Vec3
  /** glTF node name. Also the key in data/props.generated.ts. */
  mesh: string
  camera: { position: Vec3; target: Vec3 }
  body: string[]
  links?: { label: string; href: string; external?: boolean }[]
  /**
   * Content lives on the object itself (a screen, a board) rather than in the
   * bottom panel. Those objects render their own UI and OverlayHost skips them.
   */
  surface?: boolean
  todo?: string
}

/** Where the camera rests when nothing is selected: the whole wall in one shot. */
export const IDLE_POSE = {
  position: [0.4, 1.8, 3.6] as Vec3,
  target: [0.4, 1.55, -3.9] as Vec3,
}

/**
 * Idle framing for portrait viewports. A ~7m wall cannot fit a phone screen —
 * fitting it would push the camera back far enough that every object becomes
 * unreadable. Phones open on the desk instead, and reach the rest via the chips.
 *
 * Authored at the same reference aspect as every other pose; CameraRig scales
 * the distance out for the actual viewport.
 */
export const IDLE_POSE_NARROW = {
  position: [0.45, 1.65, -1.05] as Vec3,
  target: [0.45, 1.4, -3.8] as Vec3,
}

/** How far the pointer nudges the camera, in metres. Small on purpose. */
export const PARALLAX = 0.28

export const hotspots: Hotspot[] = [
  {
    id: 'desk',
    label: 'Brief overview',
    object: 'the desk',
    anchor: [0.35, 2.21, -3.5] as Vec3,
    kicker: 'Who I am, and where to find me',
    mesh: 'monitor',
    surface: true,
    // dead flat-on: the screen carries real DOM, and an angle would soften it.
    // 1.73m back puts the 1.5 x 0.88m screen at ~66% of frame height at the
    // reference aspect — big enough to read, with the room still around it.
    camera: { position: [0.35, 1.54, -1.82], target: [0.35, 1.535, -3.6] },
    body: [
      'I grew up in Toluca, Mexico, an hour from Mexico City, and spent my teens convinced public policy was how you change the world. I did competitive debate and planned to study humanities, until senior year, when I realized that if I wanted to create things, I had to learn to build them. I picked industrial engineering at Georgia Tech because it was the most general engineering degree, and two intro CS classes showed me software was how my ideas could actually get built. Clubs and projects along the way gave me a working feel for the business and finance side too.',
      'Since then I’ve mostly followed the overlap. At Google I worked on the Gemini Education team, building interactive AI tools to help kids learn, and machine learning and AI turned out to be where all those threads met. At HSBC Mexico I was on the other side, getting AI adopted instead of built, which is a different problem from making a model work and taught me more about people than about models. Now I’m researching diffusion models for optimization at AI4OPT, aimed at healthcare and manufacturing, and building my own startup on the side. When I’m not working on that, it’s fútbol, history, music, politics, and travel.',
    ],
    links: [
      { label: 'The written version', href: '/about' },
      { label: 'Experience', href: '/experience' },
      { label: 'Projects', href: '/projects' },
      { label: 'Email', href: `mailto:${email}`, external: true },
    ],
  },
  {
    id: 'resume',
    label: 'The one-pager',
    object: 'the résumé',
    anchor: [1.45, 0.95, -3.35] as Vec3,
    kicker: 'One page, the paper version',
    mesh: 'resume',
    camera: { position: [1.45, 1.4, -2.3], target: [1.45, 0.5, -3.3] },
    body: [
      'The one-page version, if you would rather skim than scroll.',
    ],
    links: [
      { label: 'View on Google Drive', href: resumePdf, external: true },
      { label: 'Or read the long version', href: '/about' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    object: 'the tower under the desk',
    anchor: [0.9, 0.58, -3.3] as Vec3,
    kicker: 'What I have actually built',
    mesh: 'tower',
    // Looks down and under the desk from in front of it. A floor-standing object
    // cannot ride above the overlay panel without a steep angle, and the angle
    // has to clear the desk's front edge on the way in — hence the distance.
    // Puts the case between 9% and 37% of frame height.
    camera: { position: [0.9, 1.05, -1.15], target: [0.9, -0.35, -3.35] },
    body: [
      'The ones worth showing. Most began as a class project or a hackathon and then kept going.',
      'The constraint is usually the interesting part — 36 hours, 50 milliseconds, a million rows.',
    ],
    links: [
      { label: 'All of them', href: '/projects' },
      { label: 'GitHub', href: 'https://github.com/zarcop', external: true },
    ],
  },
  {
    id: 'bookcase',
    label: 'What I read',
    object: 'the bookcase',
    anchor: [-2.45, 2.18, -3.6] as Vec3,
    kicker: 'History, politics, faith and art',
    mesh: 'bookcase',
    camera: { position: [-2.45, 1.45, -0.2], target: [-2.45, 0.85, -3.7] },
    /** The four books themselves live in data/books.ts and open in BookReader. */
    body: ['Four books on what I care about outside of engineering.'],
  },
  {
    id: 'photo',
    label: 'Where I come from',
    object: 'the photo',
    anchor: [-0.95, 2.62, -3.9] as Vec3,
    kicker: 'Toluca — where this starts',
    mesh: 'photo',
    camera: { position: [-0.95, 2.05, -1.95], target: [-0.95, 1.7, -3.95] },
    body: [
      'Toluca, an hour outside Mexico City. Home for the first 18 years, and the highest major city in the country — colder than anyone expects Mexico to be.',
      'Left for Georgia Tech, which is where industrial engineering turned into software and then into AI.',
    ],
    links: [{ label: 'The longer story', href: '/about' }],
  },
  {
    id: 'whiteboard',
    label: 'Experience',
    object: 'the whiteboard',
    anchor: [2.15, 2.72, -3.9] as Vec3,
    kicker: 'The path so far',
    mesh: 'whiteboard',
    surface: true,
    // flat-on for the same reason as the desk; 1.88m back for a 1.3 x 1.0m board
    camera: { position: [2.15, 2.0, -2.02], target: [2.15, 1.985, -3.95] },
    /**
     * The entries themselves come from data/experience.ts so the board and the
     * written /experience page can never disagree. This is only the lead line.
     */
    body: [
      'Newest first: research, a bank, big tech, a classroom and a student-run fund.',
    ],
    links: [
      { label: 'Experience', href: '/experience' },
      { label: 'Projects', href: '/projects' },
    ],
  },
  {
    id: 'window',
    label: 'What comes next',
    object: 'the window',
    anchor: [3.62, 2.62, -3.9] as Vec3,
    kicker: 'Where this is going',
    mesh: 'window',
    camera: { position: [3.62, 1.8, -1.85], target: [3.62, 1.4, -3.95] },
    body: [
      'Deepening the technical foundation in AI and ML, and pointing it at problems that are worth the effort.',
      'Right now that means the intersection of AI and optimization — particularly diffusion models — and what both look like applied to healthcare and manufacturing.',
    ],
  },
  {
    id: 'football',
    label: 'Off the clock',
    object: 'the ball',
    anchor: [2.25, 0.66, -2.6] as Vec3,
    kicker: 'Toluca FC, Bayern, and a decent pair of gloves',
    mesh: 'football',
    camera: { position: [2.25, 1.05, -1.5], target: [2.25, 0.05, -2.9] },
    body: [
      'Goalkeeper, and a decent one. Toluca FC first, Bayern Munich second.',
      'Football is also how I keep up with home from four thousand kilometres away.',
    ],
  },
]

export const hotspotById = (id: string | null): Hotspot | undefined =>
  id ? hotspots.find((h) => h.id === id) : undefined
