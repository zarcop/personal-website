/** Bare shell for the 3D room: no nav, no footer, no page scroll. */
export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-dvh w-screen overflow-hidden">{children}</div>
}
