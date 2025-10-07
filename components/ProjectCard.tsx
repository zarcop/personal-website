import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Project } from '@/lib/types'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group">
      <div className="rounded-xl border p-5 transition-shadow group-hover:shadow-md">
        {p.cover && <img src={p.cover} alt="" className="mb-3 rounded-lg" />}
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          {p.period && <span className="text-xs opacity-70">{p.period}</span>}
        </div>
        <p className="mb-3 text-sm opacity-80">{p.summary}</p>
        <div className="flex flex-wrap gap-1">
          {p.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
        </div>
      </div>
    </Link>
  )
}
