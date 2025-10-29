import Image from 'next/image'

interface TechBadgesProps {
  technologies: string[]
}

// Map technology names to their logo paths - only technologies with actual logos
const TECH_LOGOS: Record<string, string> = {
  'Python': '/images/tech/python.svg',
  'FastAPI': '/images/tech/fastapi.svg',
  'Redis': '/images/tech/redis.svg',
  'SQL': '/images/tech/sql.svg',
  'Javascript': '/images/tech/javascript.svg',
  'TypeScript': '/images/tech/typescript.svg',
  'Node.js': '/images/tech/nodejs.svg',
  'Kotlin': '/images/tech/kotlin.svg',
  'Numpy': '/images/tech/numpy.svg',
  'Pandas': '/images/tech/pandas.svg',
  'MatPlotlib': '/images/tech/matplotlib.svg',
}

export default function TechBadges({ technologies }: TechBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => {
        const logoPath = TECH_LOGOS[tech]
        const hasLogo = logoPath !== undefined
        
        return (
          <span 
            key={tech} 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {hasLogo && (
              <Image
                src={logoPath}
                alt=""
                width={21}
                height={21}
                className="object-contain flex-shrink-0"
                draggable={false}
              />
            )}
            <span className="whitespace-nowrap leading-none">{tech}</span>
          </span>
        )
      })}
    </div>
  )
}

