"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
        <div className="absolute inset-0 flex h-full w-full items-center justify-center md:left-auto md:right-0 md:w-1/2 md:justify-end">
          <Image
            src="/images/hero-cloud-bg.png"
            alt=""
            width={800}
            height={800}
            className="h-auto w-full max-w-md object-contain opacity-50 dark:opacity-20 md:max-w-2xl md:opacity-100 md:dark:opacity-80"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 space-y-4 md:space-y-6"
          >
            <h1 className="text-foreground text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground text-pretty text-base md:text-xl">{t.hero.subtitle}</p>
            <p className="text-muted-foreground text-pretty text-sm md:text-base">{t.hero.description}</p>
            <div className="flex flex-wrap gap-3 pt-2 md:gap-4">
              <Link href="/pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
