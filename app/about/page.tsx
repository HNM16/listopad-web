"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { FeatureGrid } from "@/components/feature-grid"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CountUp } from "@/components/fx/count-up"
import { Stagger, StaggerItem } from "@/components/fx/reveal"
import { useLanguage } from "@/hooks/use-language"
import { Shield, Zap, Users, Award, Globe2, Server, Building2 } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    {
      value: "120+",
      label: t.nav.about === "О компании" ? "Клиентов" : t.nav.about === "About" ? "Clients" : "Муштариён",
    },
    { value: "99.98%", label: "SLA" },
    { value: "1200+", label: "vCPU" },
    {
      value: "10 Gb/s",
      label:
        t.nav.about === "О компании"
          ? "Пропускная способность"
          : t.nav.about === "About"
            ? "Bandwidth"
            : "Паҳнои полоса",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: t.nav.about === "О компании" ? "Безопасность" : t.nav.about === "About" ? "Security" : "Бехатарӣ",
      description:
        t.nav.about === "О компании"
          ? "Защита данных на уровне предприятия с современными протоколами шифрования"
          : t.nav.about === "About"
            ? "Enterprise-level data protection with modern encryption protocols"
            : "Ҳифзи маълумот дар сатҳи корхона бо протоколҳои рамзгузории муосир",
    },
    {
      icon: Zap,
      title:
        t.nav.about === "О компании" ? "Производительность" : t.nav.about === "About" ? "Performance" : "Самаранокӣ",
      description:
        t.nav.about === "О компании"
          ? "Высокоскоростная инфраструктура для максимальной производительности"
          : t.nav.about === "About"
            ? "High-speed infrastructure for maximum performance"
            : "Инфрасохтори тезкор барои самаранокии максималӣ",
    },
    {
      icon: Users,
      title:
        t.nav.about === "О компании" ? "Поддержка 24/7" : t.nav.about === "About" ? "24/7 Support" : "Дастгирии 24/7",
      description:
        t.nav.about === "О компании"
          ? "Круглосуточная техническая поддержка для решения любых вопросов"
          : t.nav.about === "About"
            ? "Round-the-clock technical support to solve any issues"
            : "Дастгирии техникии шабонарӯзӣ барои ҳалли ҳама гуна масъалаҳо",
    },
    {
      icon: Award,
      title: t.nav.about === "О компании" ? "Надёжность" : t.nav.about === "About" ? "Reliability" : "Боэътимодӣ",
      description:
        t.nav.about === "О компании"
          ? "Гарантированное время работы 99.98% для вашего бизнеса"
          : t.nav.about === "About"
            ? "Guaranteed 99.98% uptime for your business"
            : "Вақти кории кафолатдодашудаи 99.98% барои тиҷорати шумо",
    },
    {
      icon: Globe2,
      title:
        t.nav.about === "О компании"
          ? "Глобальная сеть"
          : t.nav.about === "About"
            ? "Global Network"
            : "Шабакаи ҷаҳонӣ",
      description:
        t.nav.about === "О компании"
          ? "Дата-центры по всему миру для минимальной задержки"
          : t.nav.about === "About"
            ? "Data centers worldwide for minimal latency"
            : "Маркази додаҳо дар тамоми ҷаҳон барои таъхири минималӣ",
    },
    {
      icon: Server,
      title: t.nav.about === "О компании" ? "Масштабируемость" : t.nav.about === "About" ? "Scalability" : "Васеъшавӣ",
      description:
        t.nav.about === "О компании"
          ? "Легко масштабируйте ресурсы по мере роста вашего бизнеса"
          : t.nav.about === "About"
            ? "Easily scale resources as your business grows"
            : "Захираҳоро осон васеъ кунед ҳамроҳи рушди тиҷорати шумо",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          icon={Building2}
          eyebrow="Listopad Cloud"
          title={t.nav.about === "О компании" ? "О компании" : t.nav.about === "About" ? "About Us" : "Дар бораи мо"}
          description={
            t.nav.about === "О компании"
              ? "Listopad Cloud — ведущий поставщик облачных решений, предоставляющий надёжную и масштабируемую инфраструктуру для бизнеса любого размера. Мы стремимся обеспечить лучший сервис и производительность для наших клиентов."
              : t.nav.about === "About"
                ? "Listopad Cloud is a leading cloud solutions provider, offering reliable and scalable infrastructure for businesses of any size. We strive to provide the best service and performance for our clients."
                : "Listopad Cloud пешбари пешниҳоддиҳандаи ҳалҳои абрӣ мебошад, ки инфрасохтори боэътимод ва васеъшавандаро барои тиҷорати ҳар андоза пешниҳод мекунад. Мо кӯшиш мекунем, ки беҳтарин хидмат ва самаранокиро барои муштариёни худ таъмин намоем."
          }
        />

        {/* Stats */}
        <section className="relative pb-8">
          <div className="container mx-auto px-4">
            <Stagger className="glass grid grid-cols-2 overflow-hidden rounded-[2rem] md:grid-cols-4">
              {stats.map((stat, index) => (
                <StaggerItem
                  key={index}
                  className={`relative p-6 text-center md:p-10 ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index === 2 ? "md:border-l" : ""} border-border/60`}
                >
                  <CountUp value={stat.value} className="text-brand-gradient block font-display text-3xl font-medium tracking-tight md:text-5xl" />
                  <div className="mt-3 text-sm text-muted-foreground">{stat.label}</div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={
                t.nav.about === "О компании"
                  ? "Почему выбирают нас"
                  : t.nav.about === "About"
                    ? "Why Choose Us"
                    : "Чаро моро интихоб мекунанд"
              }
              className="mb-12 md:mb-16"
            />
            <FeatureGrid features={features} />
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
