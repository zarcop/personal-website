import { Keyword } from '@/components/Narrative'

/**
 * Turns `'I came to [[isye|Georgia Tech]] for...'` into prose with an
 * expandable keyword in the middle. Anything that isn't [[id|Label]] is
 * passed through as plain text.
 */
export function renderProse(text: string): React.ReactNode[] {
  // built per call: a shared /g regex would carry lastIndex between renders
  const pattern = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    const [, id, label] = match
    nodes.push(
      <Keyword key={`${id}-${match.index}`} id={id}>
        {label}
      </Keyword>,
    )
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

/** Keyword ids referenced by a line of prose, in the order they appear. */
export function keywordIds(text: string): string[] {
  const pattern = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
  const ids: string[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text)) !== null) ids.push(match[1])
  return ids
}
