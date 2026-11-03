"use client"

import { Reveal } from "@/components/fx/reveal"
import { TextReveal } from "@/components/fx/text-reveal"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  align?: "center" | "left"
  highlight?: string[]
  className?: string
  as?: "h1" | "h2"
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", highlight, className, as = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <Reveal y={10} blur={false}>
          <span className="eyebrow mb-5">{eyebrow}</span>
        </Reveal>
      )}
      <TextReveal
        as={as}
        text={title}
        highlight={highlight}
        className="text-3xl font-medium leading-[1.08] sm:text-4xl lg:text-[3.1rem]"
      />
      {subtitle && (
        <Reveal delay={0.15} y={14}>
          <p className={cn("mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg", align === "center" && "mx-auto max-w-2xl")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
