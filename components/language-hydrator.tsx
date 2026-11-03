"use client"

import { useLanguage } from "@/hooks/use-language"
import { useEffect } from "react"

const HTML_LANG = { ru: "ru", en: "en", tj: "tg" } as const

/** Restores the saved language after hydration and keeps <html lang> in sync. */
export function LanguageHydrator() {
  const language = useLanguage((s) => s.language)

  useEffect(() => {
    void useLanguage.persist.rehydrate()
  }, [])

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language] ?? "ru"
  }, [language])

  return null
}
