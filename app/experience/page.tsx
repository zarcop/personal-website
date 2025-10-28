import Image from 'next/image'
import Section from '@/components/Section'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {experience.map((e, idx) => (
          <div key={idx} className="rounded-xl border p-5">
            <div className="mb-1 text-sm opacity-70">{e.start}{e.end ? ` — ${e.end}` : ''}</div>
            <div className="flex items-center gap-3 mb-2">
              {e.logo && (
                <Image
                  src={e.logo}
                  alt={`${e.org} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
              <div>
                <div className="text-lg font-semibold">{e.role}</div>
                <div className="opacity-80">{e.org}</div>
              </div>
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
