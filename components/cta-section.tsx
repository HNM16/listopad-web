"use client"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/fx/magnetic"
import { Reveal } from "@/components/fx/reveal"
import { TextReveal } from "@/components/fx/text-reveal"
import { useLanguage } from "@/hooks/use-language"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function CTASection() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const orbA = useTransform(scrollYProgress, [0, 1], [80, -80])
  const orbB = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.94, 1])

  return (
    <section ref={ref} className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div style={{ scale }} className="ring-gradient relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <div className="glass relative overflow-hidden rounded-[inherit] px-6 py-16 text-center md:px-16 md:py-24">
            <motion.div style={{ y: orbA }} aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-[90px]" />
            <motion.div style={{ y: orbB }} aria-hidden className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-brand-violet/25 blur-[100px]" />
            <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-60" />

            <div className="relative mx-auto max-w-3xl">
              <Reveal y={10} blur={false}>
                <span className="eyebrow mb-6">{t.home.ctaEyebrow}</span>
              </Reveal>
              <TextReveal text={t.cta.title} className="text-3xl font-medium leading-[1.08] sm:text-4xl lg:text-[3.4rem]" />
              <Reveal delay={0.15}>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">{t.cta.subtitle}</p>
              </Reveal>
              <Reveal delay={0.25} className="mt-10 flex justify-center">
                <Magnetic>
                  <Button asChild size="lg" className="group h-14 px-9 text-base">
                    <Link href="/contact">
                      {t.cta.button}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
