export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 className="font-mono text-2xs uppercase tracking-label text-faint">{children}</h2>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  )
}
