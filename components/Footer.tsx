export default function Footer() {
  return (
    <footer className="mx-auto mt-28 max-w-reading px-6 pb-16 sm:px-0">
      <div className="border-t border-line pt-6">
        <p className="font-mono text-2xs uppercase tracking-label text-faint">
          © {new Date().getFullYear()} Elias Zarco Gonzalez
        </p>
      </div>
    </footer>
  )
}
