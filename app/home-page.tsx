"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ClientsSection } from "@/components/clients-section"
import { AdvantagesSection } from "@/components/advantages-section"
import ServerConfigurator from "@/components/server-configurator"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  // Theme is owned by next-themes (ThemeProvider in the root layout); the old
  // zustand theme effect raced it and could override the visitor's choice.
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
