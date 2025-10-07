import fs from 'node:fs'
import path from 'node:path'
import { MDXRemote } from 'next-mdx-remote/rsc'

export function readMDX(name: string) {
  const p = path.join(process.cwd(), 'content', name)
  return fs.readFileSync(p, 'utf8')
}

export function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} />
}
