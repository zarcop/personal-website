import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Elias Zarco Gonzalez — Portfolio',
  description: 'Builder + Analyst. SWE, Data, Quant, Product.',
  openGraph: { title: 'Elias Zarco Gonzalez', images: ['/images/profile/IMG_4026 2.png'] },
  metadataBase: new URL('https://eliaszarco.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="px-6 sm:px-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
