"use client"

import { useLanguage } from "@/hooks/use-language"
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export function Footer() {
  const { t } = useLanguage()

  const columns: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
    {
      title: t.footer.company,
      links: [
        { href: "/about", label: t.nav.about },
        { href: "/pricing", label: t.nav.pricing },
        { href: "/contact", label: t.nav.contact },
      ],
    },
    {
      title: t.footer.products,
      links: [
        { href: "/pricing", label: t.products.cloudServer.title },
        { href: "/cdn", label: t.products.cdn.title },
        { href: "/dns", label: t.products.dns.title },
        { href: "/waf", label: t.products.waf.title },
        { href: "/nkt-hub", label: "NKT-HUB" },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { href: "/terms", label: t.footer.terms },
        { href: "/privacy", label: t.footer.privacy },
        { href: "/docs", label: "Docs" },
      ],
    },
  ]

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border/60">
      {/* top light seam */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="container relative mx-auto px-4 pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-violet/10 ring-1 ring-brand/20">
                <Image src="/images/logo-icon.png" alt="" width={25} height={20} className="h-5 w-[25px]" />
              </span>
              <span className="font-display text-xl font-medium tracking-tight">Listopad</span>
            </Link>
            <p className="max-w-sm text-pretty text-muted-foreground">{t.footer.description}</p>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <ContactRow icon={<Mail className="h-4 w-4" />} href="mailto:sales@listopad.tj">
                sales@listopad.tj
              </ContactRow>
              <ContactRow icon={<Phone className="h-4 w-4" />} href="tel:+992789913054">
                +992 78 991-3054
              </ContactRow>
              <ContactRow icon={<MapPin className="h-4 w-4" />}>{t.common.address}</ContactRow>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">{col.title}</h3>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                          {l.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">{t.common.socials}</h3>
              <a
                href="https://t.me/ListopadCloud"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle group inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm text-muted-foreground transition-all hover:border-brand/40 hover:text-foreground"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#229ED9] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm58.8 82.6l-19.7 92.9c-1.5 6.6-5.5 8.3-11.2 5.2l-31-22.9-15 14.5c-1.7 1.7-3.1 3.1-6.4 3.1l2.3-32.5 59.2-53.5c2.6-2.3-.6-3.6-4-1.3l-73.2 46-31.6-9.9c-6.9-2.2-7-6.9 1.4-10.2l123.6-47.7c5.7-2.1 10.7 1.4 8.6 10.3z" />
                  </svg>
                </span>
                Telegram
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden className="pointer-events-none mt-16 select-none overflow-hidden">
          <div className="mask-fade-b bg-gradient-to-b from-foreground/[0.14] to-foreground/0 bg-clip-text text-center font-display text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent md:text-[15vw]">
            LISTOPAD
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>{t.footer.rights}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-accent/70 hover:text-foreground"
          >
            {t.common.backToTop}
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function ContactRow({ icon, href, children }: { icon: ReactNode; href?: string; children: ReactNode }) {
  const inner = (
    <>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/70 text-brand">{icon}</span>
      <span>{children}</span>
    </>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="inline-flex items-center gap-3 transition-colors hover:text-foreground">
          {inner}
        </a>
      ) : (
        <span className="inline-flex items-center gap-3">{inner}</span>
      )}
    </li>
  )
}
