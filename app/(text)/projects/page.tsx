import Image from 'next/image'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import TechList from '@/components/TechList'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Projects',
  description:
    'Selected work: trading systems, humanitarian analytics, databases, and statistical modeling.',
}

export default function ProjectsPage() {
  return (
    <Container className="pb-4 pt-10 sm:pt-16">
      <PageHeader
        title="Projects"
        lead="Things I built end to end — mostly systems where the data had to be right and the latency had to be low."
      />

      <div className="space-y-20">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-offset animate-rise"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <p className="font-mono text-2xs uppercase tracking-label text-faint">
              {project.year ?? '—'}
            </p>
            <h2 className="mt-3 text-[1.0625rem] font-medium leading-snug text-foreground">
              {project.title}
            </h2>

            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{project.description}</p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-5 space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5">
              <TechList items={project.tech} />
            </div>

            {project.figures && project.figures.length > 0 && (
              <div className="mt-8 space-y-6">
                {project.figures.map((figure) => (
                  <figure key={figure.src}>
                    <Image
                      src={figure.src}
                      alt={figure.alt}
                      width={figure.width}
                      height={figure.height}
                      sizes="(max-width: 640px) 100vw, 38rem"
                      className="h-auto w-full rounded-lg ring-1 ring-line"
                    />
                    {figure.caption && (
                      <figcaption className="mt-3 text-sm leading-relaxed text-faint">
                        {figure.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-mono text-2xs uppercase tracking-label text-faint transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Container>
  )
}
