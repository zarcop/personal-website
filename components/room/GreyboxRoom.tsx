'use client'

import Interactable from '@/components/room/Interactable'
import Prop from '@/components/room/Prop'
import Monitor from '@/components/room/props/Monitor'
import MapFrame from '@/components/room/props/MapFrame'
import Bookshelf from '@/components/room/props/Bookshelf'
import Football from '@/components/room/props/Football'
import { hotspots } from '@/data/room'

/**
 * The room. Walls and floor are still placeholder (M2c); the four props are
 * code-authored low-poly stand-ins wrapped in <Prop>, so each one is replaced
 * automatically the moment a matching .glb lands in public/models/.
 *
 * Positions live here rather than in the prop components, so a modelled prop
 * authored at the world origin drops straight in.
 */

const SHELL = '#d9d3c9'

/** Shared hover/active tint, so every hotspot reads as one system. */
function tint(hovered: boolean, active: boolean, base: string) {
  if (active) return '#c2703c'
  if (hovered) return '#cf8a5c'
  return base
}

const PLACEMENT: Record<string, { position: [number, number, number]; rotation?: [number, number, number] }> = {
  monitor: { position: [-1.1, 1.3, -3.6] },
  map: { position: [2.1, 1.9, -3.95] },
  bookshelf: { position: [-3.7, 1.0, 0.2] },
  football: { position: [2.6, 0.26, 1.2] },
}

export default function GreyboxRoom() {
  return (
    <group>
      {/* ——— shell: still placeholder until M2c ——— */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>
      <mesh position={[0, 1.5, -4]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>
      <mesh position={[-4, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>

      {/* ——— desk: not a hotspot, just furniture ——— */}
      <mesh position={[-1.1, 0.74, -3.5]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.06, 0.9]} />
        <meshStandardMaterial color="#b0a596" roughness={0.8} />
      </mesh>
      {[-2.1, -0.1].map((x) => (
        <mesh key={x} position={[x, 0.37, -3.5]} castShadow>
          <boxGeometry args={[0.07, 0.74, 0.07]} />
          <meshStandardMaterial color="#9d9284" roughness={0.8} />
        </mesh>
      ))}

      {/* ——— hotspots ——— */}
      {hotspots.map((hotspot) => {
        const place = PLACEMENT[hotspot.mesh]
        if (!place) return null

        return (
          <group key={hotspot.id} position={place.position} rotation={place.rotation}>
            <Interactable id={hotspot.id}>
              {({ hovered, active }) => (
                <group name={hotspot.mesh}>
                  <Prop name={hotspot.mesh}>
                    {hotspot.mesh === 'monitor' && (
                      <Monitor accent={tint(hovered, active, '#1d4a5c')} />
                    )}
                    {hotspot.mesh === 'map' && (
                      <MapFrame accent={tint(hovered, active, '#6b5540')} />
                    )}
                    {hotspot.mesh === 'bookshelf' && (
                      <Bookshelf accent={tint(hovered, active, '#8a7d6b')} />
                    )}
                    {hotspot.mesh === 'football' && (
                      <Football accent={tint(hovered, active, '#efe9df')} />
                    )}
                  </Prop>
                </group>
              )}
            </Interactable>
          </group>
        )
      })}
    </group>
  )
}
