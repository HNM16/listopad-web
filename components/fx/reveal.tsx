"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  delay?: number
  /** Vertical travel in px before the element settles. */
  y?: number
  x?: number
  blur?: boolean
  once?: boolean
  amount?: number
}

/** Fades + lifts its children into place when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  blur = true,
  once = true,
  amount = 0.25,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
}

const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
}

type StaggerProps = HTMLMotionProps<"div"> & { children: ReactNode; stagger?: number; amount?: number }

/** Parent that reveals each <StaggerItem> one after another. */
export function Stagger({ children, stagger = 0.08, amount = 0.15, ...rest }: StaggerProps) {
  return (
    <motion.div
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  )
}
