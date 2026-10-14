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
  position: [0.5, 1.5, -1.0] as Vec3,
  target: [0.5, 1.15, -3.8] as Vec3,
}

/** How far the pointer nudges the camera, in metres. Small on purpose. */
export const PARALLAX = 0.28

export const hotspots: Hotspot[] = [
  {
    id: 'desk',
    label: 'Brief overview',
    object: 'the desk',
    anchor: [0.35, 1.82, -3.5] as Vec3,
    kicker: 'Who I am, and where to find me',
    mesh: 'monitor',
    surface: true,
    // nearly flat-on: the screen carries real DOM, and an angle would soften it
    camera: { position: [0.35, 1.44, -2.28], target: [0.35, 1.355, -3.6] },
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
    id: 'resume',
    label: 'The one-pager',
    object: 'the résumé',
    anchor: [1.35, 0.95, -3.35] as Vec3,
    kicker: 'One page, the paper version',
    mesh: 'resume',
    camera: { position: [1.35, 1.4, -2.3], target: [1.35, 0.5, -3.3] },
    body: [
      'The one-page version, if you would rather skim than scroll.',
    ],
    links: [
      {
        label: 'Download PDF',
        href: 'https://drive.google.com/file/d/1W8xRdizQGlmWFm8Wq9meKZAKcCrNzWpX/view?usp=sharing',
        external: true,
      },
      { label: 'Or read the long version', href: '/' },
    ],
  },
  {
    id: 'bookcase',
    label: 'What I read',
    object: 'the bookcase',
    anchor: [-2.45, 2.18, -3.6] as Vec3,
    kicker: 'Economics, history, and what I am reading',
    mesh: 'bookcase',
    camera: { position: [-2.45, 1.45, -0.2], target: [-2.45, 0.85, -3.7] },
    todo: 'Needs the actual shelf: 4-6 books with a line each on why they stuck.',
    body: [
      'Mostly economics and history, with a bias toward Latin America.',
      '[Placeholder — the real books go here, with a line each.]',
    ],
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
    links: [{ label: 'The longer story', href: '/' }],
  },
  {
    id: 'whiteboard',
    label: 'Achievements',
    object: 'the whiteboard',
    anchor: [2.1, 2.5, -3.9] as Vec3,
    kicker: 'What I have actually shipped',
    mesh: 'whiteboard',
    surface: true,
    // flat-on for the same reason as the desk
    camera: { position: [2.1, 2.0, -2.62], target: [2.1, 1.93, -3.95] },
    body: [
      'Google, LearnX — agentic AI pipelines and interactive TypeScript templates. Cut Gemini workflow latency by about 95%.',
      'HSBC Mexico — AI Project Manager in the Transformation Department, implementing AI rather than building it.',
      'GTSF — quantitative analyst on a student-managed fund. ARIMA, SARIMA-GARCH and XGBoost against commodities volatility.',
    ],
    links: [
      { label: 'Projects', href: '/projects' },
      { label: 'Experience', href: '/experience' },
    ],
  },
  {
    id: 'window',
    label: 'What comes next',
    object: 'the window',
    anchor: [3.45, 2.62, -3.9] as Vec3,
    kicker: 'Where this is going',
    mesh: 'window',
    camera: { position: [3.45, 1.8, -1.85], target: [3.45, 1.4, -3.95] },
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
