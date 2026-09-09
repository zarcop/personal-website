import Image from 'next/image'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import TechList from '@/components/TechList'
import { experience } from '@/data/experience'

export const metadata = {
  title: 'Experience',
  description: 'Where I have worked and what I built there.',
}

export default function ExperiencePage() {
  return (
    <Container className="pb-4 pt-10 sm:pt-16">
      <PageHeader title="Experience" lead="Where I've worked, and what I actually built there." />

      <div className="space-y-14">
        {experience.map((role, index) => (
          <article
            key={role.slug}
            id={role.slug}
            className="scroll-offset animate-rise"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-2xs uppercase tracking-label text-faint">
                  {role.period}
                </p>
                <h2 className="mt-3 text-[1.0625rem] font-medium leading-snug text-foreground">
                  {role.role}
                </h2>
                <p className="mt-1 text-[0.9375rem] text-muted">{role.org}</p>
              </div>

              {role.logo && (
                <Image
                  src={role.logo}
                  alt=""
                  width={72}
                  height={72}
                  aria-hidden
                  className="h-9 w-9 flex-none rounded-md object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              )}
            </div>

            <ul className="mt-5 space-y-2">
              {role.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line"
                >
                  {bullet}
                </li>
              ))}
            </ul>

            {role.tech && role.tech.length > 0 && (
              <div className="mt-5">
                <TechList items={role.tech} />
              </div>
            )}
          </article>
        ))}
      </div>
    </Container>
  )
}
