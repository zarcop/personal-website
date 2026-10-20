'use client'

import type { ColorRepresentation } from 'three'

import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import { books as featuredBooks } from '@/data/books'

// Authored facing +Z, like every other prop, so a Blender model drops in
// without having to be built sideways.
const W = 1.6 // width along the wall (x)
const H = 2.0 // height (y)
const D = 0.45 // depth, into the wall (z)
const PANEL = 0.04
const SHELVES = 4

const BOOK_COLOURS = ['#8a4b32', '#3f5b52', '#6b5540', '#2b3a4a', '#7a6a4f', '#5a3b46']

/** The shelf at eye level from the bookcase pose, where the four real books stand. */
const FEATURED_SHELF = 2
const FEATURED_W = 0.07
const FEATURED_H = 0.36
const GILT = '#c9a45a'

/** Deterministic pseudo-random so the shelf looks the same on every render. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

type Book = { x: number; width: number; height: number; colour: string; lean: number }

function shelfBooks(shelfIndex: number): Book[] {
  const books: Book[] = []
  // the featured shelf keeps its left end clear for the four real books
  let x = -W / 2 + 0.1 + (shelfIndex === FEATURED_SHELF ? FEATURED_W * 4 + 0.06 : 0)
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
            {shelfIndex === FEATURED_SHELF &&
              featuredBooks.map((book, i) => {
                const x = -W / 2 + 0.1 + FEATURED_W / 2 + i * (FEATURED_W + 0.006)
                const y = shelfY - gap + 0.0125 + FEATURED_H / 2
                return (
                  <group key={book.id} position={[x, y, 0.04]}>
                    <mesh castShadow>
                      <boxGeometry args={[FEATURED_W, FEATURED_H, 0.24]} />
                      <meshStandardMaterial color={book.cloth} roughness={0.7} />
                    </mesh>
                    {/* gilt bands across the spine, top and bottom */}
                    {[FEATURED_H / 2 - 0.035, -FEATURED_H / 2 + 0.035].map((band) => (
                      <mesh key={band} position={[0, band, 0.1205]}>
                        <planeGeometry args={[FEATURED_W * 0.86, 0.012]} />
                        <meshStandardMaterial color={GILT} metalness={0.7} roughness={0.35} />
                      </mesh>
                    ))}
                  </group>
                )
              })}
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
