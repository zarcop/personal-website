#!/usr/bin/env node
/**
 * Re-writes the prop manifest whenever a .glb lands in public/models.
 *
 * Without this, `gen-prop-manifest.mjs` only runs at the start of `npm run dev`,
 * so a Blender export made while the dev server is already up does nothing until
 * you restart it — which looks exactly like a broken model. Run this in a second
 * terminal and an export shows up in the browser on its own.
 */
import { mkdirSync, watch } from 'node:fs'
import { spawnSync } from 'node:child_process'

const DIR = 'public/models'
const GENERATOR = 'scripts/gen-prop-manifest.mjs'

mkdirSync(DIR, { recursive: true })

const regenerate = () => spawnSync(process.execPath, [GENERATOR], { stdio: 'inherit' })

regenerate()
console.log(`  watching ${DIR}/ — export from Blender and the room reloads itself`)

let pending
watch(DIR, (_event, file) => {
  if (file && !file.toLowerCase().endsWith('.glb')) return
  // Blender writes the file in pieces; regenerating on the first event would
  // read a half-written export
  clearTimeout(pending)
  pending = setTimeout(regenerate, 300)
})
