'use client'

import Interactable from '@/components/room/Interactable'
import Prop from '@/components/room/Prop'
import Monitor from '@/components/room/props/Monitor'
import MapFrame from '@/components/room/props/MapFrame'
import Bookshelf from '@/components/room/props/Bookshelf'
import Football from '@/components/room/props/Football'
import Resume from '@/components/room/props/Resume'
import Whiteboard from '@/components/room/props/Whiteboard'
import Window from '@/components/room/props/Window'
import { hotspots } from '@/data/room'

/**
 * One wall, everything on it. The camera never goes behind, so the side returns
 * exist only to stop the wall reading as a floating panel at the edges of frame.
 *
 * Placement lives here rather than inside the prop components, so a prop modelled
 * at the world origin in Blender drops straight in.
 */

const WALL_Z = -4
const WALL = '#d6d0c6'
const FLOOR = '#c9c2b6'

/** Shared hover/active tint so every hotspot reads as one system. */
function tint(hovered: boolean, active: boolean, base: string) {
  if (active) return '#c2703c'
  if (hovered) return '#cf8a5c'
  return base
}

type Placement = { position: [number, number, number]; rotation?: [number, number, number] }

const PLACEMENT: Record<string, Placement> = {
  bookcase: { position: [-2.45, 1.0, WALL_Z + 0.24] },
  photo: { position: [-0.95, 2.0, WALL_Z + 0.05] },
  monitor: { position: [0.35, 1.3425, WALL_Z + 0.42] },
  resume: { position: [1.35, 0.805, WALL_Z + 0.52] },
  whiteboard: { position: [2.1, 1.92, WALL_Z + 0.05] },
  window: { position: [3.45, 1.72, WALL_Z + 0.06] },
  // clear of the desk leg, slightly forward so it reads as sitting in the room
  football: { position: [2.25, 0.26, WALL_Z + 1.35] },
}

export default function Room() {
  return (
    <group>
      {/* ——— floor ——— */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0, -1]} receiveShadow>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color={FLOOR} roughness={0.95} />
      </mesh>

      {/* a rug: the camera sees a lot of floor at this aspect, and bare floor
          reads as unfinished rather than minimal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.6, 0.004, WALL_Z + 2.3]} receiveShadow>
        <planeGeometry args={[5.4, 3.2]} />
        <meshStandardMaterial color="#b9ae9c" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.6, 0.006, WALL_Z + 2.3]} receiveShadow>
        <planeGeometry args={[5.0, 2.85]} />
        <meshStandardMaterial color="#c3b8a6" roughness={1} />
      </mesh>

      {/* ——— the wall: tall enough to run past the top of frame ——— */}
      <mesh position={[0.4, 2.4, WALL_Z]} receiveShadow>
        <planeGeometry args={[16, 5.6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* skirting, so wall and floor do not just butt together */}
      <mesh position={[0.3, 0.06, WALL_Z + 0.03]} receiveShadow>
        <boxGeometry args={[16, 0.12, 0.06]} />
        <meshStandardMaterial color="#c0b8ab" roughness={0.9} />
      </mesh>

      {/* ——— side returns: only there to stop the wall floating at frame edges ——— */}
      {[-6.4, 7.2].map((x) => (
        <mesh key={x} position={[x, 2.4, WALL_Z + 1.6]} rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[3.2, 5.6]} />
          <meshStandardMaterial color="#cdc6ba" roughness={0.95} />
        </mesh>
      ))}

      {/* ——— desk: furniture, not a hotspot ——— */}
      <mesh position={[0.6, 0.78, WALL_Z + 0.55]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.05, 1.0]} />
        <meshStandardMaterial color="#b3a794" roughness={0.75} />
      </mesh>
      {[-0.6, 1.8].map((x) => (
        <mesh key={x} position={[x, 0.39, WALL_Z + 0.55]} castShadow>
          <boxGeometry args={[0.07, 0.76, 0.9]} />
          <meshStandardMaterial color="#a0957f" roughness={0.8} />
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
                    {hotspot.mesh === 'monitor' && <Monitor accent={tint(hovered, active, '#1d4a5c')} />}
                    {hotspot.mesh === 'photo' && <MapFrame accent={tint(hovered, active, '#6b5540')} />}
                    {hotspot.mesh === 'bookcase' && <Bookshelf accent={tint(hovered, active, '#8a7d6b')} />}
                    {hotspot.mesh === 'football' && <Football accent={tint(hovered, active, '#efe9df')} />}
                    {hotspot.mesh === 'resume' && <Resume accent={tint(hovered, active, '#f6f3ee')} />}
                    {hotspot.mesh === 'whiteboard' && <Whiteboard accent={tint(hovered, active, '#8d8882')} />}
                    {hotspot.mesh === 'window' && <Window accent={tint(hovered, active, '#e6e1d8')} />}
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
