'use client'

import type { ColorRepresentation } from 'three'

import { RoundedBox } from '@react-three/drei'
import type { Vec3 } from '@/lib/types'

/**
 * Origin sits at the centre of the screen body, so the stand hangs below into
 * local -Y and reaches the desk. Room.tsx places it using BASE_DROP rather than
 * a hand-tuned Y, so growing the panel cannot sink the base into the desk again.
 *
 * Every edge is bevelled. Nothing real has a perfectly sharp 90° corner, so a
 * couple of millimetres of radius is most of what separates "modelled" from
 * "primitive" at this scale.
 *
 * What is painted on the screen deliberately mirrors the DOM that mounts on top
 * of it when the desk is focused (components/room/surfaces/desktop/DesktopOS): same
 * browser window in the same place, same dock along the bottom. The swap from
 * painted to live should read as the screen coming into focus, not as one
 * picture being replaced by a different one.
 */

const BODY_W = 1.62
const BODY_H = 1.0

export const SCREEN_W = 1.5
export const SCREEN_H = 0.88
/** The screen is not centred in the body — monitors have a chin. */
export const SCREEN_Y = 0.03
/** Where the live DOM surface mounts, relative to the monitor's origin. */
export const SCREEN_ANCHOR: Vec3 = [0, SCREEN_Y, 0.034]
/** Screen centre down to the underside of the base, for placing it on a desk. */
export const BASE_DROP = 0.705

const SCREEN = '#10323f'
/** Everything painted on the screen sits just in front of it. */
const Z = 0.0335

type Rect = { x: number; y: number; w: number; h: number; c: string }

function Rects({ rects, z = Z }: { rects: Rect[]; z?: number }) {
  return (
    <>
      {rects.map((r, i) => (
        <mesh key={i} position={[r.x, SCREEN_Y + r.y, z]}>
          <planeGeometry args={[r.w, r.h]} />
          <meshBasicMaterial color={r.c} />
        </mesh>
      ))}
    </>
  )
}

export default function Monitor({ accent, playing }: { accent: ColorRepresentation; playing?: boolean }) {
  // the browser window, painted
  const chrome: Rect[] = [
    { x: 0, y: 0.06, w: 1.3, h: 0.66, c: '#f4f1ec' },
    { x: 0, y: 0.3525, w: 1.3, h: 0.075, c: '#e3ddd4' },
    { x: 0.03, y: 0.3525, w: 0.98, h: 0.038, c: '#f7f5f1' },
    { x: -0.44, y: 0.3525, w: 0.3, h: 0.052, c: '#f7f5f1' },
  ]

  const dots: { x: number; c: string }[] = [
    { x: -0.615, c: '#e06c5a' },
    { x: -0.585, c: '#e0b45a' },
    { x: -0.555, c: '#7fb86b' },
  ]

  // the copy inside it, as weight rather than letters
  const text: Rect[] = [
    { x: -0.44, y: 0.265, w: 0.3, h: 0.028, c: '#2a2724' },
    { x: -0.5, y: 0.225, w: 0.18, h: 0.012, c: '#a09a92' },
    { x: -0.355, y: 0.18, w: 0.47, h: 0.013, c: '#6d6760' },
    { x: -0.315, y: 0.148, w: 0.55, h: 0.013, c: '#6d6760' },
    { x: -0.4, y: 0.116, w: 0.38, h: 0.013, c: '#6d6760' },
    { x: -0.335, y: 0.07, w: 0.51, h: 0.013, c: '#6d6760' },
    { x: -0.375, y: 0.038, w: 0.43, h: 0.013, c: '#6d6760' },
    { x: -0.455, y: -0.012, w: 0.27, h: 0.013, c: '#a8552a' },
    { x: -0.15, y: -0.012, w: 0.21, h: 0.013, c: '#a8552a' },
  ]

  // the dock, matching the apps on the live desktop
  const dockY = -0.345
  const apps = ['#2f3338', '#2a5c86', '#1f2a36', playing ? '#2f7a5a' : '#2c4b43']

  return (
    <group>
      {/* bezel — this is what carries the hover/active tint */}
      <RoundedBox args={[BODY_W, BODY_H, 0.06]} radius={0.014} smoothness={3} castShadow>
        <meshStandardMaterial color={accent} roughness={0.55} metalness={0.15} />
      </RoundedBox>

      {/* screen — emissive so it stays lit when the room goes dark at night */}
      <mesh position={[0, SCREEN_Y, 0.032]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial
          color={SCREEN}
          roughness={0.25}
          emissive={SCREEN}
          emissiveIntensity={0.55}
        />
      </mesh>

      <Rects rects={chrome} />
      {dots.map((dot) => (
        <mesh key={dot.x} position={[dot.x, SCREEN_Y + 0.3525, Z + 0.0005]}>
          <circleGeometry args={[0.009, 12]} />
          <meshBasicMaterial color={dot.c} />
        </mesh>
      ))}
      <Rects rects={text} z={Z + 0.0005} />

      {/* dock */}
      <mesh position={[0, SCREEN_Y + dockY, Z]}>
        <planeGeometry args={[0.62, 0.12]} />
        <meshBasicMaterial color="#143a48" />
      </mesh>
      {apps.map((colour, i) => (
        <mesh key={i} position={[-0.225 + i * 0.15, SCREEN_Y + dockY, Z + 0.0005]}>
          <planeGeometry args={[0.085, 0.085]} />
          <meshBasicMaterial color={colour} />
        </mesh>
      ))}

      {/* now playing, lit only when something actually is */}
      <mesh position={[0.52, SCREEN_Y + dockY, Z]}>
        <planeGeometry args={[0.34, 0.075]} />
        <meshBasicMaterial color={playing ? '#17414f' : '#123540'} />
      </mesh>
      <mesh position={[0.4, SCREEN_Y + dockY, Z + 0.0005]}>
        <circleGeometry args={[0.019, 14]} />
        <meshBasicMaterial color={playing ? '#c2703c' : '#2d5666'} />
      </mesh>
      {[0.2, 0.14].map((w, i) => (
        <mesh key={w} position={[0.46 + w / 2, SCREEN_Y + dockY + 0.016 - i * 0.03, Z + 0.0005]}>
          <planeGeometry args={[w, 0.011]} />
          <meshBasicMaterial color={playing ? '#8fc0d2' : '#3c6274'} />
        </mesh>
      ))}

      {/* neck */}
      <RoundedBox args={[0.11, 0.18, 0.07]} radius={0.015} smoothness={3} position={[0, -0.59, 0]} castShadow>
        <meshStandardMaterial color="#35353b" roughness={0.6} metalness={0.2} />
      </RoundedBox>

      {/* base */}
      <RoundedBox args={[0.46, 0.025, 0.24]} radius={0.01} smoothness={3} position={[0, -0.6925, 0]} castShadow>
        <meshStandardMaterial color="#35353b" roughness={0.6} metalness={0.2} />
      </RoundedBox>
    </group>
  )
}
