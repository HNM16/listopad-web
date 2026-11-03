"use client"

import { Button } from "@/components/ui/button"
import { CTASection } from "@/components/cta-section"
import { FeatureGrid, type Feature } from "@/components/feature-grid"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Magnetic } from "@/components/fx/magnetic"
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/hooks/use-language"
import { ArrowRight, Check, type LucideIcon } from "lucide-react"
import Link from "next/link"

type ProductPageProps = {
  icon: LucideIcon
  title: string
  description: string
  featuresTitle: string
  features: Feature[]
  benefitsTitle: string
  benefits: string[]
  orderUrl?: string
}

/** Shared layout for the CDN / DNS / WAF product pages. */
export function ProductPage({
  icon,
  title,
  description,
  featuresTitle,
  features,
  benefitsTitle,
  benefits,
  orderUrl = "https://my.listopad.tj/auth/login",
}: ProductPageProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero icon={icon} eyebrow={t.home.productsEyebrow} title={title} description={description}>
          <Magnetic>
            <Button asChild size="lg" className="group">
              <a href={orderUrl}>
                {t.configurator.order}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">{t.nav.contact}</Link>
            </Button>
          </Magnetic>
        </PageHero>

        <section className="relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <SectionHeading title={featuresTitle} className="mb-12 md:mb-16" />
            <FeatureGrid features={features} />
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading align="left" title={benefitsTitle} />
                <Reveal delay={0.2} className="mt-8 hidden lg:block">
                  <div className="h-px w-24 bg-gradient-to-r from-brand to-transparent" />
                </Reveal>
              </div>
              <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.1}>
                {benefits.map((benefit, index) => (
                  <StaggerItem key={index}>
                    <div className="glass group flex h-full items-start gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/30">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-cyan to-brand text-white shadow-[0_8px_20px_-8px_var(--brand)] transition-transform duration-500 group-hover:scale-110">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-pretty font-medium leading-relaxed">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
