"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ServerConfigurator from "@/components/server-configurator"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

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
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-balance text-5xl font-bold">{pageTitle}</h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{heroText}</p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex"
                >
                  <Card
                    className={`relative flex flex-1 flex-col border-2 ${
                      plan.popular ? "border-blue-500 shadow-lg" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 text-sm font-medium text-white">
                        {popularBadge}
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>

                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{perMonth}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col">
                      <ul className="flex-1 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10">
                              <Check className="h-3 w-3 text-blue-500" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="mt-6 w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => {
                          window.location.href = orderUrl
                        }}
                      >
                        {orderLabel}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
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