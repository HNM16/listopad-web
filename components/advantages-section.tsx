"use client"

import { CountUp } from "@/components/fx/count-up"
import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Layout, Shield, Zap } from "lucide-react"
import type { ReactNode } from "react"

/** "Текущий SLA - 99.98%" → { label: "Текущий SLA", value: "99.98%" } */
const splitSpec = (spec: string) => {
  const idx = spec.lastIndexOf(" - ")
  return idx === -1 ? { label: spec, value: "" } : { label: spec.slice(0, idx), value: spec.slice(idx + 3) }
}

export function AdvantagesSection() {
  const { t } = useLanguage()
  const specs = [
    { ...splitSpec(t.advantages.power.specs.sla), fill: 0.9998 },
    { ...splitSpec(t.advantages.power.specs.cpu), fill: 0.78 },
    { ...splitSpec(t.advantages.power.specs.gpu), fill: 0.55 },
    { ...splitSpec(t.advantages.power.specs.bandwidth), fill: 0.7 },
  ]

  return (
    <section id="advantages" className="relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-3xl" />
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={t.home.advantagesEyebrow}
          title={t.advantages.title}
          subtitle={t.home.advantagesSubtitle}
          className="mb-14 md:mb-20"
        />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Security */}
          <Reveal className="lg:col-span-5">
            <SpotlightCard className="flex h-full flex-col p-7 md:p-9">
              <IconTile>
                <Shield className="h-5 w-5" />
              </IconTile>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t.advantages.security.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{t.advantages.security.description}</p>
              <Radar />
            </SpotlightCard>
          </Reveal>

          {/* Power */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <SpotlightCard className="flex h-full flex-col p-7 md:p-9">
              <IconTile>
                <Zap className="h-5 w-5" />
              </IconTile>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t.advantages.power.title}</h3>
              <div className="mt-7 grid flex-1 gap-3 sm:grid-cols-2">
                {specs.map((s, i) => (
                  <div key={s.label} className="flex flex-col justify-between rounded-2xl border border-border/70 bg-background/40 p-5">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <CountUp value={s.value} className="mt-4 block font-display text-3xl font-medium tracking-tight md:text-4xl" />
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: s.fill }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full origin-left rounded-full bg-gradient-to-r from-brand-cyan via-brand to-brand-violet"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Interface */}
          <Reveal delay={0.1} className="lg:col-span-12">
            <SpotlightCard className="grid items-center gap-10 p-7 md:p-9 lg:grid-cols-[1fr_1.25fr]">
              <div>
                <IconTile>
                  <Layout className="h-5 w-5" />
                </IconTile>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t.advantages.interface.title}</h3>
                <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">{t.advantages.interface.description}</p>
              </div>
              <DashboardMock label={t.home.interfacePanel} />
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-violet text-white shadow-[0_12px_30px_-10px_var(--brand),inset_0_1px_0_rgba(255,255,255,0.3)]">
      {children}
    </span>
  )
}

/** Decorative radar sweep: concentric rings, a rotating beam and blinking PoP nodes. */
function Radar() {
  const nodes = [
    [22, 30],
    [70, 22],
    [80, 64],
    [35, 74],
    [55, 46],
  ]
  return (
    <div aria-hidden className="relative mx-auto mt-8 aspect-square w-full max-w-[17rem] flex-1">
      {[1, 0.74, 0.48, 0.22].map((s) => (
        <div key={s} className="absolute inset-0 m-auto rounded-full border border-brand/20" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
      ))}
      <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,color-mix(in_oklab,var(--brand)_35%,transparent)_50deg,transparent_60deg)]" />
      {nodes.map(([x, y], i) => (
        <span key={i} className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-cyan" style={{ animationDelay: `${i * 0.45}s` }} />
          <span className="absolute inset-0 rounded-full bg-brand-cyan shadow-[0_0_12px_var(--brand-cyan)]" />
        </span>
      ))}
      <div className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-2xl bg-background/70 ring-1 ring-brand/30 backdrop-blur">
        <Shield className="h-6 w-6 text-brand" />
      </div>
    </div>
  )
}

/** Stylised control-panel preview built from CSS, animated on reveal. */
function DashboardMock({ label }: { label: string }) {
  const bars = [38, 62, 48, 80, 56, 92, 70, 84, 60, 96, 74, 88]
  return (
    <div aria-hidden className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/60 shadow-[0_30px_80px_-30px_rgba(0,40,120,0.45)]">
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs text-muted-foreground">my.listopad.tj · {label}</span>
      </div>
      <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr]">
        <div className="space-y-2 border-r border-border/70 p-3">
          {[0.9, 0.7, 0.8, 0.6, 0.75].map((w, i) => (
            <div key={i} className={`h-2 rounded-full ${i === 1 ? "bg-brand/70" : "bg-foreground/10"}`} style={{ width: `${w * 100}%` }} />
          ))}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {["vCPU", "RAM", "NVMe"].map((k, i) => (
              <div key={k} className="rounded-xl border border-border/70 p-2.5">
                <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: [0.45, 0.7, 0.62][i] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full origin-left rounded-full bg-brand"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-28 items-end gap-1.5 sm:h-36">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.05 }}
                whileInView={{ scaleY: h / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-brand/30 to-brand-cyan"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
