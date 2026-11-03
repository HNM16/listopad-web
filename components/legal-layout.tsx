"use client"

import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import { useEffect, useState, type ReactNode } from "react"

export type LegalSection = { title: string; body: string }

/** Long-form legal content: sticky table of contents with scroll-spy + numbered glass sections. */
export function LegalLayout({ sections, footer }: { sections: LegalSection[]; footer?: ReactNode }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = sections.map((_, i) => document.getElementById(`section-${i + 1}`)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(Number(visible[0].target.id.replace("section-", "")) - 1)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav className="glass sticky top-28 rounded-3xl p-3" aria-label="Contents">
              <ol className="max-h-[70vh] space-y-0.5 overflow-auto">
                {sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i + 1}`}
                      className={cn(
                        "relative block rounded-xl px-3 py-2 text-sm leading-snug transition-colors",
                        active === i ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      {active === i && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand" />}
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-4">
            {sections.map((s, i) => (
              <Reveal key={i} y={20} amount={0.15}>
                <article id={`section-${i + 1}`} className="glass group rounded-3xl p-6 transition-colors duration-500 hover:border-brand/25 md:p-9">
                  <h2 className="font-sans text-xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-2xl">{s.title}</h2>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{s.body}</p>
                </article>
              </Reveal>
            ))}
            {footer}
          </div>
        </div>
      </div>
    </section>
  )
}
