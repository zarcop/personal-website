import { notFound } from 'next/navigation'
import Section from '@/components/Section'
import { projects } from '@/data/projects'

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })) }

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.slug === params.slug)
  if (!p) return notFound()
  return (
    <Section title={p.title}>
      {p.cover && <img src={p.cover} alt="" className="mb-6 rounded-lg" />}
      <p className="opacity-90">{p.summary}</p>
      {p.highlights && (
        <ul className="mt-4 list-disc pl-5">
          {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}
      {p.links && (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map(l => (
            <a key={l.href} href={l.href} className="underline" target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
      )}
      <div className="mt-8 text-sm opacity-70">Tags: {p.tags.join(', ')}</div>
    </Section>
  )
}
