import Image from 'next/image'
import Container from '@/components/Container'
import Elsewhere from '@/components/Elsewhere'
import InlineLink from '@/components/InlineLink'
import ListRow from '@/components/ListRow'
import SectionLabel from '@/components/SectionLabel'
import { Detail, Keyword, KeywordHint, Narrative } from '@/components/Narrative'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'

export default function HomePage() {
  return (
    <Container className="pb-4 pt-10 sm:pt-16">
      {/* ——— Name ——— */}
      <header className="flex items-center gap-4 animate-rise">
        <Image
          src="/images/profile/avatar.jpg"
          alt="Elias Zarco Gonzalez"
          width={320}
          height={320}
          priority
          className="h-14 w-14 flex-none rounded-full object-cover ring-1 ring-line"
        />
        <div>
          <h1 className="text-[2rem] font-semibold leading-none tracking-tight">Elias Zarco</h1>
          <p className="mt-2 font-mono text-2xs uppercase tracking-label text-faint">
            Software &amp; Data Engineer
          </p>
        </div>
      </header>

      {/* ——— Introduction ——— */}
      <Narrative>
        <div
          className="mt-12 space-y-5 text-[1.0625rem] leading-[1.75] text-muted animate-rise"
          style={{ animationDelay: '80ms' }}
        >
          <div>
            <p>
              I&apos;m a software and data engineer from{' '}
              <Keyword id="mexico-city">Mexico City</Keyword>. I came to Georgia Tech for{' '}
              <Keyword id="isye">Industrial &amp; Systems Engineering</Keyword>, found software
              somewhere in the middle, and stayed for both.
            </p>
            <Detail id="mexico-city">
              Born and raised there. I moved to Atlanta for school, and most of what I want to build
              eventually points back home.
            </Detail>
            <Detail id="isye">
              <p>
                Data Science &amp; Analytics concentration, with a CS minor in Intelligence.
              </p>
              <p className="mt-3">
                People ask why an industrial engineer wants to write software. The honest answer is
                that ISYE is the same material from a different angle — probability, optimization,
                and modeling complex systems are what modern ML actually runs on. It also trains you
                to define a problem precisely before you touch it, which has mattered more than
                knowing one more framework.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              I got here sideways. For most of high school I was convinced{' '}
              <Keyword id="policy">public policy</Keyword> was how you fixed things, and I spent my
              weekends in debate rounds arguing about it. It took me longer than it should have to
              notice that the people actually changing anything were the ones building.
            </p>
            <Detail id="policy">
              Competitive debate taught me how to construct an argument and how to lose one, and
              it&apos;s still why I care about problems with people on the other end of them. I just
              stopped believing that arguing was the last step.
            </Detail>
          </div>

          <div>
            <p>
              Last summer I was at <Keyword id="google">Google</Keyword>, building AI tools for
              learning. Alongside school I run{' '}
              <Keyword id="quant">quantitative models</Keyword> for a student-managed fund, and I
              built a low-latency <Keyword id="order-entry">order entry system</Keyword> that my team
              demoed at a hedge fund in New York.
            </p>
            <Detail id="google">
              <p>
                Summer 2025, on the LearnX team. I built agentic AI pipelines and interactive
                TypeScript game templates, and cut latency on our Gemini workflows by about 95%.
              </p>
              <p className="mt-3">
                <InlineLink href="/experience">More on that →</InlineLink>
              </p>
            </Detail>
            <Detail id="quant">
              For the Georgia Tech Student Foundation, a student-managed fund of roughly $2.3M. ARIMA,
              SARIMA-GARCH, and XGBoost models tracking commodities volatility, plus ensemble
              strategies with backtesting and risk-adjusted performance metrics.
            </Detail>
            <Detail id="order-entry">
              <p>
                Python, FastAPI, and Redis. Sub-50ms request/response, a real-time order book over
                WebSockets, and role-based access with audit logging. We demoed it at Millennium&apos;s
                headquarters in New York.
              </p>
              <p className="mt-3">
                <InlineLink href="/projects#order-entry-system">See the project →</InlineLink>
              </p>
            </Detail>
          </div>

          <p>
            What keeps my attention are problems where the math and the system have to agree with
            each other.
          </p>
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
