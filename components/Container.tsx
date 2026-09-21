export default function Container({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: 'div' | 'main' | 'section' | 'header' | 'footer'
  className?: string
  children: React.ReactNode
}) {
  return <Tag className={`mx-auto w-full max-w-reading px-6 ${className}`}>{children}</Tag>
}
