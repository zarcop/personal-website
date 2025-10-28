'use client'
import Image from 'next/image'
import type { Experience } from '@/lib/types'

interface TimelineProps {
  experiences: Experience[]
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
      
      {/* Timeline items */}
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative flex gap-6">
            {/* Timeline dot */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-4 w-4 rounded-full border-2 border-background bg-primary" />
            </div>
            
            {/* Content card */}
            <div className="flex-1 rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md relative">
              {/* Logo in top-right corner */}
              {exp.logo && (
                <div className="absolute top-6 right-6 w-16 h-16 flex items-center justify-center">
                  <Image
                    src={exp.logo}
                    alt={`${exp.org} logo`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              )}
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {exp.start} {exp.end ? `— ${exp.end}` : ''}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-muted-foreground">
                    <span>{exp.org}</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

