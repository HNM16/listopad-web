"use client"

import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import { Reveal } from "@/components/fx/reveal"

type Screenshot = {
  src: string
  alt: {
    ru: string
    en: string
    tj: string
  }
  caption: {
    ru: string
    en: string
    tj: string
  }
}

type Block = {
  title: {
    ru: string
    en: string
    tj: string
  }
  text: {
    ru: string
    en: string
    tj: string
  }[]
  steps?: {
    ru: string
    en: string
    tj: string
  }[]
  screenshots?: Screenshot[]
}

type DocsPageProps = {
  title: {
    ru: string
    en: string
    tj: string
  }
  description: {
    ru: string
    en: string
    tj: string
  }
  blocks: Block[]
}

export function DocsPageRenderer({ title, description, blocks }: DocsPageProps) {
  const { t } = useLanguage()

  const lang = t.nav.about === "О компании" ? "ru" : t.nav.about === "About" ? "en" : "tj"

  return (
    <article className="max-w-4xl space-y-10">
      <header className="space-y-3">
        <h2 className="text-3xl font-medium md:text-4xl">{title[lang]}</h2>
        <p className="text-lg text-muted-foreground">{description[lang]}</p>
      </header>

      {blocks.map((block, index) => (
        <Reveal key={index} y={20} amount={0.1}>
        <section className="glass space-y-5 rounded-3xl p-6 md:p-8">
          <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 font-mono text-sm text-brand ring-1 ring-brand/20">
              {index + 1}
            </span>
            {block.title[lang]}
          </h3>

          <div className="space-y-4">
            {block.text.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-muted-foreground leading-7">
                {paragraph[lang]}
              </p>
            ))}
          </div>

          {block.steps && block.steps.length > 0 && (
            <ol className="text-muted-foreground list-decimal space-y-2 pl-5 marker:font-semibold marker:text-brand">
              {block.steps.map((step, sIndex) => (
                <li key={sIndex}>{step[lang]}</li>
              ))}
            </ol>
          )}

          {block.screenshots && block.screenshots.length > 0 && (
            <div className="grid gap-5">
              {block.screenshots.map((shot, shotIndex) => (
                <figure
                  key={shotIndex}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-background/50 p-3"
                >
                  <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
                    <Image
                      src={shot.src}
                      alt={shot.alt[lang]}
                      fill
                      sizes="(min-width: 1024px) 860px, 100vw"
                      priority={index === 0 && shotIndex === 0}
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="text-muted-foreground mt-3 text-sm">
                    {shot.caption[lang]}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
        </Reveal>
      ))}
    </article>
  )
}