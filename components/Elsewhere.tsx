'use client'

import { useEffect, useRef, useState } from 'react'

const EMAIL = 'eliaszarco@gmail.com'

const rowClass =
  'group grid grid-cols-[3.75rem_1fr_auto] items-baseline gap-x-4 py-2 text-left sm:grid-cols-[5rem_1fr_auto]'
const labelClass = 'font-mono text-2xs uppercase tracking-label text-faint'
const valueClass =
  'text-[0.9375rem] text-foreground underline decoration-line decoration-1 underline-offset-[5px] transition-colors duration-200 group-hover:decoration-accent'
const glyphClass =
  'font-mono text-xs text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100'

const links = [
  { label: 'GitHub', value: 'zarcop', href: 'https://github.com/zarcop' },
  { label: 'LinkedIn', value: 'eliaszarcog', href: 'https://linkedin.com/in/eliaszarcog' },
  {
    label: 'Resume',
    value: 'PDF',
    href: 'https://drive.google.com/file/d/1W8xRdizQGlmWFm8Wq9meKZAKcCrNzWpX/view?usp=sharing',
  },
]

export default function Elsewhere() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked (insecure context, denied permission) — the mailto
      // link below is still there, so fail quietly
    }
  }

  return (
    <div className="-mx-3 px-3">
      <div className={rowClass}>
        <span className={labelClass}>Email</span>
        <span className="min-w-0">
          <a href={`mailto:${EMAIL}`} className={valueClass}>
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="ml-3 font-mono text-2xs uppercase tracking-label text-faint transition-colors duration-200 hover:text-accent"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </span>
        <span aria-hidden className={glyphClass} />
      </div>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          <span className={labelClass}>{link.label}</span>
          <span className={`min-w-0 ${valueClass}`}>{link.value}</span>
          <span aria-hidden className={glyphClass}>
            ↗
          </span>
        </a>
      ))}
    </div>
  )
}
