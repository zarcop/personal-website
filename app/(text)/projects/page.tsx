import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import ProjectsPanel from '@/components/ProjectsPanel'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Projects',
  description:
    'Selected work: trading systems, humanitarian analytics, databases, and statistical modeling.',
}

export default function ProjectsPage() {
  return (
    <>
      <Container className="pt-10 sm:pt-16">
        <PageHeader
          title="Projects"
          lead="Things I built end to end — mostly systems where the data had to be right and the latency had to be low."
        />
      </Container>

      {/* wider than the reading column: the panel needs room for its two columns */}
      <div className="mx-auto w-full max-w-4xl px-6 pb-4">
        <ProjectsPanel projects={projects} className="animate-rise text-[0.875rem] sm:text-[0.9375rem]" />
      </div>
    </>
  )
}
