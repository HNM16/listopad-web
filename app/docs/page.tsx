"use client"

import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function DocsIndexPage() {
  const { t } = useLanguage()

  const tr = (ru: string, en: string, tj: string) =>
    t.nav.about === "О компании" ? ru : t.nav.about === "About" ? en : tj

  const sections = [
    {
      href: "/docs/overview",
      title: tr("Обзор облака", "Cloud Overview", "Шарҳи абр"),
      desc: tr(
        "Обзор панели управления, ресурсов и навигации.",
        "Overview of dashboard, resources and navigation.",
        "Шарҳи панели идоракунӣ, захираҳо ва навигатсия.",
      ),
    },
    {
      href: "/docs/networks",
      title: tr("Сети", "Networks", "Шабакаҳо"),
      desc: tr(
        "Виртуальные сети, подсети и базовые сетевые концепции.",
        "Virtual networks, subnets and basic networking concepts.",
        "Шабакаҳои виртуалӣ, subnet-ҳо ва мафҳумҳои асосии шабака.",
      ),
    },
    {
      href: "/docs/routers",
      title: tr("Маршрутизаторы", "Routers", "Маршрутизаторҳо"),
      desc: tr(
        "Создание маршрутизаторов и подключение подсетей.",
        "Creating routers and attaching subnets.",
        "Эҷоди маршрутизаторҳо ва пайваст кардани subnet-ҳо.",
      ),
    },
    {
      href: "/docs/virtual-machines",
      title: tr("Виртуальные машины", "Virtual Machines", "Мошинҳои виртуалӣ"),
      desc: tr(
        "Создание виртуальных машин и выбор конфигурации.",
        "Creating virtual machines and choosing configuration.",
        "Эҷоди мошинҳои виртуалӣ ва интихоби конфигуратсия.",
      ),
    },
    {
      href: "/docs/load-balancer",
      title: tr("Балансировщик", "Load Balancer", "Балансировщик"),
      desc: tr(
        "Создание балансировщика и настройка backend-узлов.",
        "Creating a load balancer and configuring backend nodes.",
        "Эҷоди балансировщик ва танзими backend-узлҳо.",
      ),
    },
    {
      href: "/docs/ssh-keys",
      title: tr("SSH ключи", "SSH Keys", "Калидҳои SSH"),
      desc: tr(
        "Добавление SSH-ключей и доступ к серверу.",
        "Adding SSH keys and accessing servers.",
        "Илова кардани калидҳои SSH ва дастрасӣ ба сервер.",
      ),
    },
    {
      href: "/docs/floating-ip",
      title: tr("Плавающий IP", "Floating IP", "IP-и шинокунанда"),
      desc: tr(
        "Выделение и привязка внешних IP-адресов.",
        "Allocating and attaching public IP addresses.",
        "Ҷудо кардан ва пайваст кардани IP-ҳои беруна.",
      ),
    },
    {
      href: "/docs/disks-snapshots",
      title: tr("Диски и снапшоты", "Disks & Snapshots", "Дискҳо ва snapshot-ҳо"),
      desc: tr(
        "Хранение данных, диски, снапшоты и резервирование.",
        "Storage, disks, snapshots and backup logic.",
        "Нигоҳдории маълумот, дискҳо, snapshot-ҳо ва эҳтиётӣ.",
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-medium">
          {tr("Документация", "Documentation", "Ҳуҷҷатгузорӣ")}
        </h2>
        <p className="text-muted-foreground mt-3">
          {tr(
            "Выберите раздел ниже, чтобы изучить работу с панелью Listopad Cloud.",
            "Choose a section below to learn how to work with the Listopad Cloud panel.",
            "Барои омӯхтани кори панели Listopad Cloud, як бахшро аз поён интихоб кунед.",
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section, index) => (
          <Reveal key={section.href} delay={(index % 2) * 0.08} className="h-full">
            <Link href={section.href} className="group block h-full rounded-3xl">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground/70">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.desc}</p>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}