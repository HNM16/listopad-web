"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { BookOpen, Download } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/docs", key: "overview" },
  { href: "/docs/overview", key: "cloudOverview" },
  { href: "/docs/networks", key: "networks" },
  { href: "/docs/routers", key: "routers" },
  { href: "/docs/virtual-machines", key: "virtualMachines" },
  { href: "/docs/load-balancer", key: "loadBalancer" },
  { href: "/docs/ssh-keys", key: "sshKeys" },
  { href: "/docs/floating-ip", key: "floatingIp" },
  { href: "/docs/disks-snapshots", key: "disksSnapshots" },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useLanguage()
  const pathname = usePathname()

  const tr = (ru: string, en: string, tj: string) =>
    t.nav.about === "О компании" ? ru : t.nav.about === "About" ? en : tj

  const labels: Record<string, string> = {
    overview: tr("Документация", "Documentation", "Ҳуҷҷатгузорӣ"),
    cloudOverview: tr("Обзор облака", "Cloud Overview", "Шарҳи абр"),
    networks: tr("Сети", "Networks", "Шабакаҳо"),
    routers: tr("Маршрутизаторы", "Routers", "Маршрутизаторҳо"),
    virtualMachines: tr("Виртуальные машины", "Virtual Machines", "Мошинҳои виртуалӣ"),
    loadBalancer: tr("Балансировщик", "Load Balancer", "Балансировщик"),
    sshKeys: tr("SSH ключи", "SSH Keys", "Калидҳои SSH"),
    floatingIp: tr("Плавающий IP", "Floating IP", "IP-и шинокунанда"),
    disksSnapshots: tr("Диски и снапшоты", "Disks & Snapshots", "Дискҳо ва snapshot-ҳо"),
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <PageHero
          icon={BookOpen}
          className="md:pb-16"
          title={labels.overview}
          description={tr(
            "Техническая документация по панели управления и облачным сервисам Listopad Cloud.",
            "Technical documentation for the Listopad Cloud control panel and cloud services.",
            "Ҳуҷҷатҳои техникӣ барои панели идоракунӣ ва хизматрасониҳои абрии Listopad Cloud.",
          )}
        />

        <section className="container mx-auto px-4 pb-24">
          <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-12">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass rounded-3xl p-3">
                <div className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {labels.overview}
                </div>

                <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative shrink-0 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          isActive ? "text-white" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="docs-active"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-brand-violet shadow-[0_8px_24px_-10px_var(--brand)]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{labels[item.key]}</span>
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-3 border-t border-border/60 pt-3">
                  <a
                    href="/docs/Listopad_Cloud_Documentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-accent/60"
                  >
                    <Download className="h-4 w-4" />
                    {tr("Скачать PDF", "Download PDF", "PDF-ро зеркашӣ кунед")}
                  </a>
                </div>
              </div>
            </aside>

            <div className="min-w-0">{children}</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}