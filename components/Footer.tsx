export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto max-w-5xl py-8 px-6 text-sm opacity-70">
        © {new Date().getFullYear()} Elias Zarco Gonzalez · Built with Next.js
      </div>
    </footer>
  )
}
