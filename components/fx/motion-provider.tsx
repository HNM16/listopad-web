"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Global motion defaults. `reducedMotion="user"` makes every framer-motion
 * animation in the tree honour the OS "reduce motion" preference
 * (transforms are skipped, opacity still fades).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  )
}
