#!/usr/bin/env node
/** Lists everything in data/about.ts that still needs your words. */
import { readFileSync } from 'node:fs'

const FILE = 'data/about.ts'
const lines = readFileSync(FILE, 'utf8').split('\n')

const todos = []
const placeholders = []

lines.forEach((line, i) => {
  const lineNo = i + 1
  if (line.trim().startsWith('*') || line.trim().startsWith('//')) return

  const todo = line.match(/todo:\s*['"`](.+?)['"`]/)
  if (todo) todos.push({ lineNo, text: todo[1] })

  // {country} and [Placeholder …] style gaps, but not [[id|Label]] keywords
  for (const m of line.matchAll(/\{[a-z][^}]*\}|\[[A-Z][^\]]*\]/g)) {
    placeholders.push({ lineNo, text: m[0].slice(0, 72) })
  }
})

const bar = '─'.repeat(64)

if (todos.length) {
  console.log(`\n${bar}\n  ${todos.length} thing(s) still to write\n${bar}`)
  for (const t of todos) console.log(`  ${FILE}:${t.lineNo}\n    ${t.text}\n`)
}

if (placeholders.length) {
  console.log(`${bar}\n  ${placeholders.length} placeholder(s) that would ship as-is\n${bar}`)
  for (const p of placeholders) console.log(`  ${FILE}:${p.lineNo}  ${p.text}`)
  console.log()
}

if (!todos.length && !placeholders.length) {
  console.log('\n  No placeholders left in data/about.ts — the page is fully yours.\n')
  process.exit(0)
}

process.exit(1)
