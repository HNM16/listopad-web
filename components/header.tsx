"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Magnetic } from "@/components/fx/magnetic"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, Check, ChevronDown, Cloud, Globe, Globe2, Moon, Network, Server, Shield, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MobileSidebar } from "./mobile-sidebar"

const LANGUAGES = [
  { code: "ru", label: "Русский", short: "RU" },
  { code: "en", label: "English", short: "EN" },
  { code: "tj", label: "Тоҷикӣ", short: "TJ" },
] as const

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24))

  const isDark = resolvedTheme === "dark"

  const navLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
  ]

  const productLinks = [
    { href: "/pricing", label: t.products.cloudServer.title, desc: t.products.cloudServer.description, icon: Server },
    { href: "/cdn", label: t.products.cdn.title, desc: t.products.cdn.description, icon: Globe2 },
    { href: "/dns", label: t.products.dns.title, desc: t.products.dns.description, icon: Network },
    { href: "/waf", label: t.products.waf.title, desc: t.products.waf.description, icon: Shield },
    { href: "/nkt-hub", label: "NKT-HUB", desc: "Internet Exchange · AS205507", icon: Cloud },
  ]

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href + "/"))

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-2 pl-3 transition-all duration-500 ease-out md:h-16 md:pl-5",
          scrolled
            ? "glass shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <div className="flex items-center gap-1.5">
          <MobileSidebar />
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Listopad">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-violet/10 ring-1 ring-brand/20 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
              <Image src="/images/logo-icon.png" alt="" width={24} height={20} className="h-5 w-auto" priority />
            </span>
            <span className="font-display text-[1.05rem] font-medium tracking-tight">Listopad</span>
          </Link>
        </div>

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => {
            setHovered(null)
            setProductsOpen(false)
          }}
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
              hovered={hovered === link.href}
              onHover={() => {
                setHovered(link.href)
                setProductsOpen(false)
              }}
            />
          ))}

          <div className="relative" onMouseEnter={() => {
            setHovered("products")
            setProductsOpen(true)
          }}>
            <a
              href="/#products"
              onFocus={() => setProductsOpen(true)}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {hovered === "products" && <HoverPill />}
              <span className="relative">{t.nav.products}</span>
              <ChevronDown className={cn("relative h-3.5 w-3.5 transition-transform duration-300", productsOpen && "rotate-180")} />
            </a>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                >
                  <div className="glass grid grid-cols-2 gap-1 rounded-3xl bg-popover/90 p-2">
                    {productLinks.map((p) => (
                      <Link
                        key={p.href + p.label}
                        href={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-accent/70 focus-visible:bg-accent/70"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-violet/10 text-brand ring-1 ring-brand/20 transition-transform duration-500 group-hover:scale-110">
                          <p.icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 text-sm font-semibold">
                            {p.label}
                            <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">{p.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            href="/docs"
            label="Docs"
            active={isActive("/docs")}
            hovered={hovered === "/docs"}
            onHover={() => {
              setHovered("/docs")
              setProductsOpen(false)
            }}
          />
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="h-9 w-9 overflow-hidden"
            aria-label={t.common.toggleTheme}
          >
            <span className="relative grid h-[18px] w-[18px] place-items-center">
              <Sun
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mounted && isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
                )}
              />
              <Moon
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mounted && isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
              />
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-1.5 px-2.5 text-xs font-semibold" aria-label={t.common.language}>
                <Globe className="h-[18px] w-[18px]" />
                <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === language)?.short}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)} className="justify-between">
                  {l.label}
                  {language === l.code && <Check className="h-4 w-4 text-brand" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden h-9 w-9 md:flex" aria-label={t.common.account}>
                <User className="h-[18px] w-[18px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuItem asChild>
                <a href="https://my.listopad.tj/auth/login">{t.nav.login}</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://my.listopad.tj/auth/signup">{t.nav.register}</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Magnetic className="ml-1 hidden md:inline-flex" strength={0.25}>
            <Button asChild className="h-10">
              <Link href="/contact">{t.nav.contact}</Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  )
}

function HoverPill() {
  return (
    <motion.span
      layoutId="nav-hover-pill"
      className="absolute inset-0 rounded-full bg-accent/80"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  )
}

function NavLink({
  href,
  label,
  active,
  hovered,
  onHover,
}: {
  href: string
  label: string
  active: boolean
  hovered: boolean
  onHover: () => void
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {hovered && <HoverPill />}
      <span className="relative">{label}</span>
      {active && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_var(--brand)]"
        />
      )}
    </Link>
  )
}
