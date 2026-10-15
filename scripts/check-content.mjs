#!/usr/bin/env node
/** Lists everything in data/about.ts that still needs your words. */
import { readFileSync } from 'node:fs'

const FILES = ['data/about.ts', 'data/room.ts', 'data/socials.ts']

const todos = []
const placeholders = []

for (const FILE of FILES) {
  readFileSync(FILE, 'utf8').split('\n').forEach((line, i) => {
  const lineNo = i + 1
  const where = `${FILE}:${lineNo}`
  if (line.trim().startsWith('*') || line.trim().startsWith('//')) return

  const todo = line.match(/todo:\s*['"`](.+?)['"`]/)
  if (todo) todos.push({ where, text: todo[1] })

  // {country} and [Placeholder …] style gaps, but not [[id|Label]] keywords
  // and not ${template} interpolation, which is code rather than a gap
  for (const m of line.matchAll(/(?<!\$)\{[a-z][^}]*\}|\[[A-Z][^\]]*\]/g)) {
    placeholders.push({ where, text: m[0].slice(0, 72) })
  }
  })
}

const bar = '─'.repeat(64)

if (todos.length) {
  console.log(`\n${bar}\n  ${todos.length} thing(s) still to write\n${bar}`)
  for (const t of todos) console.log(`  ${t.where}\n    ${t.text}\n`)
}

if (placeholders.length) {
  console.log(`${bar}\n  ${placeholders.length} placeholder(s) that would ship as-is\n${bar}`)
  for (const p of placeholders) console.log(`  ${p.where}  ${p.text}`)
  console.log()
}

if (!todos.length && !placeholders.length) {
  console.log('\n  No placeholders left — the copy is fully yours.\n')
  process.exit(0)
}

process.exit(1)
