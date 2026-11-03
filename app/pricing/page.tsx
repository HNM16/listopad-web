"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ServerConfigurator from "@/components/server-configurator"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { ArrowRight, Check, Sparkles, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

type Lang = "ru" | "en" | "tj"

export default function PricingPage() {
  const { t, language } = useLanguage() as unknown as { t: any; language: Lang }

  const orderUrl = "https://my.listopad.tj/auth/login"

  const tr = (ru: string, en: string, tj: string) => (language === "ru" ? ru : language === "en" ? en : tj)

  const perMonth = tr("/мес", "/mo", "/моҳ")

  const plans = [
    {
      name: tr("Базовый", "Basic", "Асосӣ"),
      price: tr("от 130 TJS", "from 130 TJS", "аз 130 TJS"),
      description: tr("Для небольших проектов", "For small projects", "Барои лоиҳаҳои хурд"),
      features: [
        "1 vCPU",
        "1 GB RAM",
        "20 GB NVMe",
        tr("1 TB трафик", "1 TB traffic", "1 TB трафик"),
        tr("Базовая поддержка", "Basic support", "Дастгирии асосӣ"),
      ],
    },
    {
      name: tr("Профессиональный", "Professional", "Касбӣ"),
      price: tr("от 560 TJS", "from 560 TJS", "аз 560 TJS"),
      description: tr("Для растущего бизнеса", "For growing business", "Барои тиҷорати рушдёбанда"),
      features: [
        "4 vCPU",
        "4 GB RAM",
        "80 GB NVMe",
        tr("4 TB трафик", "4 TB traffic", "4 TB трафик"),
        tr("Приоритетная поддержка", "Priority support", "Дастгирии афзалиятнок"),
        tr("Резервное копирование", "Backup", "Нусхабардорӣ"),
      ],
      popular: true,
    },
    {
      name: tr("Корпоративный", "Enterprise", "Корпоративӣ"),
      price: tr("от 1100 TJS", "from 1100 TJS", "аз 1100 TJS"),
      description: tr("Для крупных компаний", "For large companies", "Барои ширкатҳои калон"),
      features: [
        "8 vCPU",
        "8 GB RAM",
        "160 GB NVMe",
        tr("8 TB трафик", "8 TB traffic", "8 TB трафик"),
        tr("Поддержка 24/7", "24/7 support", "Дастгирии 24/7"),
        tr("Резервное копирование", "Backup", "Нусхабардорӣ"),
        tr("Выделенный менеджер", "Dedicated manager", "Менеҷери махсус"),
      ],
    },
  ]

  const pageTitle = tr("Цены", "Pricing", "Нархҳо")
  const heroText = tr(
    "Выберите план, который подходит для вашего бизнеса. Все планы включают базовые функции безопасности и производительности.",
    "Choose a plan that fits your business. All plans include basic security and performance features.",
    "Нақшаеро интихоб кунед, ки ба тиҷорати шумо мувофиқ аст. Ҳамаи нақшаҳо хусусиятҳои асосии бехатарӣ ва самаранокиро дар бар мегиранд.",
  )

  const popularBadge = tr("Популярный", "Popular", "Маъмул")

  const orderLabel = t?.configurator?.order || tr("Заказать", "Order", "Фармоиш додан")

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero icon={Wallet} title={pageTitle} description={heroText} />

        {/* Pricing Plans */}
        <section className="relative pb-10">
          <div className="container mx-auto px-4">
            <div className="grid items-stretch gap-5 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Reveal key={index} delay={index * 0.1} className={cn("flex", plan.popular && "md:-my-4")}>
                  <div className={cn("flex flex-1 rounded-[2rem]", plan.popular && "ring-gradient")}>
                    <SpotlightCard
                      tilt
                      className={cn(
                        "relative flex flex-1 flex-col rounded-[inherit] p-7 md:p-9",
                        plan.popular && "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_55%)]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
                        {plan.popular && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-cyan via-brand to-brand-violet px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_var(--brand)]">
                            <Sparkles className="h-3 w-3" />
                            {popularBadge}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                      <div className="mt-8 flex items-baseline gap-1.5">
                        <span className="font-display text-3xl font-medium tracking-tight md:text-[2.1rem]">{plan.price}</span>
                        <span className="text-muted-foreground">{perMonth}</span>
                      </div>

                      <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                      <ul className="flex-1 space-y-3.5">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full", plan.popular ? "bg-brand text-white" : "bg-brand/10 text-brand")}>
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        size="lg"
                        className="group mt-10 w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => {
                          window.location.href = orderUrl
                        }}
                      >
                        {orderLabel}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </SpotlightCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Configurator Section */}
        <ServerConfigurator />
      </main>
      <Footer />
    </div>
  )
}
