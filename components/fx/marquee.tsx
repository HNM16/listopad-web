import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/** Seamless infinite horizontal loop. Content is rendered twice; the copy is hidden from assistive tech. */
export function Marquee({ children, className, duration = 36 }: { children: ReactNode; className?: string; duration?: number }) {
  return (
    <div className={cn("marquee-group mask-fade-x relative flex overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max shrink-0"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
