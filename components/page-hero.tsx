"use client"

import { TextReveal } from "@/components/fx/text-reveal"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useRef, type ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

type PageHeroProps = {
  title: string
  description?: ReactNode
  eyebrow?: string
  icon?: LucideIcon
  /** Extra content under the description (CTAs, badges...). */
  children?: ReactNode
  align?: "center" | "left"
  className?: string
}

/**
 * Shared cinematic header for inner pages: glowing icon orb, masked title
 * reveal and a gentle parallax exit as the visitor scrolls.
 */
export function PageHero({ title, description, eyebrow, icon: Icon, children, align = "center", className }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} className={cn("relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44", className)}>
      <motion.div aria-hidden style={{ y: orbY }} className="mask-fade-b pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute left-[15%] top-40 h-60 w-60 rounded-full bg-brand-violet/15 blur-[90px]" />
        <div className="absolute right-[12%] top-24 h-52 w-52 rounded-full bg-brand-cyan/15 blur-[90px]" />
      </motion.div>
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 -z-10 opacity-80" />

      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        <div className={cn("max-w-4xl", align === "center" ? "mx-auto text-center" : "")}>
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              className={cn("relative mb-8 inline-grid h-20 w-20 place-items-center", align === "center" && "mx-auto")}
            >
              <span aria-hidden className="animate-pulse-ring absolute inset-0 rounded-[1.75rem] bg-brand/30" />
              <span aria-hidden className="absolute -inset-3 rounded-[2rem] bg-brand/20 blur-2xl" />
              <span className="relative grid h-20 w-20 place-items-center rounded-[1.75rem] bg-gradient-to-br from-brand-cyan via-brand to-brand-violet text-white shadow-[0_20px_50px_-12px_var(--brand),inset_0_1px_0_rgba(255,255,255,0.4)]">
                <Icon className="h-9 w-9" strokeWidth={1.6} />
              </span>
            </motion.div>
          )}

          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mb-5"
            >
              <span className="eyebrow">{eyebrow}</span>
            </motion.div>
          )}

          <TextReveal
            as="h1"
            immediate
            delay={0.15}
            text={title}
            className="text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-[4.2rem]"
          />

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className={cn(
                "mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl",
                align === "center" && "mx-auto max-w-3xl",
              )}
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className={cn("mt-10", align === "center" && "flex flex-wrap justify-center gap-3")}
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
