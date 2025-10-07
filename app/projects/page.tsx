import Section from '@/components/Section'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <Section title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </Section>
  )
}
