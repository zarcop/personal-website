import Section from '@/components/Section'

export default function WhyISYEPage() {
  return (
    <>
      <Section title="Why I Chose (and Stayed in) ISYE">
        <div className="prose prose-lg max-w-none">
          <p className="text-base dark:text-white text-black leading-relaxed mb-4">
            Entering college, I wasn’t sure which engineering path to pursue. Industrial & Systems Engineering felt like the most versatile foundation — a bridge between business, math, and computing with grads going into consulting, finance, tech, data, and beyond. Midway through, I discovered software engineering and systems. The creativity, rigor, and problem-solving unlocked by software made the career path click for me.
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

          {/* Image placeholder block */}
          <div className="rounded-lg border bg-card/40 p-6 text-center text-sm text-muted-foreground">
            Image placeholder — I’ll add a visual here (diagram or photo)
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
        <div className="rounded-lg border bg-card/40 p-6 text-center text-sm text-muted-foreground">
            Image placeholder — I’ll add another visual here
          </div>
      </Section>
    </>
  )
}


