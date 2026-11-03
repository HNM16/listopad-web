"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useRef, type ReactNode, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

type MagneticProps = {
  children: ReactNode
  /** 0..1 — how strongly the element follows the pointer. */
  strength?: number
  className?: string
}

/**
 * Wrap any button / link to make it lean toward the cursor.
 * Inactive for touch input and reduced-motion users.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  )
}
