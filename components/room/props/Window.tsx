'use client'

import type { Daylight } from '@/lib/daylight'

/**
 * The brightest thing on the wall, on purpose — it pulls the eye and gives a
 * flat set some implied depth. "Outside" is a layered gradient rather than a
 * skybox: at this framing nobody can tell, and it costs nothing.
 *
 * The frame is four bars, not a box. A solid box would cover its own glass.
 *
 * The view planes sit only a few millimetres behind the frame, not inside the
 * reveal: the wall itself is opaque at WALL_Z, so anything further back than
 * that is simply hidden by it.
 */

const OUTER_W = 1.08
const OUTER_H = 1.55
const BAR = 0.1
const OPEN_W = OUTER_W - BAR * 2
const OPEN_H = OUTER_H - BAR * 2

export default function Window({ accent, daylight }: { accent: string; daylight: Daylight }) {
  return (
    <group>
      {/* ——— the view, set back behind the frame ——— */}
      <mesh position={[0, 0.18, -0.045]}>
        <planeGeometry args={[OPEN_W, OPEN_H * 0.76]} />
        <meshBasicMaterial color={daylight.skyLow} />
      </mesh>
      <mesh position={[0, 0.5, -0.044]}>
        <planeGeometry args={[OPEN_W, OPEN_H * 0.34]} />
        <meshBasicMaterial color={daylight.skyHigh} />
      </mesh>
      {/* a low treeline, so it reads as a view and not a lightbox */}
      <mesh position={[0, -0.47, -0.043]}>
        <planeGeometry args={[OPEN_W, OPEN_H * 0.27]} />
        <meshBasicMaterial color={daylight.ground} />
      </mesh>
      <mesh position={[0, -0.63, -0.042]}>
        <planeGeometry args={[OPEN_W, OPEN_H * 0.12]} />
        <meshBasicMaterial color={daylight.ground} />
      </mesh>

      {/* ——— frame: four bars ——— */}
      {[
        { pos: [0, (OUTER_H - BAR) / 2, 0], args: [OUTER_W, BAR, 0.12] },
        { pos: [0, -(OUTER_H - BAR) / 2, 0], args: [OUTER_W, BAR, 0.12] },
        { pos: [-(OUTER_W - BAR) / 2, 0, 0], args: [BAR, OPEN_H, 0.12] },
        { pos: [(OUTER_W - BAR) / 2, 0, 0], args: [BAR, OPEN_H, 0.12] },
      ].map((bar, i) => (
        <mesh key={i} position={bar.pos as [number, number, number]} castShadow>
          <boxGeometry args={bar.args as [number, number, number]} />
          <meshStandardMaterial color={accent} roughness={0.7} />
        </mesh>
      ))}

      {/* ——— mullions ——— */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[0.04, OPEN_H, 0.05]} />
        <meshStandardMaterial color={accent} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, -0.02]}>
        <boxGeometry args={[OPEN_W, 0.04, 0.05]} />
        <meshStandardMaterial color={accent} roughness={0.7} />
      </mesh>

      {/* ——— sill ——— */}
      <mesh position={[0, -(OUTER_H / 2) - 0.03, 0.06]} castShadow>
        <boxGeometry args={[OUTER_W + 0.14, 0.06, 0.2]} />
        <meshStandardMaterial color={accent} roughness={0.75} />
      </mesh>
    </group>
  )
}
