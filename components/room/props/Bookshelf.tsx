'use client'

import type { ColorRepresentation } from 'three'

import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'

// Authored facing +Z, like every other prop, so a Blender model drops in
// without having to be built sideways.
const W = 1.6 // width along the wall (x)
const H = 2.0 // height (y)
const D = 0.45 // depth, into the wall (z)
const PANEL = 0.04
const SHELVES = 4

const BOOK_COLOURS = ['#8a4b32', '#3f5b52', '#6b5540', '#2b3a4a', '#7a6a4f', '#5a3b46']

/** Deterministic pseudo-random so the shelf looks the same on every render. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

type Book = { x: number; width: number; height: number; colour: string; lean: number }

function shelfBooks(shelfIndex: number): Book[] {
  const books: Book[] = []
  let x = -W / 2 + 0.1
  let i = 0

  while (x < W / 2 - 0.14) {
    const r = rand(shelfIndex * 31 + i)
    const width = 0.025 + r * 0.035
    const height = 0.22 + rand(shelfIndex * 71 + i) * 0.1
    // leave the odd gap so it reads as a used shelf rather than a solid block
    if (rand(shelfIndex * 17 + i) > 0.88) {
      x += 0.05
      i += 1
      continue
    }
    books.push({
      x: x + width / 2,
      width,
      height,
      colour: BOOK_COLOURS[Math.floor(rand(shelfIndex * 53 + i) * BOOK_COLOURS.length)],
      lean: rand(shelfIndex * 91 + i) > 0.93 ? 0.18 : 0,
    })
    x += width + 0.004
    i += 1
  }

  return books
}

/**
 * Carcass plus shelves plus books. The books are generated from a seeded
 * pseudo-random so the arrangement is stable across renders — a shelf that
 * reshuffles on every frame would be very distracting.
 */
export default function Bookshelf({ accent }: { accent: ColorRepresentation }) {
  const shelves = useMemo(
    () => Array.from({ length: SHELVES }, (_, i) => shelfBooks(i)),
    [],
  )

  const innerH = H - PANEL * 2
  const gap = innerH / SHELVES

  return (
    <group>
      {/* carcass: back panel against the wall, two side panels */}
      <mesh position={[0, 0, -D / 2 + PANEL / 2]} castShadow receiveShadow>
        <boxGeometry args={[W, H, PANEL]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      {[-W / 2 + PANEL / 2, W / 2 - PANEL / 2].map((x) => (
        <mesh key={x} position={[x, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[PANEL, H, D]} />
          <meshStandardMaterial color={accent} roughness={0.8} />
        </mesh>
      ))}

      {/* top and bottom */}
      {[H / 2 - PANEL / 2, -H / 2 + PANEL / 2].map((y) => (
        <RoundedBox key={y} args={[W, PANEL, D]} radius={0.006} smoothness={2} position={[0, y, 0]} castShadow>
          <meshStandardMaterial color={accent} roughness={0.8} />
        </RoundedBox>
      ))}

      {/* shelves + their books */}
      {shelves.map((books, shelfIndex) => {
        const shelfY = -H / 2 + PANEL + gap * (shelfIndex + 1)
        return (
          <group key={shelfIndex}>
            {shelfIndex < SHELVES - 1 && (
              <mesh position={[0, shelfY, 0]} castShadow receiveShadow>
                <boxGeometry args={[W - PANEL * 2, 0.025, D - PANEL]} />
                <meshStandardMaterial color={accent} roughness={0.8} />
              </mesh>
            )}
            {books.map((book, i) => (
              <mesh
                key={i}
                position={[book.x, shelfY - gap + 0.0125 + book.height / 2, 0.03]}
                rotation={[0, 0, book.lean]}
                castShadow
              >
                <boxGeometry args={[book.width, book.height, 0.2]} />
                <meshStandardMaterial color={book.colour} roughness={0.85} />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}
