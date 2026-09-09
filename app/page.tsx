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
      <header className="flex items-center gap-5 animate-rise">
        <Image
          src="/images/profile/avatar.jpg"
          alt="Elias Zarco Gonzalez"
          width={320}
          height={320}
          priority
          className="h-16 w-16 flex-none rounded-full object-cover ring-1 ring-line"
        />
        <div>
          <h1 className="text-[clamp(2.25rem,9vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Elias Zarco.
          </h1>
          <p className="mt-3 font-mono text-2xs uppercase tracking-label text-faint">
            AI, Optimization &amp; Systems
          </p>
        </div>
      </header>

      {/* ——— The story ——— */}
      <Narrative>
        <div
          className="mt-14 space-y-5 text-[1.0625rem] leading-[1.75] text-muted animate-rise"
          style={{ animationDelay: '80ms' }}
        >
          <div>
            <p>
              Born and raised in <Keyword id="toluca">Toluca</Keyword> — an hour outside Mexico City,
              which is the answer I give when nobody has heard of Toluca.
            </p>
            <Detail id="toluca">
              <p>
                It sits at about 2,660 metres, which makes it the highest major city in Mexico and
                colder than anyone expects Mexico to be. Close enough to CDMX to feel its pull, far
                enough to be its own place.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              For most of high school I was convinced <Keyword id="policy">public policy</Keyword>{' '}
              was how you fixed things, and I spent my weekends in debate rounds arguing about it. It
              took me longer than it should have to notice that the people actually changing anything
              were the ones building.
            </p>
            <Detail id="policy">
              <p>
                Competitive debate taught me how to construct an argument and how to lose one in
                front of an audience. It is still why I care about problems with people on the other
                end of them. I just stopped believing that arguing was the last step.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              So I went the other way. I came to Georgia Tech for{' '}
              <Keyword id="isye">industrial engineering</Keyword> — the best program in the world for
              it — and somewhere in the middle I found software and fell for it completely.
            </p>
            <Detail id="isye">
              <p>
                Industrial &amp; Systems Engineering, Data Science &amp; Analytics concentration,
                with a CS minor in Intelligence.
              </p>
              <p>
                People ask why an industrial engineer wants to write software. ISYE turns out to be
                the same material from a different angle, and it trains you to define a problem
                precisely before you touch it — which has mattered more than knowing one more
                framework.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              I have kept one foot in business. Through <Keyword id="clubs">clubs</Keyword> I have
              been building the consulting and banking side of things, mostly because I would rather
              understand a problem commercially before I model it.
            </p>
            <Detail id="clubs">
              <p>
                Most of that has been the Georgia Tech Student Foundation, a student-managed fund of
                roughly $2.3M, where I work as a quantitative analyst — ARIMA, SARIMA-GARCH and
                XGBoost models tracking commodities volatility, plus ensemble strategies with
                backtesting and risk-adjusted metrics.
              </p>
              <p>
                <InlineLink href="/experience">More on that →</InlineLink>
              </p>
            </Detail>
          </div>

          <div>
            <p>
              In 2025 I was at <Keyword id="google">Google</Keyword>, building AI tools for learning.
              That is where software engineering stopped being coursework and became systems:
              pipelines, latency, and the distance between a demo and something people actually use.
            </p>
            <Detail id="google">
              <p>
                Summer 2025, on the LearnX team. I built agentic AI pipelines and interactive
                TypeScript game templates, and cut latency on our Gemini workflows by about 95%.
              </p>
              <p>
                <InlineLink href="/experience#google-learnx">More on that →</InlineLink>
              </p>
            </Detail>
          </div>

          <div>
            <p>
              Around then the classes and the projects started rhyming.{' '}
              <Keyword id="ie-ml">Industrial engineering and machine learning</Keyword> are largely
              the same subject in different clothes — probability, optimization, and modeling systems
              that refuse to hold still.
            </p>
            <Detail id="ie-ml">
              <p>
                Optimization is how models get trained. Probability and statistics are the
                foundation underneath the whole field. Stochastic modeling is what you reach for the
                moment a system stops being deterministic. The ISYE curriculum was teaching me the
                machinery of modern ML without calling it that.
              </p>
              <p>
                <InlineLink href="/projects">Where that shows up →</InlineLink>
              </p>
            </Detail>
          </div>

          {/* TODO(elias): confirm the bank's name, the country, your title, and the dates.
              The bracketed placeholders below are deliberately visible so they can't ship. */}
          <div>
            <p>
              The summer after, I was at <Keyword id="bank">a bank in [country]</Keyword>,
              implementing AI rather than building it. Getting a model adopted inside an organization
              is a different problem from getting it to work, and it taught me more about people than
              about models.
            </p>
            <Detail id="bank">
              <p>
                [Placeholder — bank name, country, role, and dates still to fill in.]
              </p>
              <p>
                The short version: the hard part was never the modeling. It was the people who had to
                trust the output, the processes that had to bend around it, and the gap between what
                a system can do and what an institution is ready to let it do.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              What I want next is to keep deepening the technical foundation while pointing it at
              problems worth solving. Right now that means the intersection of{' '}
              <Keyword id="ai-optimization">AI and optimization</Keyword>, and what both look like in{' '}
              <Keyword id="domains">healthcare and manufacturing</Keyword>.
            </p>
            <Detail id="ai-optimization">
              <p>
                Learned models are good at prediction and bad at guarantees; optimization is the
                reverse. The interesting work is in the seam — using one to inform the other, and
                being honest about which half of a decision each is responsible for.
              </p>
            </Detail>
            <Detail id="domains">
              <p>
                Both are industries where a better decision compounds into something physical: a
                shorter wait, a line that does not stop, a resource that reaches the person who needs
                it. They are also exactly where industrial engineering has been working for a
                century, which means the domain knowledge already exists to be borrowed.
              </p>
            </Detail>
          </div>

          <div>
            <p>
              Away from all of it: <Keyword id="hobbies">soccer, history and music</Keyword>.
            </p>
            <Detail id="hobbies">
              <p>
                [Placeholder — worth a sentence in your own voice: the team you follow, the corner of
                history you fall into, what you listen to or play.]
              </p>
            </Detail>
          </div>
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
