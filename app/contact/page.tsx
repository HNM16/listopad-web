"use client"

import type React from "react"

import { Footer } from "@/components/footer"
import { FormStatus, type FormStatusState } from "@/components/form-status"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/fx/reveal"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight, Loader2, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<FormStatusState>(null)


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (isSending) return

  try {
    setIsSending(true)
    setStatus(null)

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        website: "", // honeypot (антиспам)
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data?.error || "Send failed")
    }

    setStatus({
      type: "success",
      message:
        t.nav.about === "О компании"
          ? "Спасибо! Сообщение отправлено. Мы свяжемся с вами в ближайшее время."
          : t.nav.about === "About"
            ? "Thanks! Message sent. We will contact you soon."
            : "Ташаккур! Паём фиристода шуд. Мо бо шумо зуд тамос мегирем.",
    })

    setFormData({ name: "", email: "", phone: "", message: "" })
  } catch (err) {
    setStatus({
      type: "error",
      message:
        t.nav.about === "О компании"
          ? "Ошибка отправки. Попробуйте позже."
          : t.nav.about === "About"
            ? "Failed to send. Please try again later."
            : "Хатои фиристодан. Лутфан баъдтар кӯшиш кунед.",
    })
  } finally {
    setIsSending(false)
  }
}

    const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sales@listopad.tj",
      link: "mailto:sales@listopad.tj",
    },
    {
      icon: Phone,
      title: t.nav.about === "О компании" ? "Телефон" : t.nav.about === "About" ? "Phone" : "Телефон",
      value: "+992 78 991-3054",
      link: "tel:+992789913054",
    },
    {
      icon: MapPin,
      title: t.nav.about === "О компании" ? "Адрес" : t.nav.about === "About" ? "Address" : "Суроға",
      value:
        t.nav.about === "О компании"
          ? "Душанбе, ул. М. Мастангулова, д. 5Б"
          : t.nav.about === "About"
            ? "Dushanbe, 5B M. Mastangulova Street"
            : "Душанбе, кӯчаи М. Мастангулова, хонаи 5Б",
      link: "",
    },
  ]

  const tr = (ru: string, en: string, tj: string) =>
    t.nav.about === "О компании" ? ru : t.nav.about === "About" ? en : tj

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          icon={MessageSquare}
          title={t.nav.contact}
          description={tr(
            "Свяжитесь с нами для получения дополнительной информации о наших услугах. Мы всегда рады помочь вам.",
            "Contact us for more information about our services. We are always happy to help you.",
            "Барои гирифтани маълумоти иловагӣ дар бораи хидматҳои мо бо мо тамос гиред. Мо ҳамеша хурсандем, ки ба шумо кӯмак кунем.",
          )}
        />

        <section className="relative pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
              {/* Contact channels */}
              <div className="grid content-start gap-4">
                {contactInfo.map((info, index) => {
                  const content = (
                    <SpotlightCard className="group flex items-center gap-5 p-6">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-violet text-white shadow-[0_12px_30px_-10px_var(--brand)] transition-transform duration-500 group-hover:scale-110">
                        <info.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{info.title}</span>
                        <span className="mt-1 block text-pretty font-semibold">{info.value}</span>
                      </span>
                      {info.link && (
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                      )}
                    </SpotlightCard>
                  )
                  return (
                    <Reveal key={index} delay={index * 0.08}>
                      {info.link ? (
                        <a href={info.link} className="block rounded-3xl">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Reveal>
                  )
                })}
              </div>

              {/* Form */}
              <Reveal delay={0.15}>
                <div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-10">
                  <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
                  <h2 className="relative text-2xl font-medium md:text-3xl">
                    {tr("Отправить сообщение", "Send a Message", "Паём фиристодан")}
                  </h2>
                  <form onSubmit={handleSubmit} className="relative mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{tr("Имя", "Name", "Ном")}</Label>
                        <Input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder={tr("Ваше имя", "Your name", "Номи шумо")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{tr("Телефон", "Phone", "Телефон")}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+992 123 456 789"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{tr("Сообщение", "Message", "Паём")}</Label>
                      <Textarea
                        id="message"
                        placeholder={tr(
                          "Расскажите нам о вашем проекте...",
                          "Tell us about your project...",
                          "Дар бораи лоиҳаи худ ба мо нависед...",
                        )}
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <FormStatus status={status} />

                    <Button type="submit" size="lg" className="group h-14 w-full text-base" disabled={isSending}>
                      {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                      {isSending
                        ? tr("Отправка...", "Sending...", "Фиристода истодааст...")
                        : tr("Отправить", "Send Message", "Фиристодан")}
                    </Button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
