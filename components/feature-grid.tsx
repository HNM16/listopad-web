"use client"

import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export type Feature = { icon: LucideIcon; title: string; description: string }

/** Grid of spotlight cards with numbered, icon-led features. */
export function FeatureGrid({ features, className }: { features: Feature[]; className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5", className)}>
      {features.map((feature, index) => (
        <Reveal key={feature.title + index} delay={(index % 3) * 0.08} className="h-full">
          <SpotlightCard tilt className="group flex h-full flex-col p-7">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-violet group-hover:text-white group-hover:shadow-[0_12px_30px_-10px_var(--brand)]">
                <feature.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs text-muted-foreground/70">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
            <p className="mt-2.5 text-pretty leading-relaxed text-muted-foreground">{feature.description}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  )
}
