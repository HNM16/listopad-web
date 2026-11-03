"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ClientsSection } from "@/components/clients-section"
import { AdvantagesSection } from "@/components/advantages-section"
import ServerConfigurator from "@/components/server-configurator"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { useThemeEffect } from "@/hooks/use-theme"

export default function HomePage() {
  useThemeEffect()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <ClientsSection />
        <AdvantagesSection />
        <ServerConfigurator />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}