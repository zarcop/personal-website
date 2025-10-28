export default function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl py-8">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <div className="prose dark:prose-invert">
        {children}
      </div>
    </section>
  )
}
