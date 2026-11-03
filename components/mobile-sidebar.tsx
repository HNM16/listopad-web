"use client"

import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function MobileSidebar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: t.nav.home || "Главная" },
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/#products", label: t.nav.products },
    { href: "/cdn", label: "CDN" },
    { href: "/dns", label: "DNS" },
    { href: "/waf", label: "WAF" },
    { href: "/contact", label: t.nav.contact },
    { href: "/login", label: t.nav.login },
    { href: "/register", label: t.nav.register },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <div className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
