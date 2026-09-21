import Image from 'next/image'
import Container from '@/components/Container'
import DraftBadge from '@/components/DraftBadge'
import Elsewhere from '@/components/Elsewhere'
import InlineLink from '@/components/InlineLink'
import ListRow from '@/components/ListRow'
import SectionLabel from '@/components/SectionLabel'
import { Detail, KeywordHint, Narrative } from '@/components/Narrative'
import { about, intro } from '@/data/about'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { renderProse } from '@/lib/prose'
import { validateAbout } from '@/lib/validateAbout'

// fails `next build` if a keyword and its detail ever drift apart
validateAbout(about)

export default function HomePage() {
  return (
    <Container className="pb-4 pt-10 sm:pt-16">
      {/* ——— Name ——— */}
      <header className="flex items-center gap-5 animate-rise">
        <Image
          src={intro.photo.src}
          alt={intro.photo.alt}
          width={320}
          height={320}
          priority
          className="h-16 w-16 flex-none rounded-full object-cover ring-1 ring-line"
        />
        <div>
          <h1 className="text-[clamp(2.25rem,9vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {intro.name}
          </h1>
          <p className="mt-3 font-mono text-2xs uppercase tracking-label text-faint">
            {intro.tagline}
          </p>
        </div>
      </header>

      {/* ——— The story. Copy lives in data/about.ts ——— */}
      <Narrative>
        <div
          className="mt-14 space-y-5 text-[1.0625rem] leading-[1.75] text-muted animate-rise"
          style={{ animationDelay: '80ms' }}
        >
          {about.map((block, index) => (
            <div key={index}>
              <p>{renderProse(block.body)}</p>
              {block.todo && <DraftBadge note={block.todo} />}

              {block.details &&
                Object.entries(block.details).map(([id, detail]) => (
                  <Detail key={id} id={id} image={detail.image}>
                    {detail.todo && <DraftBadge note={detail.todo} />}
                    {detail.text.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {detail.link && (
                      <p>
                        <InlineLink href={detail.link.href}>{detail.link.label} →</InlineLink>
                      </p>
                    )}
                  </Detail>
                ))}
            </div>
          ))}
        </div>

        <KeywordHint>Underlined words expand</KeywordHint>
      </Narrative>

      {/* ——— Experience ——— */}
      <section className="mt-20 animate-rise" style={{ animationDelay: '160ms' }}>
        <SectionLabel>Experience</SectionLabel>
        <div className="divide-y divide-line/70">
          {experience.map((role) => (
            <ListRow
              key={role.slug}
              href={`/experience#${role.slug}`}
              meta={role.shortPeriod}
              title={`${role.org} · ${role.role}`}
              description={role.summary}
            />
          ))}
        </div>
      </section>

      {/* ——— Projects ——— */}
      <section className="mt-16 animate-rise" style={{ animationDelay: '200ms' }}>
        <SectionLabel>Projects</SectionLabel>
        <div className="divide-y divide-line/70">
          {projects.map((project) => (
            <ListRow
              key={project.slug}
              href={`/projects#${project.slug}`}
              meta={project.year}
              title={project.title}
              description={project.summary}
            />
          ))}
        </div>
      </section>

      {/* ——— Contact ——— */}
      <section className="mt-16 animate-rise" style={{ animationDelay: '240ms' }}>
        <SectionLabel>Elsewhere</SectionLabel>
        <Elsewhere />
      </section>
    </Container>
  )
}
