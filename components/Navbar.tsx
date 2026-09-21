'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

const links = [
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-reading items-center justify-between px-6 py-5 sm:px-0">
        <Link
          href="/"
          className="font-mono text-2xs uppercase tracking-label text-faint transition-colors duration-200 hover:text-foreground"
        >
          EZ
        </Link>

        <div className="flex items-center gap-5">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'font-mono text-2xs uppercase tracking-label transition-colors duration-200',
                  active ? 'text-foreground' : 'text-faint hover:text-foreground',
                ].join(' ')}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
