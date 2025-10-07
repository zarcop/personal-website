import Section from '@/components/Section'
import { readMDX, MDXContent } from '@/lib/mdx'

export default function LabPage() {
  const mdx = readMDX('lab.mdx')
  return (
    <Section title="Lab / Notes">
      <MDXContent source={mdx} />
    </Section>
  )
}
