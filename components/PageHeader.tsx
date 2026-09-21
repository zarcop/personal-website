export default function PageHeader({
  title,
  lead,
}: {
  title: string
  lead?: string
}) {
  return (
    <header className="mb-14 animate-rise">
      <h1 className="text-[1.75rem] font-semibold leading-none tracking-tight">{title}</h1>
      {lead && <p className="mt-4 text-[1.0625rem] leading-[1.75] text-muted">{lead}</p>}
    </header>
  )
}
