import type { AboutBlock } from '@/data/about'
import { keywordIds } from '@/lib/prose'

/**
 * Runs at module scope in the home page, so it executes during `next build`.
 * A keyword whose id has no matching detail would otherwise be a button that
 * silently does nothing — the kind of bug you only find by clicking every word.
 */
export function validateAbout(blocks: AboutBlock[]): void {
  const problems: string[] = []

  blocks.forEach((block, index) => {
    const used = keywordIds(block.body)
    const defined = Object.keys(block.details ?? {})

    for (const id of used) {
      if (!defined.includes(id)) {
        problems.push(
          `Block ${index + 1}: [[${id}|…]] has no matching entry in its \`details\`. ` +
            (defined.length ? `Available: ${defined.join(', ')}.` : 'That block defines none.'),
        )
      }
    }

    for (const id of defined) {
      if (!used.includes(id)) {
        problems.push(
          `Block ${index + 1}: \`details.${id}\` is never referenced. ` +
            `Add [[${id}|some words]] to its \`body\`, or delete the detail.`,
        )
      }
    }
  })

  if (problems.length) {
    throw new Error(
      `data/about.ts has ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`,
    )
  }
}
