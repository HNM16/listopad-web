"use client"

import { ProductPage } from "@/components/product-page"
import { useLanguage } from "@/hooks/use-language"
import { Shield, Lock, Eye, AlertTriangle, Activity, CheckCircle2 } from "lucide-react"

export default function WAFPage() {
  const { t } = useLanguage()

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
    <ProductPage
      icon={Shield}
      title="WAF"
      description={
        t.nav.about === "О компании"
          ? "Web Application Firewall (WAF) для защиты ваших веб-приложений от современных угроз. Обеспечьте безопасность вашего бизнеса с нашим продвинутым WAF."
          : t.nav.about === "About"
            ? "Web Application Firewall (WAF) to protect your web applications from modern threats. Ensure your business security with our advanced WAF."
            : "Web Application Firewall (WAF) барои ҳифзи барномаҳои веби шумо аз таҳдидҳои муосир. Бехатарии тиҷорати худро бо WAF-и пешрафтаи мо таъмин намоед."
      }
      featuresTitle={
        t.nav.about === "О компании"
          ? "Возможности WAF"
          : t.nav.about === "About"
            ? "WAF Features"
            : "Имкониятҳои WAF"
      }
      features={features}
      benefitsTitle={
        t.nav.about === "О компании"
          ? "Преимущества использования WAF"
          : t.nav.about === "About"
            ? "Benefits of Using WAF"
            : "Бартариҳои истифодаи WAF"
      }
      benefits={benefits}
    />
  )
}
