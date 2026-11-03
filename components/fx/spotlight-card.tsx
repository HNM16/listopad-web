"use client"

import { cn } from "@/lib/utils"
import { useRef, type HTMLAttributes, type PointerEvent } from "react"

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Subtle 3D tilt toward the cursor. */
  tilt?: boolean
}

/**
 * Glass surface with a cursor-tracked light and a lit edge.
 * Writes CSS variables directly (no React re-render on pointer move).
 */
export function SpotlightCard({ className, children, tilt = false, onPointerMove, onPointerLeave, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (el) {
      const r = el.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      el.style.setProperty("--mx", `${px}px`)
      el.style.setProperty("--my", `${py}px`)
      if (tilt && e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const rx = ((py / r.height) - 0.5) * -6
        const ry = ((px / r.width) - 0.5) * 6
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      }
    }
    onPointerMove?.(e)
  }

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (ref.current && tilt) ref.current.style.transform = ""
    onPointerLeave?.(e)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "spotlight glass relative overflow-hidden rounded-3xl transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:border-brand/25 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--brand)_45%,transparent)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
