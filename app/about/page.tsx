"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Users, Award, Globe2, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
              <h1 className="text-balance text-5xl font-bold">
                {t.nav.about === "О компании" ? "О компании" : t.nav.about === "About" ? "About Us" : "Дар бораи мо"}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t.nav.about === "О компании"
                  ? "Listopad Cloud — ведущий поставщик облачных решений, предоставляющий надёжную и масштабируемую инфраструктуру для бизнеса любого размера. Мы стремимся обеспечить лучший сервис и производительность для наших клиентов."
                  : t.nav.about === "About"
                    ? "Listopad Cloud is a leading cloud solutions provider, offering reliable and scalable infrastructure for businesses of any size. We strive to provide the best service and performance for our clients."
                    : "Listopad Cloud пешбари пешниҳоддиҳандаи ҳалҳои абрӣ мебошад, ки инфрасохтори боэътимод ва васеъшавандаро барои тиҷорати ҳар андоза пешниҳод мекунад. Мо кӯшиш мекунем, ки беҳтарин хидмат ва самаранокиро барои муштариёни худ таъмин намоем."}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
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
                  ? "Почему выбирают нас"
                  : t.nav.about === "About"
                    ? "Why Choose Us"
                    : "Чаро моро интихоб мекунанд"}
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
                      <p className="text-pretty leading-relaxed text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
