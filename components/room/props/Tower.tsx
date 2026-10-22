'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { ColorRepresentation, MeshBasicMaterial } from 'three'

import { useRoom } from '@/store/room'

/**
 * The machine under the desk. It stands for the projects: the point of a tower
 * rather than a folder or a shelf is that projects are things that run, not
 * things that were handed in and filed away.
 *
 * Origin at the centre of the case, so FLOOR_DROP is what puts its feet on the
 * floor — same arrangement as the monitor's BASE_DROP, and for the same reason:
 * resizing the case should not silently sink it into the ground.
 */

const CASE_W = 0.21
const CASE_H = 0.48
const CASE_D = 0.45
/** Case centre down to the underside of the feet. */
export const FLOOR_DROP = 0.255

/** Just in front of the case's front face. */
const Z = CASE_D / 2 + 0.002

const LED_ON = '#9ce8b4'
const LED_OFF = '#1d3326'

export default function Tower({ accent }: { accent: ColorRepresentation }) {
  const reducedMotion = useRoom((s) => s.reducedMotion)
  const led = useRef<MeshBasicMaterial>(null)

  useFrame((state) => {
    if (!led.current) return
    if (reducedMotion) {
      led.current.color.set(LED_ON)
      return
    }
    // two detuned sines, so the flicker never settles into a rhythm you can
    // predict — a drive light that blinks on the beat reads as a decoration
    const t = state.clock.elapsedTime
    const busy = Math.sin(t * 7.3) + Math.sin(t * 3.1) > 0.45
    led.current.color.set(busy ? LED_ON : LED_OFF)
  })

  return (
    <group>
      {/*
        It lives in the desk's shadow, which at night means it renders as a black
        slab however light the material is. So the case carries a little emissive
        of its own and the face is unlit — a machine that is switched on is a
        truthful reason for both, and it is the only way this reads as a computer
        rather than a box.
      */}
      <RoundedBox args={[CASE_W, CASE_H, CASE_D]} radius={0.008} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial
          color={accent}
          roughness={0.45}
          metalness={0.35}
          emissive="#2b3038"
          emissiveIntensity={0.55}
        />
      </RoundedBox>

      {/* front panel, inset so the case reads as having a face */}
      <mesh position={[0, 0, Z]}>
        <planeGeometry args={[CASE_W - 0.03, CASE_H - 0.03]} />
        <meshBasicMaterial color="#2f353d" />
      </mesh>

      {/* intake grille */}
      {[0.17, 0.145, 0.12, 0.095, 0.07, 0.045].map((y) => (
        <mesh key={y} position={[-0.015, y, Z + 0.001]}>
          <planeGeometry args={[0.12, 0.007]} />
          <meshBasicMaterial color="#13161a" />
        </mesh>
      ))}

      {/* Exhaust on the top face. The pose for this hotspot looks down at the
          case from in front of the desk — a floor-standing object cannot ride
          above the overlay panel any other way — so the top is on show and a
          blank lid would waste the shot. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, CASE_H / 2 + 0.002, 0]}>
        <planeGeometry args={[CASE_W - 0.04, CASE_D - 0.06]} />
        <meshBasicMaterial color="#272c33" />
      </mesh>
      {[-0.14, -0.105, -0.07, -0.035, 0, 0.035, 0.07, 0.105, 0.14].map((z) => (
        <mesh
          key={z}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, CASE_H / 2 + 0.003, z]}
        >
          <planeGeometry args={[CASE_W - 0.07, 0.009]} />
          <meshBasicMaterial color="#111419" />
        </mesh>
      ))}

      {/* a lit edge, so it reads as switched on from across the room */}
      <mesh position={[-0.078, -0.03, Z + 0.001]}>
        <planeGeometry args={[0.009, 0.3]} />
        <meshBasicMaterial color="#c2703c" />
      </mesh>
      {/* and a sliver of it on the top edge, visible from the pose above */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.078, CASE_H / 2 + 0.003, 0.12]}>
        <planeGeometry args={[0.009, 0.16]} />
        <meshBasicMaterial color="#c2703c" />
      </mesh>

      {/* power button */}
      <mesh position={[0.06, 0.17, Z + 0.001]}>
        <circleGeometry args={[0.014, 16]} />
        <meshStandardMaterial color="#2b2e33" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.06, 0.17, Z + 0.002]}>
        <circleGeometry args={[0.006, 12]} />
        <meshBasicMaterial color="#a8d6e6" />
      </mesh>

      {/* drive light */}
      <mesh position={[0.06, 0.13, Z + 0.002]}>
        <circleGeometry args={[0.0055, 12]} />
        <meshBasicMaterial ref={led} color={LED_ON} />
      </mesh>

      {/* a drive bay and a couple of ports, to break up the face */}
      <mesh position={[0, -0.09, Z + 0.001]}>
        <planeGeometry args={[0.15, 0.022]} />
        <meshBasicMaterial color="#191d22" />
      </mesh>
      {[-0.035, 0.0, 0.035].map((x) => (
        <mesh key={x} position={[x, -0.14, Z + 0.001]}>
          <planeGeometry args={[0.018, 0.009]} />
          <meshBasicMaterial color="#13161a" />
        </mesh>
      ))}

      {/* the light it throws on the floor around it — the detail that says the
          machine is running, rather than stored */}
      <pointLight position={[0, -0.08, 0.28]} distance={0.8} decay={2} intensity={0.75} color="#c2703c" />

      {/* feet */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}${sz}`}
            position={[sx * 0.072, -CASE_H / 2 - 0.0075, sz * 0.175]}
            castShadow
          >
            <boxGeometry args={[0.038, 0.015, 0.038]} />
            <meshStandardMaterial color="#1a1c20" roughness={0.9} />
          </mesh>
        )),
      )}
    </group>
  )
}
