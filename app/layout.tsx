import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://eliaszarco.com'),
  title: {
    default: 'Elias Zarco',
    template: '%s — Elias Zarco',
  },
  description:
    'Industrial engineer from Toluca, Mexico. Industrial & Systems Engineering and CS at Georgia Tech, working at the intersection of AI and optimization.',
  openGraph: {
    title: 'Elias Zarco',
    description:
      'Industrial engineer from Toluca, Mexico. Industrial & Systems Engineering and CS at Georgia Tech, working at the intersection of AI and optimization.',
    url: 'https://eliaszarco.com',
    siteName: 'Elias Zarco',
    images: ['/images/profile/professional_portrait.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/images/website-header/page-icon.jpg',
    shortcut: '/images/website-header/page-icon.jpg',
    apple: '/images/website-header/page-icon.jpg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-label"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
