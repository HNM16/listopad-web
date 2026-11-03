"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * A soft light that trails the pointer. Only on devices with a precise
 * pointer (mouse / trackpad) and when the user allows motion.
 */
export function CursorGlow() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setEnabled(mq.matches && !reduce)
    const onChange = () => setEnabled(mq.matches && !reduce)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[480px] w-[480px] rounded-full opacity-50 will-change-transform dark:opacity-80"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(closest-side, color-mix(in oklab, var(--brand) 12%, transparent), transparent)",
      }}
    />
  )
}
