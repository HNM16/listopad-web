"use client"

import { ProductPage } from "@/components/product-page"
import { useLanguage } from "@/hooks/use-language"
import { BarChart3, CheckCircle2, Clock, Globe2, Shield, Zap } from "lucide-react"

export default function CDNClient() {
  const { t } = useLanguage()

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
    <ProductPage
      icon={Globe2}
      title="CDN"
      description={
        t.nav.about === "О компании"
          ? "Сеть доставки контента (CDN) для ускорения загрузки вашего сайта и улучшения пользовательского опыта. Доставляйте контент быстрее с нашей глобальной сетью серверов."
          : t.nav.about === "About"
            ? "Content Delivery Network (CDN) to speed up your website loading and improve user experience. Deliver content faster with our global server network."
            : "Шабакаи расонидани мундариҷа (CDN) барои тезонидани боркунии сомонаи шумо ва беҳтар кардани таҷрибаи корбар. Мундариҷаро тезтар бо шабакаи ҷаҳонии серверҳои мо расонед."
      }
      featuresTitle={
        t.nav.about === "О компании"
          ? "Возможности CDN"
          : t.nav.about === "About"
            ? "CDN Features"
            : "Имкониятҳои CDN"
      }
      features={features}
      benefitsTitle={
        t.nav.about === "О компании"
          ? "Преимущества использования CDN"
          : t.nav.about === "About"
            ? "Benefits of Using CDN"
            : "Бартариҳои истифодаи CDN"
      }
      benefits={benefits}
    />
  )
}
