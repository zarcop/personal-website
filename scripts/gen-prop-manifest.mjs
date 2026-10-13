#!/usr/bin/env node
/**
 * Writes data/props.generated.ts from whatever .glb files sit in public/models.
 *
 * This is what makes a Blender export a drop-in: put `monitor.glb` in
 * public/models and the room renders it instead of the code-authored prop, with
 * no source edit. Runs automatically before `npm run dev` and `npm run build`.
 */
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const MODELS_DIR = 'public/models'
const OUT = 'data/props.generated.ts'

mkdirSync(MODELS_DIR, { recursive: true })

const models = readdirSync(MODELS_DIR)
  .filter((f) => f.toLowerCase().endsWith('.glb'))
  .sort()

const entries = models
  .map((file) => `  '${file.replace(/\.glb$/i, '')}': '/models/${file}',`)
  .join('\n')

const body = `// GENERATED FILE — do not edit.
// Written by scripts/gen-prop-manifest.mjs from the contents of ${MODELS_DIR}/.
// Drop a .glb in there and it appears here on the next dev/build run.

export const propModels: Record<string, string> = {
${entries}
}
`

// only rewrite when it actually changed, so dev doesn't rebuild in a loop
const previous = existsSync(OUT) ? readFileSync(OUT, 'utf8') : ''
if (previous !== body) {
  writeFileSync(OUT, body)
  console.log(
    models.length
      ? `  props: ${models.length} model(s) -> ${models.join(', ')}`
      : '  props: no .glb files yet, using code-authored props',
  )
}
