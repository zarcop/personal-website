'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/lab', label: 'Extra' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-4 px-6">
        <Link href="/" className="font-mono text-sm">elias.dev</Link>
        <div className="flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm transition-opacity hover:opacity-100 ${pathname === l.href ? 'opacity-100' : 'opacity-70'}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
