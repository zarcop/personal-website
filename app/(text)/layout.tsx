import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/**
 * Chrome for the written site. Lifted out of the root layout so the room route
 * can render full-bleed without a nav bar floating over the canvas.
 */
export default function TextLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-label"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
