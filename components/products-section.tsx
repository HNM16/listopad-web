"use client"

import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  { image: "/images/products/cloud-server.png", key: "cloudServer" as const, link: "/pricing", tag: "VPS · NVMe" },
  { image: "/images/products/cdn.png", key: "cdn" as const, link: "/cdn", tag: "Edge" },
  { image: "/images/products/dns.png", key: "dns" as const, link: "/dns", tag: "Anycast" },
  { image: "/images/products/waf.png", key: "waf" as const, link: "/waf", tag: "L7 Security" },
]

// Bento placement for the four products (lg+).
const LAYOUT = ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-1", "lg:col-span-1"]

export function ProductsSection() {
  const { t } = useLanguage()

  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={t.home.productsEyebrow}
          title={t.products.title}
          subtitle={t.home.productsSubtitle}
          className="mb-14 md:mb-20"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(280px,auto)] lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => {
            const featured = index === 0
            const compact = index >= 2
            return (
              <Reveal key={product.key} delay={index * 0.08} className={cn(LAYOUT[index], "h-full")}>
                <Link href={product.link} className="group block h-full rounded-3xl focus-visible:outline-offset-4">
                  <SpotlightCard tilt className={cn("flex h-full flex-col p-6 md:p-8", featured && "lg:p-10")}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      <span className="rounded-full border border-border/70 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {product.tag}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "relative my-6 flex flex-1 items-center justify-center",
                        featured ? "min-h-48 lg:min-h-72" : "min-h-32",
                        compact && "lg:my-4 lg:min-h-24",
                      )}
                    >
                      <div className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-brand/15 blur-3xl transition-all duration-700 group-hover:bg-brand/30 group-hover:blur-[70px]" />
                      <Image
                        src={product.image}
                        alt={t.products[product.key].title}
                        width={featured ? 260 : 150}
                        height={featured ? 260 : 150}
                        className={cn(
                          "relative h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,90,200,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.06]",
                          featured ? "w-40 lg:w-60" : "w-24 md:w-28",
                          compact && "lg:w-24",
                        )}
                      />
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className={cn("font-semibold tracking-tight", featured ? "text-2xl lg:text-3xl" : "text-xl")}>
                          {t.products[product.key].title}
                        </h3>
                        <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                          {t.products[product.key].description}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_10px_30px_-8px_var(--brand)]"
                      >
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                      </span>
                    </div>
                    <span className="sr-only">{t.products.learnMore}</span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
