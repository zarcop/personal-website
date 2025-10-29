import Image from 'next/image'
import Section from '@/components/Section'
import TechBadges from '@/components/TechBadges'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {experience.map((e, idx) => (
          <div key={idx} className="rounded-xl border p-5 relative">
            {/* Logo in top-right corner */}
            {e.logo && (
              <div className="absolute top-5 right-5 w-16 h-16 flex items-center justify-center">
                <Image
                  src={e.logo}
                  alt={`${e.org} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            )}
            
            <div className="mb-1 text-sm opacity-70">{e.start}{e.end ? ` — ${e.end}` : ''}</div>
            <div className="mb-3">
              <div className="text-lg font-semibold">{e.role}</div>
              <div className="opacity-80 mb-3">{e.org}</div>
              {e.techStack && e.techStack.length > 0 && (
                <TechBadges technologies={e.techStack} />
              )}
            </div>
            <ul className="mt-3 list-disc pl-5">
              {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
