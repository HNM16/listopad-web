"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ElementType, ReactNode } from "react"

type TextRevealProps = {
  text: string
  as?: ElementType
  className?: string
  /** Words (case-insensitive substring match) rendered with the brand gradient. */
  highlight?: string[]
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

/**
 * Word-by-word masked reveal. Each word rises out of an overflow mask,
 * which reads as a single, deliberate typographic gesture.
 * The full string stays in the accessibility tree via aria-label.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  highlight = [],
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: TextRevealProps) {
  const Element = Tag as ElementType<{ className?: string; "aria-label"?: string; children?: ReactNode }>
  const words = text.split(" ")
  const isHighlighted = (w: string) => highlight.some((h) => h && w.toLowerCase().includes(h.toLowerCase()))

  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } }

  return (
    <Element className={cn("text-balance", className)} aria-label={text}>
      <motion.span
        key={text}
        aria-hidden
        className="inline"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-top leading-[1.08]">
            <motion.span
              className={cn("inline-block will-change-transform", isHighlighted(word) && "text-brand-gradient")}
              variants={{
                hidden: { y: "110%", rotate: 4, opacity: 0 },
                show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Element>
  )
}
