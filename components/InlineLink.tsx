import Link from 'next/link'

export default function InlineLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  const className =
    'font-medium text-foreground underline decoration-faint decoration-dotted decoration-1 underline-offset-[5px] transition-colors duration-200 hover:decoration-accent hover:decoration-solid'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
