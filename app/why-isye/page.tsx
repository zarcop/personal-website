import Section from '@/components/Section'
import Image from 'next/image'

export default function WhyISYEPage() {
  return (
    <>
      <Section title="Why I Chose (and Stayed in) ISYE">
        <div className="prose prose-lg max-w-none">
          <p className="text-base dark:text-white text-black leading-relaxed mb-4">
            Entering college, I wasn’t sure which engineering path to pursue. Industrial & Systems Engineering felt like the most versatile foundation — a bridge between business, math, and computing with grads going into consulting, finance, tech, data, and beyond. Midway through, I discovered software engineering and systems. The creativity, rigor, and problem-solving unlocked by software made the career path click for me. If you’re a recruiter reading this, you might be wondering: why hire an Industrial & Systems Engineer for a software role?
          </p>
          <p className="text-base dark:text-white text-black leading-relaxed mb-4">
            Even after that epiphany, I stayed in ISYE intentionally. Why? Because ISYE trains you to optimize complex systems with data, probability, and optimization — the same mental models that power great software and modern AI. This page connects the dots between my ISYE background and my goal to build software systems, especially in machine learning and AI.
          </p>
        </div>
      </Section>

      <Section title="What ISYE Builds in a Software Engineer">
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-base dark:text-white text-black leading-relaxed">
            Industrial & Systems Engineering focuses on designing and improving complex processes and organizations using data, mathematics, and technology. The degree blends business intuition, rigorous probability/statistics, optimization, and computing. I pursued the Analytics & Data Science concentration and paired it with a CS minor, giving me a balanced mix of ISYE and CS coursework.
          </p>
          <p className="text-base dark:text-white text-black leading-relaxed">
            On the computing side, my ISYE curriculum emphasized data modeling, databases, and building systems to solve real problems. The deeper unlock came from the math: probability and statistics inform the foundations of modern AI, while optimization (linear models and programming) connects directly to ML training and decision-making. That overlap made topics like Bayesian inference and model optimization feel natural when I built AI/ML projects.
          </p>
          <p className="text-base dark:text-white text-black leading-relaxed">
            Beyond tools, software engineering is about structured problem-solving under pressure and collaborating to ship reliable systems. ISYE reinforced that mindset: define the problem precisely, model the system, measure outcomes, iterate, and optimize.
          </p>

          {/* Image: Industrial Engineering visual */}
          <div className="rounded-lg border bg-card/40 p-2">
            <Image
              src="/images/isye/industrialengineering.jpeg"
              alt="Industrial and Systems Engineering concept graphic"
              width={1600}
              height={600}
              className="w-full h-auto rounded-md"
              priority
            />
          </div>
        </div>
      </Section>

      <Section title="Beyond the Classroom: IE in Practice">
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-base dark:text-white text-black leading-relaxed">
            Outside coursework, I’ve applied IE thinking in team settings — scoping ambiguous problems, aligning on metrics, designing processes, and building data-driven solutions. These experiences translate directly to software: requirements gathering, system design, iteration, and delivery.
          </p>
          <p className="text-base dark:text-white text-black leading-relaxed">
            The throughline is simple: ISYE trained me to think in systems. Software engineering lets me build them.
          </p>
        </div>
        <div className="rounded-lg border bg-card/40 p-2">
            <Image
              src="/images/isye/experientialearning.jpeg"
              alt="Experiential learning in ISYE — group at Georgia Tech event"
              width={1600}
              height={900}
              className="w-full h-auto rounded-md"
            />
          </div>
      </Section>

      <Section title="Coursework That Fuels My SWE Path">
        <div className="prose max-w-none">
          <p className="text-base dark:text-white text-black leading-relaxed mb-6">
            A snapshot of classes that shaped how I think about systems, data, and building software — shown as nodes with the takeaway that mattered most to me.
          </p>
        </div>

        {/* Node-style list */}
        <ul className="relative ml-4 md:ml-6 pl-6 md:pl-8 border-l border-border space-y-6">
          {/* ISYE 2027 */}
          <li className="relative">
            <span className="absolute -left-3 md:-left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow" />
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold">ISYE 2027 — Probability with Applications</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built a strong foundation in probability: axioms, set theory, discrete/continuous distributions,
                Bayesian reasoning, and key results like the Central Limit Theorem and Markov’s inequality.
                This class sharpened intuition for uncertainty — essential for ML and reliable systems.
              </p>
            </div>
          </li>

          {/* CS 2316 */}
          <li className="relative">
            <span className="absolute -left-3 md:-left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow" />
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold">CS 2316 — Data Input and Manipulation (for ISYE)</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Hands-on Python for industry workflows: cleaning, transforming, and analyzing messy datasets; building
                practical scripts and reports. Projects emphasized end-to-end data work — from ingestion to insights.
              </p>
            </div>
          </li>

          {/* ISYE 3030 */}
          <li className="relative">
            <span className="absolute -left-3 md:-left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow" />
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold">ISYE 3030 — Statistical Methods</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Core statistical tools for decision-making: sampling distributions, hypothesis testing, and simple
                linear regression. Gave me the quantitative backbone to understand and justify ML modeling choices.
              </p>
            </div>
          </li>

          {/* ISYE 3232 */}
          <li className="relative">
            <span className="absolute -left-3 md:-left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow" />
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold">ISYE 3232 — Stochastic Manufacturing and Service Systems</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Applied probability to real systems: newsvendor decisions, cost minimization, and profit maximization; 
                then deepened with Markov chains and their applications. Connected these ideas to CS problems and even
                interview prep (dynamic programming intuition via state modeling).
              </p>
            </div>
          </li>

          {/* ISYE 3133 */}
          <li className="relative">
            <span className="absolute -left-3 md:-left-4 top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow" />
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold">ISYE 3133 — Optimization</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The crown jewel: modeling complex problems as linear and integer programs, solving with methods like
                Simplex and industry solvers such as Gurobi. Showed me how optimization and ML reinforce each other —
                from training objectives to operational decision systems.
              </p>
            </div>
          </li>
        </ul>
      </Section>
    </>
  )
}


