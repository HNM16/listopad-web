"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { translations, type Language } from "@/lib/i18n"

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.ru
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "tj",
      setLanguage: (lang: Language) => {
        set({ language: lang, t: translations[lang] })
      },
      t: translations.tj,
    }),
    {
      name: "language-storage",
    },
  ),
)
