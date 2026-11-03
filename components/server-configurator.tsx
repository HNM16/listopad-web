"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Magnetic } from "@/components/fx/magnetic"
import { Reveal } from "@/components/fx/reveal"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/hooks/use-language"
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Cpu, Globe, HardDrive, MemoryStick, Minus, Network, Plus, type LucideIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface ServerConfig {
  cpu: number
  ram: number
  nvme: number
  traffic: number
  ip: number
}

const calculateMonthlyPrice = (config: ServerConfig): number => {
  const cpuPrice = config.cpu * 62.5576
  const ramPrice = config.ram * 25.838
  const nvmePrice = config.nvme * 2.4108
  const ipPrice = config.ip * 18.9956

  // Traffic: 0.5 TB included, excess = 0.05 TJS per GB
  let trafficPrice = 0
  if (config.traffic > 0.5) {
    const excessGB = (config.traffic - 0.5) * 1024
    trafficPrice = excessGB * 0.05
  }

  return cpuPrice + ramPrice + nvmePrice + ipPrice + trafficPrice
}

const calculateDailyPrice = (monthlyPrice: number): number => monthlyPrice / 30

export default function ServerConfigurator() {
  const { t, language } = useLanguage()

  const [config, setConfig] = useState<ServerConfig>({
    cpu: 1,
    ram: 1,
    nvme: 10,
    traffic: 0.5,
    ip: 1,
  })

  const monthlyPrice = useMemo(() => calculateMonthlyPrice(config), [config])
  const dailyPrice = useMemo(() => calculateDailyPrice(monthlyPrice), [monthlyPrice])

  const orderUrl = "https://my.listopad.tj/auth/login"

  // UI translations for configurator (fallback, если нет в твоём translations)
  const ui = useMemo(() => {
    const dict = {
      ru: {
        title: "Настройте параметры вашего сервера",
        yourConfig: "Ваша конфигурация",
        cpu: "Процессор (vCPU):",
        ram: "Оперативная память:",
        disk: "Дисковое пространство:",
        traffic: "Трафик:",
        ip: "IP адреса:",
        pricing: "Стоимость",
        monthly: "Ежемесячная плата:",
        daily: "Ежедневная плата:",
        total: "Итого в месяц:",
        order: "Заказать сервер",
        sending: "Отправка...",
        units: { vcpu: "vCPU", gb: "GB", tb: "TB", ip: "IP", nvme: "GB NVMe", tjs: "TJS" },
      },
      en: {
        title: "Configure your server parameters",
        yourConfig: "Your configuration",
        cpu: "CPU (vCPU):",
        ram: "RAM:",
        disk: "Disk space:",
        traffic: "Traffic:",
        ip: "IP addresses:",
        pricing: "Pricing",
        monthly: "Monthly price:",
        daily: "Daily price:",
        total: "Total per month:",
        order: "Order server",
        sending: "Redirecting...",
        units: { vcpu: "vCPU", gb: "GB", tb: "TB", ip: "IP", nvme: "GB NVMe", tjs: "TJS" },
      },
      tj: {
        title: "Параметрҳои сервери худро танзим кунед",
        yourConfig: "Танзимоти шумо",
        cpu: "Протсессор (vCPU):",
        ram: "Хотираи оперативӣ:",
        disk: "Ҳаҷми диск:",
        traffic: "Трафик:",
        ip: "Суроғаҳои IP:",
        pricing: "Нарх",
        monthly: "Нархи моҳона:",
        daily: "Нархи рӯзона:",
        total: "Ҳамагӣ дар моҳ:",
        order: "Фармоиши сервер",
        sending: "Гузариш...",
        units: { vcpu: "vCPU", gb: "GB", tb: "TB", ip: "IP", nvme: "GB NVMe", tjs: "TJS" },
      },
    } as const

    return dict[language] ?? dict.tj
  }, [language])

  const updateConfig = (key: keyof ServerConfig, value: number) => {
    const rounded = Math.round(value * 100) / 100
    setConfig((prev) => ({ ...prev, [key]: rounded }))
  }

  const stepFor = (key: keyof ServerConfig) => (key === "nvme" ? 10 : key === "traffic" ? 0.5 : 1)

  const increment = (key: keyof ServerConfig, max: number) => {
    setConfig((prev) => {
      const step = stepFor(key)
      const newValue = Math.round((prev[key] + step) * 100) / 100
      return { ...prev, [key]: Math.min(newValue, max) }
    })
  }

  const decrement = (key: keyof ServerConfig, min: number) => {
    setConfig((prev) => {
      const step = stepFor(key)
      const newValue = Math.round((prev[key] - step) * 100) / 100
      return { ...prev, [key]: Math.max(newValue, min) }
    })
  }

  const L = ui

  const rows: {
    key: keyof ServerConfig
    icon: LucideIcon
    label: string
    min: number
    max: number
    ticks: number[]
    format: (v: number) => string
    summary: (v: number) => string
  }[] = [
    { key: "cpu", icon: Cpu, label: L.cpu, min: 1, max: 32, ticks: [1, 8, 16, 24, 32], format: (v) => `${v} ${L.units.vcpu}`, summary: (v) => `${v} ${L.units.vcpu}` },
    { key: "ram", icon: MemoryStick, label: L.ram, min: 1, max: 128, ticks: [1, 32, 64, 96, 128], format: (v) => `${v} ${L.units.gb}`, summary: (v) => `${v} ${L.units.gb}` },
    { key: "nvme", icon: HardDrive, label: L.disk, min: 10, max: 2000, ticks: [10, 500, 1000, 1500, 2000], format: (v) => `${v} ${L.units.gb}`, summary: (v) => `${v} ${L.units.nvme}` },
    { key: "traffic", icon: Network, label: L.traffic, min: 0.5, max: 10, ticks: [0.5, 3, 5, 7, 10], format: (v) => `${v.toFixed(1)} ${L.units.tb}`, summary: (v) => `${v.toFixed(1)} ${L.units.tb}` },
    { key: "ip", icon: Globe, label: L.ip, min: 1, max: 10, ticks: [1, 3, 5, 7, 10], format: (v) => `${v} ${L.units.ip}`, summary: (v) => `${v} ${L.units.ip}` },
  ]

  return (
    <section id="configurator" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={t.home.configuratorEyebrow}
          title={t.configurator.title}
          subtitle={t.home.configuratorSubtitle}
          className="mb-14 md:mb-20"
        />

        <Reveal className="relative mx-auto max-w-7xl">
          

          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:gap-5">
            {/* Controls */}
            <div className="glass rounded-[2rem] p-5 md:p-9">
              <h3 className="mb-8 text-lg font-semibold tracking-tight md:text-xl">{L.title}</h3>

              <div className="space-y-8">
                {rows.map((row) => {
                  const value = config[row.key]
                  const Icon = row.icon
                  return (
                    <div key={row.key} className="group">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <label htmlFor={`cfg-${row.key}`} className="flex items-center gap-3 text-sm font-medium md:text-base">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-colors group-hover:bg-brand group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          {row.label}
                        </label>
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={value}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="font-display text-lg font-medium tabular-nums md:text-xl"
                          >
                            {row.format(value)}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      <div className="flex items-center gap-3 md:gap-4">
                        <StepButton
                          label={`${row.label.replace(":", "")} −`}
                          onClick={() => decrement(row.key, row.min)}
                          disabled={value <= row.min}
                        >
                          <Minus className="h-4 w-4" />
                        </StepButton>

                        <div className="relative flex-1">
                          <Slider
                            id={`cfg-${row.key}`}
                            aria-label={row.label}
                            value={[value]}
                            onValueChange={([v]) => updateConfig(row.key, v)}
                            min={row.min}
                            max={row.max}
                            step={stepFor(row.key)}
                          />
                          <div className="mt-2.5 flex justify-between px-0.5 text-[0.7rem] tabular-nums text-muted-foreground">
                            {row.ticks.map((tick) => (
                              <span key={tick}>{tick}</span>
                            ))}
                          </div>
                        </div>

                        <StepButton
                          label={`${row.label.replace(":", "")} +`}
                          onClick={() => increment(row.key, row.max)}
                          disabled={value >= row.max}
                        >
                          <Plus className="h-4 w-4" />
                        </StepButton>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="ring-gradient rounded-[2rem]">
                <div className="glass flex flex-col rounded-[inherit] p-5 md:p-9">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{L.yourConfig}</h3>

                  <dl className="mt-6 divide-y divide-border/70">
                    {rows.map((row) => (
                      <div key={row.key} className="flex items-center justify-between py-3 text-sm md:text-[0.95rem]">
                        <dt className="text-muted-foreground">{row.label.replace(":", "")}</dt>
                        <dd className="font-semibold tabular-nums">{row.summary(config[row.key])}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 rounded-2xl border border-border/70 bg-background/40 p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{L.pricing}</div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{L.monthly}</span>
                      <span className="font-semibold tabular-nums">
                        <AnimatedPrice value={monthlyPrice} /> {L.units.tjs}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{L.daily}</span>
                      <span className="font-semibold tabular-nums">
                        <AnimatedPrice value={dailyPrice} /> {L.units.tjs}
                      </span>
                    </div>
                    <div className="mt-5 border-t border-border/70 pt-5">
                      <div className="text-sm font-medium">{L.total}</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-brand-gradient font-display text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
                          <AnimatedPrice value={monthlyPrice} />
                        </span>
                        <span className="text-lg font-semibold text-muted-foreground">{L.units.tjs}</span>
                      </div>
                    </div>
                  </div>

                  <Magnetic className="mt-6 w-full" strength={0.15}>
                    <Button
                      size="lg"
                      className="group h-14 w-full text-base"
                      onClick={() => {
                        window.location.href = orderUrl
                      }}
                    >
                      {L.order}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function StepButton({ children, onClick, disabled, label }: { children: React.ReactNode; onClick: () => void; disabled: boolean; label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 shrink-0 hover:border-brand/60 hover:text-brand md:h-10 md:w-10"
    >
      {children}
    </Button>
  )
}

/** Smoothly tweens between price values instead of jumping. */
function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 22, mass: 0.6 })
  const text = useTransform(spring, (v) => v.toFixed(2))
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span>{text}</motion.span>
}
