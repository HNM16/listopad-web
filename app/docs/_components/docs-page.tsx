"use client"

import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

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
        <h2 className="text-3xl font-bold">{title[lang]}</h2>
        <p className="text-muted-foreground">{description[lang]}</p>
      </header>

      {blocks.map((block, index) => (
        <section key={index} className="bg-card space-y-5 rounded-2xl border p-6 shadow-sm">
          <h3 className="text-2xl font-semibold">{block.title[lang]}</h3>

          <div className="space-y-4">
            {block.text.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-muted-foreground leading-7">
                {paragraph[lang]}
              </p>
            ))}
          </div>

          {block.steps && block.steps.length > 0 && (
            <ol className="text-muted-foreground list-decimal space-y-2 pl-5">
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
                  className="bg-background overflow-hidden rounded-2xl border p-3 shadow-sm"
                >
                  <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
                    <Image
                      src={shot.src}
                      alt={shot.alt[lang]}
                      fill
                      className="object-contain"
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
      ))}
    </article>
  )
}