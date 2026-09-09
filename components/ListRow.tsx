import Link from 'next/link'

type ListRowProps = {
  href: string
  /** Left-hand mono column. Omit when the date genuinely isn't known. */
  meta?: string
  title: string
  description: string
  /** Renders an outbound glyph and opens in a new tab. */
  external?: boolean
}

export default function ListRow({ href, meta, title, description, external }: ListRowProps) {
  const outbound = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
    : {}

  return (
    <Link
      href={href}
      {...outbound}
      className="group -mx-3 grid grid-cols-[3.75rem_1fr_auto] items-baseline gap-x-4 rounded-md px-3 py-3 transition-colors duration-200 hover:bg-surface sm:grid-cols-[5rem_1fr_auto]"
    >
      <span className="font-mono text-2xs uppercase tracking-label text-faint">
        {meta ?? '—'}
      </span>

      <span className="min-w-0">
        <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{description}</span>
      </span>

      <span
        aria-hidden
        className="font-mono text-xs text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
      >
        {external ? '↗' : '→'}
      </span>
    </Link>
  )
}
