/**
 * Flags copy that is still a placeholder. Renders only outside production, so
 * it can never ship — note that placeholder *text* still ships, so this is a
 * reminder, not a guard.
 */
export default function DraftBadge({ note }: { note: string }) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <span className="my-2 inline-flex items-start gap-2 rounded-md border border-dashed border-accent/50 bg-accent/5 px-2 py-1 font-mono text-2xs uppercase tracking-label text-accent">
      <span aria-hidden>✎</span>
      <span className="normal-case tracking-normal">{note}</span>
    </span>
  )
}
