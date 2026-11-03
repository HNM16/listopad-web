"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useLanguage } from "@/hooks/use-language"
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

      <main className="pt-16">
        <section className="border-b bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold md:text-5xl">{labels.overview}</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {tr(
                  "Техническая документация по панели управления и облачным сервисам Listopad Cloud.",
                  "Technical documentation for the Listopad Cloud control panel and cloud services.",
                  "Ҳуҷҷатҳои техникӣ барои панели идоракунӣ ва хизматрасониҳои абрии Listopad Cloud.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border bg-card p-4 shadow-sm">
                <div className="mb-3 text-sm font-semibold text-muted-foreground">
                  {labels.overview}
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-blue-500 text-white hover:bg-blue-500"
                            : "hover:bg-muted"
                        }`}
                      >
                        {labels[item.key]}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-4 border-t pt-4">
                  <a
                    href="/docs/Listopad_Cloud_Documentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-2 text-sm text-blue-600 transition-colors hover:bg-muted dark:text-blue-400"
                  >
                    {tr(
                      "Скачать PDF",
                      "Download PDF",
                      "PDF-ро зеркашӣ кунед",
                    )}
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