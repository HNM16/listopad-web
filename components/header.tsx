"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Globe, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MobileSidebar } from "./mobile-sidebar"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-border-/40 bg-background/80 fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MobileSidebar />
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo-icon.png" alt="Listopad" width={32} height={32} className="h-8 w-8" />
            <span className="text-primary text-xl font-bold">Listopad</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t.nav.about}
          </Link>

          <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t.nav.pricing}
          </Link>

          <a href="/#products" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t.nav.products}
          </a>

         
        </nav>

        <div className="flex items-center gap-2">
          {/* Переключатель темы */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>

          {/* Выбор языка */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("ru")}>
                Русский {language === "ru" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English {language === "en" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("tj")}>
                Тоҷикӣ {language === "tj" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Кнопка Контакты */}
          <Link href="/contact" className="hidden md:block">
            <Button>{t.nav.contact}</Button>
          </Link>

          {/* Профиль */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden h-9 w-9 md:flex">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a href="https://my.listopad.tj/auth/login">
                  {t.nav.login}
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <a href="https://my.listopad.tj/auth/signup">
                  {t.nav.register}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}