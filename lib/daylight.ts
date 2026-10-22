import { Color } from 'three'

/**
 * Lighting that follows the viewer's own clock, not Elias's.
 *
 * Safe to call from inside the canvas only: it reads local time, which differs
 * between server and client and would otherwise trip hydration. The canvas is
 * already client-only (`ssr: false`), so that holds.
 */

export type Daylight = {
  /** Scene background. */
  background: Color
  /** Key light. */
  keyColor: Color
  keyIntensity: number
  /** Cool bounce from the opposite side. */
  fillColor: Color
  fillIntensity: number
  ambient: number
  /** Sky seen through the window, light band then deeper band. */
  skyLow: Color
  skyHigh: Color
  /** Ground seen through the window. */
  ground: Color
  /** 0 at deep night, 1 at midday — for anything that wants a simple ramp. */
  brightness: number
  label: 'night' | 'dawn' | 'day' | 'dusk'
}

type Keyframe = {
  hour: number
  background: string
  key: string
  keyIntensity: number
  fill: string
  fillIntensity: number
  ambient: number
  skyLow: string
  skyHigh: string
  ground: string
  brightness: number
  label: Daylight['label']
}

// Ordered by hour. The last frame wraps round to the first.
// Night and day each HOLD across a plain keyframe rather than ramping straight
// from one to the other — without that, 2am renders a third of the way to dawn.
const KEYFRAMES: Keyframe[] = [
  {
    hour: 0,
    background: '#12141b',
    key: '#44527a',
    keyIntensity: 0.35,
    fill: '#1b2232',
    fillIntensity: 0.18,
    ambient: 0.3,
    skyLow: '#1b2438',
    skyHigh: '#0b1020',
    ground: '#141b2b',
    brightness: 0.05,
    label: 'night',
  },
  {
    hour: 5,
    background: '#12141b',
    key: '#44527a',
    keyIntensity: 0.35,
    fill: '#1b2232',
    fillIntensity: 0.18,
    ambient: 0.3,
    skyLow: '#1b2438',
    skyHigh: '#0b1020',
    ground: '#141b2b',
    brightness: 0.05,
    label: 'night',
  },
  {
    hour: 7,
    background: '#e6d3c2',
    key: '#ffb379',
    keyIntensity: 0.95,
    fill: '#6f7d9c',
    fillIntensity: 0.3,
    ambient: 0.55,
    skyLow: '#f5cda9',
    skyHigh: '#b89ec4',
    ground: '#8f9a84',
    brightness: 0.45,
    label: 'dawn',
  },
  {
    hour: 10,
    background: '#faf8f5',
    key: '#fff6ea',
    keyIntensity: 1.5,
    fill: '#bccadd',
    fillIntensity: 0.4,
    ambient: 0.75,
    skyLow: '#dceaf3',
    skyHigh: '#b9d5e7',
    ground: '#a2b79b',
    brightness: 0.95,
    label: 'day',
  },
  {
    hour: 16,
    background: '#faf8f5',
    key: '#ffffff',
    keyIntensity: 1.6,
    fill: '#c3d2e4',
    fillIntensity: 0.42,
    ambient: 0.8,
    skyLow: '#dcebf4',
    skyHigh: '#b2d1e6',
    ground: '#a2b79b',
    brightness: 1,
    label: 'day',
  },
  {
    hour: 19,
    background: '#efd9c9',
    key: '#ff9a56',
    keyIntensity: 1.05,
    fill: '#82899f',
    fillIntensity: 0.3,
    ambient: 0.58,
    skyLow: '#f6bb8c',
    skyHigh: '#9c7fa8',
    ground: '#8a9480',
    brightness: 0.4,
    label: 'dusk',
  },
  {
    hour: 21,
    background: '#1d1f29',
    key: '#5b6490',
    keyIntensity: 0.45,
    fill: '#232a3c',
    fillIntensity: 0.2,
    ambient: 0.34,
    skyLow: '#232e45',
    skyHigh: '#111728',
    ground: '#18202f',
    brightness: 0.1,
    label: 'night',
  },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function mix(a: string, b: string, t: number) {
  return new Color(a).lerp(new Color(b), t)
}

/** Hour as a float, so 14:30 is 14.5 and the ramp is smooth across the hour. */
export function localHour(now = new Date()): number {
  return now.getHours() + now.getMinutes() / 60
}

export function daylightAt(hour: number): Daylight {
  const h = ((hour % 24) + 24) % 24

  let from = KEYFRAMES[KEYFRAMES.length - 1]
  let to = KEYFRAMES[0]

  for (let i = 0; i < KEYFRAMES.length; i += 1) {
    const current = KEYFRAMES[i]
    const next = KEYFRAMES[(i + 1) % KEYFRAMES.length]
    const end = next.hour <= current.hour ? next.hour + 24 : next.hour
    if (h >= current.hour && h < end) {
      from = current
      to = next
      break
    }
  }

  // span handles the wrap from 22:00 round to 06:00
  const end = to.hour <= from.hour ? to.hour + 24 : to.hour
  const span = end - from.hour
  const position = h >= from.hour ? h - from.hour : h + 24 - from.hour
  const t = span === 0 ? 0 : Math.min(Math.max(position / span, 0), 1)

  return {
    background: mix(from.background, to.background, t),
    keyColor: mix(from.key, to.key, t),
    keyIntensity: lerp(from.keyIntensity, to.keyIntensity, t),
    fillColor: mix(from.fill, to.fill, t),
    fillIntensity: lerp(from.fillIntensity, to.fillIntensity, t),
    ambient: lerp(from.ambient, to.ambient, t),
    skyLow: mix(from.skyLow, to.skyLow, t),
    skyHigh: mix(from.skyHigh, to.skyHigh, t),
    ground: mix(from.ground, to.ground, t),
    brightness: lerp(from.brightness, to.brightness, t),
    label: t < 0.5 ? from.label : to.label,
  }
}
