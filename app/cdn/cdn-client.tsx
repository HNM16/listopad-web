"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { motion, useInView } from "framer-motion"
import { BarChart3, CheckCircle2, Clock, Globe2, Shield, Zap } from "lucide-react"
import { useRef } from "react"

export default function CDNClient() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Zap,
      title:
        t.nav.about === "О компании"
          ? "Молниеносная скорость"
          : t.nav.about === "About"
            ? "Lightning Fast"
            : "Суръати барқасо",
      description:
        t.nav.about === "О компании"
          ? "Доставка контента с минимальной задержкой благодаря глобальной сети серверов"
          : t.nav.about === "About"
            ? "Content delivery with minimal latency thanks to global server network"
            : "Расонидани мундариҷа бо таъхири минималӣ ба туфайли шабакаи ҷаҳонии серверҳо",
    },
    {
      icon: Globe2,
      title:
        t.nav.about === "О компании"
          ? "Глобальное покрытие"
          : t.nav.about === "About"
            ? "Global Coverage"
            : "Пӯшиши ҷаҳонӣ",
      description:
        t.nav.about === "О компании"
          ? "Более 50 точек присутствия по всему миру для быстрой доставки контента"
          : t.nav.about === "About"
            ? "Over 50 points of presence worldwide for fast content delivery"
            : "Зиёда аз 50 нуқтаи ҳузур дар тамоми ҷаҳон барои расонидани тези мундариҷа",
    },
    {
      icon: Shield,
      title:
        t.nav.about === "О компании" ? "Защита от DDoS" : t.nav.about === "About" ? "DDoS Protection" : "Ҳифз аз DDoS",
      description:
        t.nav.about === "О компании"
          ? "Встроенная защита от DDoS-атак для обеспечения доступности вашего контента"
          : t.nav.about === "About"
            ? "Built-in DDoS protection to ensure your content availability"
            : "Ҳифзи дарунсохти аз ҳамлаҳои DDoS барои таъмини дастрасии мундариҷаи шумо",
    },
    {
      icon: BarChart3,
      title:
        t.nav.about === "О компании"
          ? "Аналитика в реальном времени"
          : t.nav.about === "About"
            ? "Real-time Analytics"
            : "Таҳлили вақти воқеӣ",
      description:
        t.nav.about === "О компании"
          ? "Подробная статистика и мониторинг производительности вашего CDN"
          : t.nav.about === "About"
            ? "Detailed statistics and performance monitoring of your CDN"
            : "Омори муфассал ва мониторинги самаранокии CDN-и шумо",
    },
    {
      icon: Clock,
      title:
        t.nav.about === "О компании" ? "Кэширование" : t.nav.about === "About" ? "Smart Caching" : "Кэшкунии зирак",
      description:
        t.nav.about === "О компании"
          ? "Интеллектуальное кэширование для оптимизации доставки контента"
          : t.nav.about === "About"
            ? "Intelligent caching to optimize content delivery"
            : "Кэшкунии зирак барои оптимизатсияи расонидани мундариҷа",
    },
    {
      icon: CheckCircle2,
      title:
        t.nav.about === "О компании"
          ? "Высокая доступность"
          : t.nav.about === "About"
            ? "High Availability"
            : "Дастрасии баланд",
      description:
        t.nav.about === "О компании"
          ? "Гарантированное время работы 99.99% для вашего контента"
          : t.nav.about === "About"
            ? "Guaranteed 99.99% uptime for your content"
            : "Вақти кории кафолатдодашудаи 99.99% барои мундариҷаи шумо",
    },
  ]

  const benefits = [
    t.nav.about === "О компании"
      ? "Ускорение загрузки сайта до 10 раз"
      : t.nav.about === "About"
        ? "Speed up website loading up to 10x"
        : "Тезонидани боркунии сомона то 10 маротиба",
    t.nav.about === "О компании"
      ? "Снижение нагрузки на основной сервер"
      : t.nav.about === "About"
        ? "Reduce load on main server"
        : "Кам кардани боргузорӣ ба сервери асосӣ",
    t.nav.about === "О компании"
      ? "Улучшение SEO-показателей"
      : t.nav.about === "About"
        ? "Improve SEO metrics"
        : "Беҳтар кардани нишондиҳандаҳои SEO",
    t.nav.about === "О компании"
      ? "Экономия трафика и ресурсов"
      : t.nav.about === "About"
        ? "Save traffic and resources"
        : "Сарфаи трафик ва захираҳо",
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
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-balance text-5xl font-bold">CDN</h1>
              <p className="text-muted-foreground mt-6 text-pretty text-lg leading-relaxed">
                {t.nav.about === "О компании"
                  ? "Сеть доставки контента (CDN) для ускорения загрузки вашего сайта и улучшения пользовательского опыта. Доставляйте контент быстрее с нашей глобальной сетью серверов."
                  : t.nav.about === "About"
                    ? "Content Delivery Network (CDN) to speed up your website loading and improve user experience. Deliver content faster with our global server network."
                    : "Шабакаи расонидани мундариҷа (CDN) барои тезонидани боркунии сомонаи шумо ва беҳтар кардани таҷрибаи корбар. Мундариҷаро тезтар бо шабакаи ҷаҳонии серверҳои мо расонед."}
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
                  ? "Возможности CDN"
                  : t.nav.about === "About"
                    ? "CDN Features"
                    : "Имкониятҳои CDN"}
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
                  ? "Преимущества использования CDN"
                  : t.nav.about === "About"
                    ? "Benefits of Using CDN"
                    : "Бартариҳои истифодаи CDN"}
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