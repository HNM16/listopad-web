"use client"

import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-border-/40 bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo-icon.png" alt="Listopad" width={32} height={32} className="h-8 w-8" />
              <span className="text-primary text-xl font-bold">Listopad</span>
            </Link>
            <p className="text-muted-foreground text-sm">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t.footer.company}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t.footer.products}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/cdn" className="hover:text-foreground transition-colors">
                  {t.products.cdn.title}
                </Link>
              </li>
              <li>
                <Link href="/dns" className="hover:text-foreground transition-colors">
                  {t.products.dns.title}
                </Link>
              </li>
              <li>
                <Link href="/waf" className="hover:text-foreground transition-colors">
                  {t.products.waf.title}
                </Link>
              </li>
              <li>
                 {/* NKT-HUB */}
          <Link href="/nkt-hub" className=" hover:text-foreground  transition-colors">
            NKT-HUB
          </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Socials */}
          <div>
            <h3 className="mb-4 font-semibold">Наши социальные сети</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a
                  href="https://t.me/ListopadCloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 240 240"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm58.8 82.6l-19.7 92.9c-1.5 6.6-5.5 8.3-11.2 5.2l-31-22.9-15 14.5c-1.7 1.7-3.1 3.1-6.4 3.1l2.3-32.5 59.2-53.5c2.6-2.3-.6-3.6-4-1.3l-73.2 46-31.6-9.9c-6.9-2.2-7-6.9 1.4-10.2l123.6-47.7c5.7-2.1 10.7 1.4 8.6 10.3z" />
                  </svg>
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t.footer.legal}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground  transition-colors">
  Docs
</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border-/40 text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}