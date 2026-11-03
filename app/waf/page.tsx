"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Lock, Eye, AlertTriangle, Activity, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import Link from "next/link"


export default function WAFPage() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
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
          ? "Защита от SQL-инъекций, XSS, CSRF и других веб-атак"
          : t.nav.about === "About"
            ? "Protection from SQL injections, XSS, CSRF and other web attacks"
            : "Ҳифз аз SQL-инъексияҳо, XSS, CSRF ва дигар ҳамлаҳои веб",
    },
    {
      icon: Lock,
      title:
        t.nav.about === "О компании"
          ? "Фильтрация трафика"
          : t.nav.about === "About"
            ? "Traffic Filtering"
            : "Филтркунии трафик",
      description:
        t.nav.about === "О компании"
          ? "Интеллектуальная фильтрация вредоносного трафика в реальном времени"
          : t.nav.about === "About"
            ? "Intelligent filtering of malicious traffic in real-time"
            : "Филтркунии зираки трафики зараровар дар вақти воқеӣ",
    },
    {
      icon: Eye,
      title:
        t.nav.about === "О компании"
          ? "Мониторинг угроз"
          : t.nav.about === "About"
            ? "Threat Monitoring"
            : "Мониторинги таҳдидҳо",
      description:
        t.nav.about === "О компании"
          ? "Постоянный мониторинг и анализ угроз безопасности"
          : t.nav.about === "About"
            ? "Continuous monitoring and analysis of security threats"
            : "Мониторинг ва таҳлили доимии таҳдидҳои бехатарӣ",
    },
    {
      icon: AlertTriangle,
      title:
        t.nav.about === "О компании"
          ? "Обнаружение аномалий"
          : t.nav.about === "About"
            ? "Anomaly Detection"
            : "Муайян кардани аномалияҳо",
      description:
        t.nav.about === "О компании"
          ? "Автоматическое обнаружение подозрительной активности"
          : t.nav.about === "About"
            ? "Automatic detection of suspicious activity"
            : "Муайян кардани худкори фаъолияти шубҳанок",
    },
    {
      icon: Activity,
      title:
        t.nav.about === "О компании"
          ? "Детальные отчёты"
          : t.nav.about === "About"
            ? "Detailed Reports"
            : "Ҳисоботҳои муфассал",
      description:
        t.nav.about === "О компании"
          ? "Подробные отчёты о заблокированных атаках и угрозах"
          : t.nav.about === "About"
            ? "Detailed reports on blocked attacks and threats"
            : "Ҳисоботҳои муфассал дар бораи ҳамлаҳо ва таҳдидҳои манъшуда",
    },
    {
      icon: CheckCircle2,
      title:
        t.nav.about === "О компании"
          ? "Соответствие стандартам"
          : t.nav.about === "About"
            ? "Compliance"
            : "Мутобиқат ба стандартҳо",
      description:
        t.nav.about === "О компании"
          ? "Соответствие требованиям PCI DSS, GDPR и других стандартов"
          : t.nav.about === "About"
            ? "Compliance with PCI DSS, GDPR and other standards"
            : "Мутобиқат ба талаботи PCI DSS, GDPR ва дигар стандартҳо",
    },
  ]

  const benefits = [
    t.nav.about === "О компании"
      ? "Защита от OWASP Top 10 угроз"
      : t.nav.about === "About"
        ? "Protection from OWASP Top 10 threats"
        : "Ҳифз аз таҳдидҳои OWASP Top 10",
    t.nav.about === "О компании"
      ? "Блокировка ботов и скраперов"
      : t.nav.about === "About"
        ? "Block bots and scrapers"
        : "Манъ кардани ботҳо ва скраперҳо",
    t.nav.about === "О компании"
      ? "Защита API и приложений"
      : t.nav.about === "About"
        ? "API and application protection"
        : "Ҳифзи API ва барномаҳо",
    t.nav.about === "О компании"
      ? "Предотвращение утечки данных"
      : t.nav.about === "About"
        ? "Data leak prevention"
        : "Пешгирии нашти маълумот",
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
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-balance text-5xl font-bold">WAF</h1>
              <p className="text-muted-foreground mt-6 text-pretty text-lg leading-relaxed">
                {t.nav.about === "О компании"
                  ? "Web Application Firewall (WAF) для защиты ваших веб-приложений от современных угроз. Обеспечьте безопасность вашего бизнеса с нашим продвинутым WAF."
                  : t.nav.about === "About"
                    ? "Web Application Firewall (WAF) to protect your web applications from modern threats. Ensure your business security with our advanced WAF."
                    : "Web Application Firewall (WAF) барои ҳифзи барномаҳои веби шумо аз таҳдидҳои муосир. Бехатарии тиҷорати худро бо WAF-и пешрафтаи мо таъмин намоед."}
              </p>
         <div className="mt-8 flex flex-wrap justify-center gap-4">
 <a href="https://my.listopad.tj/auth/login">
  <Button size="lg">{t.configurator.order}</Button>
</a>
</div>

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
                  ? "Возможности WAF"
                  : t.nav.about === "About"
                    ? "WAF Features"
                    : "Имкониятҳои WAF"}
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

        {/* Benefits Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold">
                {t.nav.about === "О компании"
                  ? "Преимущества использования WAF"
                  : t.nav.about === "About"
                    ? "Benefits of Using WAF"
                    : "Бартариҳои истифодаи WAF"}
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
