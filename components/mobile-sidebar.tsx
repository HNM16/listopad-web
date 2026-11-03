"use client"

import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { ArrowUpRight, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function MobileSidebar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: t.nav.home || "Главная" },
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/#products", label: t.nav.products },
    { href: "/cdn", label: "CDN" },
    { href: "/dns", label: "DNS" },
    { href: "/waf", label: "WAF" },
    { href: "/nkt-hub", label: "NKT-HUB" },
    { href: "/docs", label: "Docs" },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" aria-label={t.common.menu}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] border-r p-0 sm:w-[340px]">
        <SheetTitle className="sr-only">{t.common.menu}</SheetTitle>
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-6 pt-14">
          <nav className="flex flex-col gap-0.5">
            {links.map((link, i) => {
              const active = pathname === link.href
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: open ? 1 : 0, x: open ? 0 : -16 }}
                  transition={{ duration: 0.5, delay: open ? 0.05 + i * 0.035 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center justify-between rounded-2xl px-4 py-2.5 text-[0.95rem] font-medium transition-colors",
                      active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
            <Button asChild variant="outline">
              <a href="https://my.listopad.tj/auth/login">{t.nav.login}</a>
            </Button>
            <Button asChild>
              <a href="https://my.listopad.tj/auth/signup">{t.nav.register}</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
