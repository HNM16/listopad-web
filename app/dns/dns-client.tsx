"use client"

import { ProductPage } from "@/components/product-page"
import { useLanguage } from "@/hooks/use-language"
import { CheckCircle2, Globe, Network, Settings, Shield, Zap } from "lucide-react"

export default function DNSClient() {
  const { t } = useLanguage()

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
    <ProductPage
      icon={Network}
      title="DNS"
      description={
        t.nav.about === "О компании"
          ? "Управление доменными именами с высокой производительностью и надёжностью. Наш DNS-сервис обеспечивает быстрое разрешение запросов и защиту от атак."
          : t.nav.about === "About"
            ? "Domain name management with high performance and reliability. Our DNS service provides fast query resolution and attack protection."
            : "Идоракунии номҳои домен бо самаранокӣ ва боэътимодии баланд. Хидмати DNS-и мо ҳалли тези дархостҳо ва ҳифз аз ҳамлаҳоро таъмин мекунад."
      }
      featuresTitle={
        t.nav.about === "О компании"
          ? "Возможности DNS"
          : t.nav.about === "About"
            ? "DNS Features"
            : "Имкониятҳои DNS"
      }
      features={features}
      benefitsTitle={
        t.nav.about === "О компании"
          ? "Преимущества использования DNS"
          : t.nav.about === "About"
            ? "Benefits of Using DNS"
            : "Бартариҳои истифодаи DNS"
      }
      benefits={benefits}
    />
  )
}
