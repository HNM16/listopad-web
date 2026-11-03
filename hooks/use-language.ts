"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { translations, type Language } from "@/lib/i18n"

type Translations = (typeof translations)[Language]

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const isLanguage = (v: unknown): v is Language => typeof v === "string" && v in translations

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "tj",
      setLanguage: (lang: Language) => {
        set({ language: lang, t: translations[lang] })
      },
      t: translations.tj,
    }),
    {
      name: "language-storage",
      // Only the language code is stored; translations are always derived from
      // the current bundle so newly added strings are available to returning visitors.
      partialize: (state) => ({ language: state.language }),
      merge: (persisted, current) => {
        const lang = isLanguage((persisted as { language?: unknown } | undefined)?.language)
          ? (persisted as { language: Language }).language
          : current.language
        return { ...current, language: lang, t: translations[lang] }
      },
      // Rehydrated after mount by <LanguageHydrator/> so the first client render
      // matches the server HTML (no hydration mismatch).
      skipHydration: true,
    },
  ),
)
