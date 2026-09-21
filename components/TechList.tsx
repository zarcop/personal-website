import Image from 'next/image'

// Only the technologies we actually ship a logo for; everything else renders
// as a plain mono label.
const LOGOS: Record<string, string> = {
  Python: '/images/tech/python.svg',
  FastAPI: '/images/tech/fastapi.svg',
  Redis: '/images/tech/redis.svg',
  SQL: '/images/tech/sql.svg',
  Javascript: '/images/tech/javascript.svg',
  TypeScript: '/images/tech/typescript.svg',
  'Node.js': '/images/tech/nodejs.svg',
  Kotlin: '/images/tech/kotlin.svg',
  Numpy: '/images/tech/numpy.svg',
  Pandas: '/images/tech/pandas.svg',
  MatPlotlib: '/images/tech/matplotlib.svg',
}

export default function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {items.map((item) => {
        const logo = LOGOS[item]
        return (
          <li
            key={item}
            className="group/tech flex items-center gap-1.5 font-mono text-2xs uppercase tracking-label text-faint transition-colors duration-200 hover:text-foreground"
          >
            {logo && (
              <Image
                src={logo}
                alt=""
                width={14}
                height={14}
                aria-hidden
                className="h-3.5 w-3.5 flex-none object-contain grayscale opacity-60 transition duration-200 group-hover/tech:opacity-100 group-hover/tech:grayscale-0"
              />
            )}
            {item}
          </li>
        )
      })}
    </ul>
  )
}
