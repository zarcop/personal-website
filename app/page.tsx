import Section from '@/components/Section'
import { readMDX, MDXContent } from '@/lib/mdx'

export default function HomePage() {
  const mdx = readMDX('home.mdx')
  return (
    <>
      <Section>
        <MDXContent source={mdx} />
      </Section>
      <Section title="Highlights">
        <ul>
          <li>⚡ Order-Entry System (Redis + FastAPI) demoed at Millennium HQ</li>
          <li>🎧 Playlist Agents translating Spotify → Apple Music</li>
          <li>📈 Research & valuations for ~US$2.3M fund (GTSF)</li>
        </ul>
      </Section>
    </>
  )
}
