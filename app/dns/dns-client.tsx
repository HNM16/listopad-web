"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Globe, Network, Settings, Shield, Zap } from "lucide-react"
import { useRef } from "react"

export default function DNSClient() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Zap,
      title:
        t.nav.about === "О компании" ? "Быстрое разрешение" : t.nav.about === "About" ? "Fast Resolution" : "Ҳалли тез",
      description:
        t.nav.about === "О компании"
          ? "Мгновенное разрешение DNS-запросов с минимальной задержкой"
          : t.nav.about === "About"
            ? "Instant DNS query resolution with minimal latency"
            : "Ҳалли фаврии дархостҳои DNS бо таъхири минималӣ",
    },
    {
      icon: Shield,
      title:
        t.nav.about === "О компании"
          ? "Защита от атак"
          : t.nav.about === "About"
            ? "Attack Protection"
            : "Ҳифз аз ҳамлаҳо",
      description:
        t.nav.about === "О компании"
          ? "Встроенная защита от DDoS и других типов атак на DNS"
          : t.nav.about === "About"
            ? "Built-in protection against DDoS and other DNS attacks"
            : "Ҳифзи дарунсохт аз DDoS ва дигар намудҳои ҳамлаҳо ба DNS",
    },
    {
      icon: Globe,
      title:
        t.nav.about === "О компании"
          ? "Глобальная сеть"
          : t.nav.about === "About"
            ? "Global Network"
            : "Шабакаи ҷаҳонӣ",
      description:
        t.nav.about === "О компании"
          ? "DNS-серверы по всему миру для быстрого доступа из любой точки"
          : t.nav.about === "About"
            ? "DNS servers worldwide for fast access from anywhere"
            : "Серверҳои DNS дар тамоми ҷаҳон барои дастрасии тез аз ҳар ҷо",
    },
    {
      icon: Settings,
      title:
        t.nav.about === "О компании"
          ? "Гибкое управление"
          : t.nav.about === "About"
            ? "Flexible Management"
            : "Идоракунии чандир",
      description:
        t.nav.about === "О компании"
          ? "Простое управление DNS-записями через удобный интерфейс"
          : t.nav.about === "About"
            ? "Easy DNS record management through convenient interface"
            : "Идоракунии осони сабтҳои DNS тавассути интерфейси қулай",
    },
    {
      icon: Network,
      title:
        t.nav.about === "О компании"
          ? "Anycast маршрутизация"
          : t.nav.about === "About"
            ? "Anycast Routing"
            : "Маршрутизатсияи Anycast",
      description:
        t.nav.about === "О компании"
          ? "Автоматическая маршрутизация к ближайшему серверу для минимальной задержки"
          : t.nav.about === "About"
            ? "Automatic routing to nearest server for minimal latency"
            : "Маршрутизатсияи худкори ба сервери наздиктарин барои таъхири минималӣ",
    },
    {
      icon: CheckCircle2,
      title:
        t.nav.about === "О компании"
          ? "Высокая надёжность"
          : t.nav.about === "About"
            ? "High Reliability"
            : "Боэътимодии баланд",
      description:
        t.nav.about === "О компании"
          ? "SLA 100% для обеспечения постоянной доступности ваших доменов"
          : t.nav.about === "About"
            ? "100% SLA to ensure constant availability of your domains"
            : "SLA 100% барои таъмини дастрасии доимии доменҳои шумо",
    },
  ]

  const benefits = [
    t.nav.about === "О компании"
      ? "Повышение скорости загрузки сайта"
      : t.nav.about === "About"
        ? "Increase website loading speed"
        : "Афзоиши суръати боркунии сомона",
    t.nav.about === "О компании"
      ? "Защита от DNS-атак"
      : t.nav.about === "About"
        ? "Protection from DNS attacks"
        : "Ҳифз аз ҳамлаҳои DNS",
    t.nav.about === "О компании"
      ? "Простое управление записями"
      : t.nav.about === "About"
        ? "Easy record management"
        : "Идоракунии осони сабтҳо",
    t.nav.about === "О компании"
      ? "Мониторинг в реальном времени"
      : t.nav.about === "About"
        ? "Real-time monitoring"
        : "Мониторинги вақти воқеӣ",
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Network className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-balance text-5xl font-bold">DNS</h1>
              <p className="text-muted-foreground mt-6 text-pretty text-lg leading-relaxed">
                {t.nav.about === "О компании"
                  ? "Управление доменными именами с высокой производительностью и надёжностью. Наш DNS-сервис обеспечивает быстрое разрешение запросов и защиту от атак."
                  : t.nav.about === "About"
                    ? "Domain name management with high performance and reliability. Our DNS service provides fast query resolution and attack protection."
                    : "Идоракунии номҳои домен бо самаранокӣ ва боэътимодии баланд. Хидмати DNS-и мо ҳалли тези дархостҳо ва ҳифз аз ҳамлаҳоро таъмин мекунад."}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <a href="https://my.listopad.tj/auth/login">{t.configurator.order}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-balance text-4xl font-bold">
                {t.nav.about === "О компании"
                  ? "Возможности DNS"
                  : t.nav.about === "About"
                    ? "DNS Features"
                    : "Имкониятҳои DNS"}
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 transition-all hover:border-blue-500 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold">
                {t.nav.about === "О компании"
                  ? "Преимущества использования DNS"
                  : t.nav.about === "About"
                    ? "Benefits of Using DNS"
                    : "Бартариҳои истифодаи DNS"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-background flex items-center gap-3 rounded-lg p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}