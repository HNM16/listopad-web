import type { ReactNode } from "react"

/**
 * Re-mounts on every navigation, replaying a short cinematic hand-off:
 * a veil lifts while a brand light sweeps across the top edge.
 * CSS-only (no transforms on the content wrapper) so fixed headers keep
 * working and content is never hidden if JavaScript is slow.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="route-curtain pointer-events-none fixed inset-0 z-[80] bg-background">
        <div className="route-curtain__line absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-cyan via-brand to-brand-violet" />
      </div>
      <div className="page-enter">{children}</div>
    </>
  )
}
