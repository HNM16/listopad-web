"use client"

import { Marquee } from "@/components/fx/marquee"
import { Reveal } from "@/components/fx/reveal"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

const clients = [
  { name: "Xymo", logo: "/images/clients/xymo.webp" },
  { name: "Фотострана", logo: "/images/clients/fotostrana.png" },
  { name: "PAYDO", logo: "/images/clients/paydo.svg" },
  { name: "DocX", logo: "/images/clients/docx.png" },
]

export function ClientsSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4">
        <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{t.home.clientsEyebrow}</span>
          <h2 className="text-2xl font-medium md:text-3xl">{t.clients.title}</h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} blur={false}>
        <Marquee duration={30}>
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="glass-subtle group mx-3 flex h-24 w-56 items-center justify-center rounded-2xl px-8 transition-all duration-500 hover:border-brand/30 md:mx-4 md:w-64"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={44}
                className="h-9 w-auto max-w-[150px] object-contain opacity-60 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-125"
              />
            </div>
          ))}
        </Marquee>
      </Reveal>
      <div aria-hidden className="absolute inset-x-0 bottom-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
