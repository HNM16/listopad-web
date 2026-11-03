"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useLanguage } from "@/hooks/use-language"
import { useEffect } from "react"

import { CountUp } from "@/components/fx/count-up"
import { Magnetic } from "@/components/fx/magnetic"
import { NetworkMesh } from "@/components/fx/network-mesh"
import { TextReveal } from "@/components/fx/text-reveal"
import { FormStatus, type FormStatusState } from "@/components/form-status"
import { Activity, ArrowRight, Building2, Cpu, Database, Globe, Loader2, Mail, MapPin, Network, Phone, Shield } from "lucide-react"
import Image from "next/image"

type Participant = { asn: string; city: string }
type Provider = { name: string }

export default function IXPage() {
  const { t } = useLanguage()

  // helper переводов — строго как у тебя (через t.nav.about)
  const tr = (ru: string, en: string, tj: string) =>
    t.nav.about === "О компании" ? ru : t.nav.about === "About" ? en : tj

  // данные
  const stats = useMemo(
    () => [
      { label: tr("Пропускная способность", "Bandwidth", "Гузарониш (Bandwidth)"), value: "3.2 Tbps" },
      { label: tr("Подключенных ASN", "ASNs connected", "ASN-ҳои пайвастшуда"), value: "43" },
      { label: tr("Подключенных провайдеров", "Providers connected", "Провайдерҳои пайвастшуда"), value: "15" },
    ],
    [t.nav.about],
  )


const products = useMemo(
  () => [
    {
      imageSrc: "/images/nkt-hub/p1.svg", 
      imageAlt: "Access to local IX members",
      title: tr("Доступ к локальным участникам IX", "Access to local IX members", "Дастрасӣ ба иштирокчиёни маҳаллӣ"),
      desc: tr(
        "Прямой пиринг с локальными участниками IX.",
        "Direct peering with local IX participants.",
        "Пиринг (peering)-и мустақим бо иштирокчиёни маҳаллӣ.",
      ),
    },
    {
      imageSrc: "/images/nkt-hub/p2.svg",
      imageAlt: "Access to international IX participants",
      title: tr(
        "Доступ к международным участникам IX",
        "Access to international IX participants",
        "Дастрасӣ ба иштирокчиёни байналмилалӣ",
      ),
      desc: tr(
        "Международная связность и варианты пиринга.",
        "International connectivity and peering options.",
        "Пайвастшавии байналмилалӣ ва имконоти пиринг.",
      ),
    },
    {
      imageSrc: "/images/nkt-hub/p3.svg",
      imageAlt: "Connecting data centers",
      title: tr("Соединение дата-центров", "Connecting data centers", "Пайваст кардани дата-марказҳо"),
      desc: tr(
        "Надежная меж-ЦОД связность для ваших нагрузок.",
        "Reliable inter-DC connectivity for your workloads.",
        "Пайвастшавии боэътимоди байни дата-марказҳо барои корҳоятон.",
      ),
    },
    {
      imageSrc: "/images/nkt-hub/p4.svg",
      imageAlt: "Access to global CDN platforms",
      title: tr(
        "Доступ к глобальным CDN-платформам",
        "Access to global CDN platforms",
        "Дастрасӣ ба платформаҳои ҷаҳонии CDN",
      ),
      desc: tr(
        "Подключение к крупным CDN/CP платформам.",
        "Connectivity to major CDN/CP platforms.",
        "Пайвастшавӣ ба платформаҳои бузурги CDN/CP.",
      ),
    },
    {
      imageSrc: "/images/nkt-hub/p5.svg",
      imageAlt: "Colocation",
      title: tr("Колокейшн", "Colocation", "Колокейшн"),
      desc: tr(
        "Размещение вашего оборудования в нашей площадке в Душанбе.",
        "Place your equipment in our facility in Dushanbe.",
        "Таҷҳизоти худро дар майдони мо дар Душанбе ҷойгир кунед.",
      ),
    },
  ],
  [t.nav.about],
)

  const participants: Participant[] = useMemo(
    () => [
      { asn: "AS43197", city: "Dushanbe" },
      { asn: "AS47139", city: "Dushanbe" },
      { asn: "AS48887", city: "Dushanbe" },
      { asn: "AS204106", city: "Dushanbe" },
      { asn: "AS24722", city: "Dushanbe" },
      { asn: "AS8847", city: "Dushanbe" },
      { asn: "AS34557", city: "Dushanbe" },
      { asn: "AS51346", city: "Dushanbe" },
      { asn: "AS208592", city: "Dushanbe" },
      { asn: "AS49472", city: "Dushanbe" },
      { asn: "AS196854", city: "Dushanbe" },
      { asn: "AS43030", city: "Dushanbe" },
      { asn: "AS8193", city: "Tashkent" },
    ],
    [],
  )

  const providers: Provider[] = useMemo(
    () => [
      { name: "TT mobile" },
      { name: "INDIGO TAJIKISTAN CJSC" },
      { name: "Babilon-Mobile" },
      { name: "Babilon-T" },
      { name: "Telecomm Technology" },
      { name: "Tacom" },
      { name: "Tojiktelecom" },
      { name: "AVESTONET" },
      { name: "Eastera" },
      { name: "ISATEL" },
      { name: "Tarena" },
      { name: 'Uzbektelekom" Joint Stock Company' },
    ],
    [],
  )

  const foundations = useMemo(
    () => [
      {
        icon: Activity,
        title: tr("Высокая плотность сети", "High network density", "Зичии баланди шабака"),
        desc: tr(
          "Спроектировано для стабильного пиринга и роста.",
          "Engineered for stable peering and growth.",
          "Барои пиринги устувор ва рушд тарҳрезӣ шудааст.",
        ),
      },
      {
        icon: Globe,
        title: tr(
          "Предпочтительный PoP сети",
          "Preferred network PoP",
          "PoP-и афзалиятноки шабака",
        ),
        desc: tr(
          "Привлекательный PoP для зарубежных ISP и контент-провайдеров.",
          "Attractive PoP for overseas ISPs and CPs.",
          "PoP-и ҷолиб барои ISP-ҳо ва провайдерҳои контент аз хориҷ.",
        ),
      },
      {
        icon: Cpu,
        title: tr("NOC 24×7×365", "24×7×365 NOC", "NOC 24×7×365"),
        desc: tr(
          "Центр управления и мониторинг 24/7.",
          "Control center and situation room operations.",
          "Маркази идоракунӣ ва мониторинг 24/7.",
        ),
      },
      {
        icon: Shield,
        title: tr("2N, N+1 UPS", "2N, N+1 UPS", "2N, N+1 UPS"),
        desc: tr(
          "Резервирование питания для надежности.",
          "Power redundancy designed for reliability.",
          "Захиракунии барқ барои боэътимодӣ.",
        ),
      },
      
    ],
    [t.nav.about],
  )

  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<FormStatusState>(null)

useEffect(() => {
  if (typeof window === "undefined") return

  let isMounted = true

  const initMap = () => {
    const loader = (window as any).DG

    if (!loader || typeof loader.then !== "function") return

    loader.then(() => {
      if (!isMounted) return

      const DG = (window as any).DG

      if (!DG || typeof DG.map !== "function") {
        console.error("2GIS map API not ready")
        return
      }

      const existingMapEl = document.getElementById("map")
      if (!existingMapEl) return

      // чтобы карта не создавалась повторно при hot reload
      if ((existingMapEl as any)._leaflet_id) return

      const map = DG.map("map", {
        center: [38.551515, 68.812568],
        zoom: 17,
      })

      DG.marker([38.551515, 68.812568]).addTo(map)
    })
  }

  // если скрипт уже загружен
  if ((window as any).DG) {
    initMap()
  } else {
    const script = document.createElement("script")
    script.src = "https://maps.api.2gis.ru/2.0/loader.js?pkg=full"
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)
  }

  return () => {
    isMounted = false
  }
}, [])

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (sending) return

  try {
    setSending(true)
    setStatus(null)

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `Company: ${form.company}\n\n${form.message}`,
        website: "", // honeypot
      }),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      throw new Error(data?.error || "Failed")
    }

    setStatus({
      type: "success",
      message: tr(
        "Спасибо! Мы свяжемся с вами.",
        "Thanks! We’ll contact you.",
        "Ташаккур! Мо бо шумо дар тамос мешавем."
      ),
    })

    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      message: "",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    setStatus({
      type: "error",
      message: tr(
        "Ошибка отправки. Попробуйте позже.",
        "Sending failed. Please try again later.",
        "Ирсол нашуд. Баъдтар дубора кӯшиш кунед."
      ),
    })
  } finally {
    setSending(false)
  }
}

 const addressLine = tr(
  "Душанбе, ул. М. Мастангулова, д. 5Б",
  "5B M. Mastangulov Street, Dushanbe",
  "Душанбе, кӯчаи М. Мастангулова, 5Б",
)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* HERO */}
        <section className="relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
          <NetworkMesh className="mask-radial absolute inset-0 -z-10 h-full w-full opacity-90" />
          <div aria-hidden className="mask-fade-b absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-24 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="eyebrow mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                NKT-HUB · Internet Exchange
              </motion.div>

              <TextReveal
                as="h1"
                immediate
                delay={0.1}
                text={tr("Современный Internet Exchange", "Modern Internet Exchange", "Internet Exchange-и муосир")}
                highlight={["Exchange"]}
                className="text-5xl font-medium leading-[1] md:text-6xl lg:text-7xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-6 text-pretty text-xl text-foreground/80 md:text-2xl"
              >
                {tr("Цифровой фундамент Центральной Азии", "Digital backbone of Central Asia", "Пояи рақамии Осиёи Марказӣ")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-2 text-base text-muted-foreground md:text-lg"
              >
                {tr("Сделано с любовью в Душанбе", "Made with love in Dushanbe", "Бо меҳр дар Душанбе сохта шудааст")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mt-10 flex flex-wrap justify-center gap-3"
              >
                <Magnetic>
                  <Button
                    size="lg"
                    className="group min-w-[240px]"
                    onClick={() => document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {tr("Запросить консультацию", "Request consultation", "Машварат дархост кардан")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="glass mx-auto mt-14 grid max-w-3xl grid-cols-1 overflow-hidden rounded-3xl sm:grid-cols-3"
              >
                {stats.map((s, i) => (
                  <div key={s.label} className={`p-6 ${i > 0 ? "border-t border-border/60 sm:border-l sm:border-t-0" : ""}`}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <CountUp value={s.value} className="text-brand-gradient block font-display text-3xl font-medium tracking-tight md:text-4xl" />
                      <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </motion.dl>

              <div className="pointer-events-none mt-14 select-none text-center" aria-hidden>
                <span className="bg-gradient-to-b from-brand/50 to-brand/0 bg-clip-text font-display text-5xl font-semibold tracking-[0.04em] text-transparent md:text-7xl lg:text-8xl">
                  AS205507
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="relative py-20 md:py-28" id="products">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-medium md:text-[2.75rem] md:leading-tight">
                {tr("Наши продукты", "Our products", "Маҳсулоти мо")}
              </h2>
              <p className="text-muted-foreground mt-3">
                {tr(
                  "Связность, пиринг и колокейшн-сервисы для масштаба, стабильности и производительности.",
                  "Connectivity, peering and colocation services built for scale, stability and performance.",
                  "Пайвастшавӣ, пиринг ва колокейшн барои масштаб, устуворӣ ва самаранокӣ.",
                )}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
             <Card className="group h-full transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--brand)_45%,transparent)]">
  <CardHeader>
    <div className="mb-4 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-brand/10 via-transparent to-brand-violet/10">
      <div className="relative aspect-[16/5] w-full">
        <Image
          src={p.imageSrc}
          alt={p.imageAlt}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />
      </div>
    </div>

    <CardTitle className="text-xl">{p.title}</CardTitle>
    <CardDescription>{p.desc}</CardDescription>
  </CardHeader>
</Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTICIPANTS */}
        <section className="relative py-20 md:py-28" id="participants">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-medium md:text-[2.75rem] md:leading-tight">
                {tr("Наши участники", "Our participants", "Иштирокчиёни мо")}
              </h2>
              <p className="text-muted-foreground mt-3">
                {tr("Список ASN и подключенных провайдеров.", "ASN list and connected providers.", "Рӯйхати ASN ва провайдерҳои пайвастшуда.")}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="">
                <CardHeader>
                  <CardTitle>{tr("ASN", "ASN", "ASN")}</CardTitle>
                  <CardDescription>{tr("Подключенные участники", "Connected participants", "Иштирокчиёни пайвастшуда")}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[360px] overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-card/95 backdrop-blur">
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-semibold">{tr("ASN", "ASN", "ASN")}</th>
                          <th className="px-4 py-3 text-left font-semibold">{tr("Город", "City", "Шаҳр")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((row) => (
                          <tr key={row.asn} className="border-b border-border/60 transition-colors last:border-b-0 hover:bg-accent/50">
                            <td className="px-4 py-3 font-mono text-[0.85rem]">{row.asn}</td>
                            <td className="text-muted-foreground px-4 py-3">
                              {row.city === "Dushanbe" ? tr("Душанбе", "Dushanbe", "Душанбе") : row.city === "Tashkent" ? tr("Ташкент", "Tashkent", "Тошканд") : row.city}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle>{tr("Список подключенных провайдеров", "List of connected providers", "Рӯйхати провайдерҳои пайвастшуда")}</CardTitle>
                  <CardDescription>{tr("Партнеры и апстримы", "Partners and upstreams", "Шарикон ва апстримҳо")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {providers.map((p) => (
                      <li key={p.name} className="rounded-xl border border-border/70 bg-background/40 px-3.5 py-2.5 text-sm transition-colors hover:border-brand/40">
                        {p.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FOUNDATION */}
        <section className="relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-balance text-3xl font-medium md:text-[2.75rem] md:leading-tight">
                {tr("Надежная сетевая основа", "Reliable Network Foundation", "Асоси боэътимоди шабака")}
              </h2>
              <p className="text-muted-foreground mt-3">
                {tr(
                  "Сердце нашей сети — основной дата-центр с высокой плотностью сети и профессиональной командой.",
                  "Heart of our network is our main data center with high network density and skilled personnel.",
                  "Дили шабакаи мо — дата-маркази асосӣ бо зичии баланди шабака ва дастаи касбӣ.",
                )}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {foundations.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-violet text-white shadow-[0_10px_26px_-10px_var(--brand)]">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <div className="font-semibold">{f.title}</div>
                      <div className="text-muted-foreground mt-2 text-sm">{f.desc}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION + CONTACTS */}
        <section className="relative py-20 md:py-28">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
        <Card className=" lg:col-span-2">
  <CardHeader>
    <CardTitle>{tr("Локация", "Location", "Ҷойгиршавӣ")}</CardTitle>
    <CardDescription>
      {tr("Душанбе, Таджикистан", "Dushanbe, Tajikistan", "Душанбе, Тоҷикистон")}
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="group relative">

      {/* Glow эффект */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 blur-xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Карта */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-background shadow-lg transition duration-300 group-hover:shadow-xl">

     <div className="bg-background aspect-[16/9] w-full overflow-hidden rounded-xl border">
  <div id="map" className="h-full w-full"></div>
</div>

      </div>
    </div>

    {/* Контакты */}
    <div className="text-muted-foreground mt-5 flex flex-col gap-2 text-sm">
      <div className="inline-flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        {tr(
          "Душанбе, ул. М. Мастангулова, д. 5Б",
          "5B M. Mastangulov Street, Dushanbe",
          "Душанбе, кӯчаи М. Мастангулова, 5Б",
        )}
      </div>

      <div className="inline-flex items-center gap-2">
        <Mail className="h-4 w-4" />
        support@listopad.tj • sales@listopad.tj
      </div>

      <div className="inline-flex items-center gap-2">
        <Phone className="h-4 w-4" />
        +992 78 991-3054
      </div>
    </div>
  </CardContent>
</Card>

            {/* CONSULT FORM */}
            <Card className="" id="consult">
              <CardHeader>
                <CardTitle>{tr("Запрос консультации", "Request a Consultation", "Дархости машварат")}</CardTitle>
                <CardDescription>
                  {tr(
                    "Оставьте контакты — мы свяжемся с вами в ближайшее время.",
                    "Leave your contacts and we’ll reach out shortly.",
                    "Тамосҳоро гузоред — мо ба зудӣ бо шумо дар тамос мешавем.",
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{tr("Имя", "Name", "Ном")}</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      required
                      placeholder={tr("Ваше имя", "Your name", "Номи шумо")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{tr("Компания", "Company", "Ширкат")}</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      placeholder={tr("Название компании", "Company name", "Номи ширкат")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{tr("Телефон", "Phone", "Телефон")}</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder={tr("+992 ...", "+992 ...", "+992 ...")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{tr("Email", "Email", "Email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      required
                      placeholder={tr("you@example.com", "you@example.com", "you@example.com")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{tr("Сообщение", "Message", "Паём")}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder={tr("Расскажите, что вам нужно…", "Tell us what you need…", "Бигӯед, ки ба шумо чӣ лозим аст…")}
                    />
                  </div>

                  <FormStatus status={status} />

                  <Button type="submit" size="lg" className="w-full" disabled={sending}>
                    {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                    {sending ? tr("Отправляем…", "Sending…", "Ирсол мешавад…") : tr("Отправить заявку", "Send request", "Фиристодани дархост")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}