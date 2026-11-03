"use client"

import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/fx/count-up"
import { Magnetic } from "@/components/fx/magnetic"
import { TextReveal } from "@/components/fx/text-reveal"
import { HeroVisual } from "@/components/three/hero-visual"
import { useLanguage } from "@/hooks/use-language"
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowRight, Gauge, HardDrive, Network } from "lucide-react"
import Link from "next/link"
import { useRef, type PointerEvent, type ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.0005 })

  const contentY = useTransform(progress, [0, 1], [0, -140])
  const contentOpacity = useTransform(progress, [0, 0.65], [1, 0])
  const wordmarkY = useTransform(progress, [0, 1], [0, 220])
  const wordmarkOpacity = useTransform(progress, [0, 0.8], [1, 0])

  // pointer parallax for the floating glass chips
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 18 })
  const smy = useSpring(my, { stiffness: 60, damping: 18 })
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const stats = [
    { value: "99.98%", label: t.home.stats.sla },
    { value: "1200", label: t.home.stats.vcpu },
    { value: "10 Gb/s", label: t.home.stats.bandwidth },
    { value: "20", label: t.home.stats.gpu },
  ]

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[46svh] sm:pt-[50svh] md:pb-20 lg:items-center lg:pb-24 lg:pt-28"
    >
      {/* Layer 0 — oversized wordmark for depth */}
      <motion.div
        aria-hidden
        style={{ y: wordmarkY, opacity: wordmarkOpacity }}
        className="pointer-events-none absolute inset-x-0 top-[14%] -z-10 select-none text-center font-display text-[24vw] font-semibold leading-none tracking-[-0.07em] text-foreground/[0.035] lg:top-[18%] lg:text-[19vw]"
      >
        CLOUD
      </motion.div>

      {/* Layer 1 — the 3D scene */}
      <HeroVisual progress={progress} className="-z-10 bottom-auto h-[56svh] sm:h-[60svh] lg:bottom-0 lg:h-auto" />

      {/* Legibility scrims */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[40svh] -z-10 h-[18svh] bg-gradient-to-b from-transparent to-background sm:top-[44svh] lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-background to-transparent lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-gradient-to-r from-background/60 to-transparent lg:block" />

      {/* Layer 2 — floating glass chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <FloatingChip x={smx} y={smy} depth={34} className="right-[7%] top-[22%]" delay={1.4}>
          <ChipContent icon={<HardDrive className="h-4 w-4" />} value="NVMe" label={t.home.chips.nvme} />
        </FloatingChip>
        <FloatingChip x={smx} y={smy} depth={-26} className="bottom-[20%] right-[36%]" delay={1.6} floatDelay="-2s">
          <ChipContent icon={<Gauge className="h-4 w-4" />} value="99.98%" label={t.home.chips.sla} />
        </FloatingChip>
        <FloatingChip x={smx} y={smy} depth={18} className="bottom-[28%] right-[5%]" delay={1.8} floatDelay="-4s">
          <ChipContent icon={<Network className="h-4 w-4" />} value="10 Gb/s" label={t.home.chips.network} />
        </FloatingChip>
      </div>

      {/* Layer 3 — content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container relative mx-auto px-4">
        <div className="max-w-2xl lg:max-w-[46%]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="eyebrow mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            {t.home.heroEyebrow}
          </motion.div>

          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            stagger={0.08}
            text={t.hero.title}
            highlight={["облачн", "cloud", "абрӣ", "абрии"]}
            className="text-[2.35rem] font-medium leading-[1.04] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-lg text-foreground/80 md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: EASE }}
            className="mt-3 max-w-lg text-pretty text-[0.95rem] leading-relaxed text-muted-foreground md:text-base"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="group">
                <Link href="/pricing">
                  {t.hero.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button asChild size="lg" variant="outline">
                <a href="#products">{t.home.heroSecondary}</a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="glass mt-12 grid grid-cols-2 overflow-hidden rounded-3xl sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`px-4 py-4 md:px-5 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-border/60`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="block whitespace-nowrap font-display text-xl font-medium tracking-tight md:text-[1.4rem]" />
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#products"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border border-foreground/20 pt-2">
          <span className="animate-scroll-cue h-2 w-1 rounded-full bg-foreground/60" />
        </span>
        {t.home.scroll}
      </motion.a>
    </section>
  )
}

function FloatingChip({
  children,
  className,
  x,
  y,
  depth,
  delay,
  floatDelay = "0s",
}: {
  children: ReactNode
  className?: string
  x: MotionValue<number>
  y: MotionValue<number>
  depth: number
  delay: number
  floatDelay?: string
}) {
  const tx = useTransform(x, (v) => v * depth)
  const ty = useTransform(y, (v) => v * depth)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      style={{ x: tx, y: ty }}
      className={`absolute ${className}`}
    >
      <div className="animate-float" style={{ animationDelay: floatDelay }}>
        {children}
      </div>
    </motion.div>
  )
}

function ChipContent({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-violet text-white shadow-[0_8px_20px_-6px_var(--brand)]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-medium">{value}</span>
        <span className="block text-[0.7rem] text-muted-foreground">{label}</span>
      </span>
    </div>
  )
}
