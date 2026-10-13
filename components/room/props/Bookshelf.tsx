'use client'

import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'

const W = 0.45 // depth, into the wall (x)
const H = 2.0 // height (y)
const D = 1.6 // width along the wall (z)
const PANEL = 0.04
const SHELVES = 4

const BOOK_COLOURS = ['#8a4b32', '#3f5b52', '#6b5540', '#2b3a4a', '#7a6a4f', '#5a3b46']

/** Deterministic pseudo-random so the shelf looks the same on every render. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

type Book = { z: number; width: number; height: number; colour: string; lean: number }

function shelfBooks(shelfIndex: number): Book[] {
  const books: Book[] = []
  let z = -D / 2 + 0.08
  let i = 0

  while (z < D / 2 - 0.12) {
    const r = rand(shelfIndex * 31 + i)
    const width = 0.025 + r * 0.035
    const height = 0.22 + rand(shelfIndex * 71 + i) * 0.1
    // leave the odd gap so it reads as a used shelf rather than a solid block
    if (rand(shelfIndex * 17 + i) > 0.88) {
      z += 0.05
      i += 1
      continue
    }
    books.push({
      z: z + width / 2,
      width,
      height,
      colour: BOOK_COLOURS[Math.floor(rand(shelfIndex * 53 + i) * BOOK_COLOURS.length)],
      lean: rand(shelfIndex * 91 + i) > 0.93 ? 0.18 : 0,
    })
    z += width + 0.004
    i += 1
  }

  return books
}

/**
 * Carcass plus shelves plus books. The books are generated from a seeded
 * pseudo-random so the arrangement is stable across renders — a shelf that
 * reshuffles on every frame would be very distracting.
 */
export default function Bookshelf({ accent }: { accent: string }) {
  const shelves = useMemo(
    () => Array.from({ length: SHELVES }, (_, i) => shelfBooks(i)),
    [],
  )

  const innerH = H - PANEL * 2
  const gap = innerH / SHELVES

  return (
    <group>
      {/* carcass: back and two sides */}
      <mesh position={[-W / 2 + PANEL / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[PANEL, H, D]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
      {[-D / 2 + PANEL / 2, D / 2 - PANEL / 2].map((z) => (
        <mesh key={z} position={[0, 0, z]} castShadow receiveShadow>
          <boxGeometry args={[W, H, PANEL]} />
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
                <boxGeometry args={[W - PANEL, 0.025, D - PANEL * 2]} />
                <meshStandardMaterial color={accent} roughness={0.8} />
              </mesh>
            )}
            {books.map((book, i) => (
              <mesh
                key={i}
                position={[0.03, shelfY - gap + 0.0125 + book.height / 2, book.z]}
                rotation={[book.lean, 0, 0]}
                castShadow
              >
                <boxGeometry args={[0.2, book.height, book.width]} />
                <meshStandardMaterial color={book.colour} roughness={0.85} />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}
