"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/hooks/use-language"
import { AnimatePresence, motion } from "framer-motion"
import { Cpu, HardDrive, MemoryStick, Minus, Network, Plus } from "lucide-react"
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

  // если хочешь — лог отладки
  useEffect(() => {
    // console.log("language:", language)
    // console.log("config:", config)
    // console.log("monthly:", monthlyPrice)
  }, [language, config, monthlyPrice])

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

  // Если в твоих translations уже есть нужные ключи — можно заменить на t.xxx
  const L = ui

  return (
    <section id="configurator" className="relative py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-7xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-10 blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-4 shadow-xl dark:border-slate-700 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 md:p-8">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {/* Left */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
                  {L.title}
                </h2>

                {/* CPU */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Cpu className="h-4 w-4 text-cyan-500 md:h-5 md:w-5" />
                      <span className="text-sm font-medium md:text-base">{L.cpu}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.cpu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                      >
                        {config.cpu} {L.units.vcpu}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement("cpu", 1)}
                      disabled={config.cpu === 1}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>

                    <div className="relative flex-1">
                      <Slider value={[config.cpu]} onValueChange={([v]) => updateConfig("cpu", v)} min={1} max={32} step={1} />
                      <div className="mt-2 flex justify-between px-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>1</span><span>8</span><span>16</span><span>24</span><span>32</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("cpu", 32)}
                      disabled={config.cpu === 32}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                {/* RAM */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <MemoryStick className="h-4 w-4 text-cyan-500 md:h-5 md:w-5" />
                      <span className="text-sm font-medium md:text-base">{L.ram}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.ram}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                      >
                        {config.ram} {L.units.gb}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement("ram", 1)}
                      disabled={config.ram === 1}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>

                    <div className="relative flex-1">
                      <Slider value={[config.ram]} onValueChange={([v]) => updateConfig("ram", v)} min={1} max={128} step={1} />
                      <div className="mt-2 flex justify-between px-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>1</span><span>32</span><span>64</span><span>96</span><span>128</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("ram", 128)}
                      disabled={config.ram === 128}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                {/* NVMe */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <HardDrive className="h-4 w-4 text-cyan-500 md:h-5 md:w-5" />
                      <span className="text-sm font-medium md:text-base">{L.disk}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.nvme}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                      >
                        {config.nvme} {L.units.gb}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement("nvme", 10)}
                      disabled={config.nvme === 10}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>

                    <div className="relative flex-1">
                      <Slider value={[config.nvme]} onValueChange={([v]) => updateConfig("nvme", v)} min={10} max={2000} step={10} />
                      <div className="mt-2 flex justify-between px-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>10</span><span>500</span><span>1000</span><span>1500</span><span>2000</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("nvme", 2000)}
                      disabled={config.nvme === 2000}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Traffic */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Network className="h-4 w-4 text-cyan-500 md:h-5 md:w-5" />
                      <span className="text-sm font-medium md:text-base">{L.traffic}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.traffic}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                      >
                        {config.traffic.toFixed(1)} {L.units.tb}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement("traffic", 0.5)}
                      disabled={config.traffic === 0.5}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>

                    <div className="relative flex-1">
                      <Slider value={[config.traffic]} onValueChange={([v]) => updateConfig("traffic", v)} min={0.5} max={10} step={0.5} />
                      <div className="mt-2 flex justify-between px-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>0.5</span><span>3</span><span>5</span><span>7</span><span>10</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("traffic", 10)}
                      disabled={config.traffic === 10}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                {/* IP */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Network className="h-4 w-4 text-cyan-500 md:h-5 md:w-5" />
                      <span className="text-sm font-medium md:text-base">{L.ip}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.ip}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                      >
                        {config.ip} {L.units.ip}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement("ip", 1)}
                      disabled={config.ip === 1}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>

                    <div className="relative flex-1">
                      <Slider value={[config.ip]} onValueChange={([v]) => updateConfig("ip", v)} min={1} max={10} step={1} />
                      <div className="mt-2 flex justify-between px-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <span>1</span><span>3</span><span>5</span><span>7</span><span>10</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment("ip", 10)}
                      disabled={config.ip === 10}
                      className="h-8 w-8 shrink-0 border border-cyan-400/50 bg-white text-slate-900 hover:bg-cyan-50 dark:border-cyan-500/50 dark:bg-slate-800/50 dark:text-white dark:hover:bg-cyan-500/20 md:h-10 md:w-10"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-between rounded-xl bg-white/90 p-4 backdrop-blur-sm dark:bg-slate-800/50 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
                    {L.yourConfig}
                  </h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700 md:pb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.cpu.replace(":", "")}</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
                        {config.cpu} {L.units.vcpu}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700 md:pb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.ram.replace(":", "")}</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
                        {config.ram} {L.units.gb}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700 md:pb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.disk.replace(":", "")}</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
                        {config.nvme} {L.units.nvme}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700 md:pb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.traffic.replace(":", "")}</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
                        {config.traffic.toFixed(1)} {L.units.tb}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700 md:pb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.ip.replace(":", "")}</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
                        {config.ip} {L.units.ip}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 md:pt-4">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white md:text-lg">{L.pricing}</h4>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.monthly}</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={monthlyPrice.toFixed(2)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                        >
                          {monthlyPrice.toFixed(2)} {L.units.tjs}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-300 md:text-base">{L.daily}</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={dailyPrice.toFixed(2)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-lg font-bold text-slate-900 dark:text-white md:text-xl"
                        >
                          {dailyPrice.toFixed(2)} {L.units.tjs}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 pt-2 dark:border-slate-700 md:pt-3">
                      <span className="text-base font-semibold text-slate-900 dark:text-white md:text-lg">{L.total}</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={monthlyPrice.toFixed(2)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-2xl font-bold text-cyan-500 md:text-3xl"
                        >
                          {monthlyPrice.toFixed(2)} {L.units.tjs}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-teal-400 text-base font-semibold text-slate-900 hover:from-cyan-500 hover:to-teal-500 dark:text-white md:mt-6 md:text-lg"
                  onClick={() => {
                    window.location.href = orderUrl
                  }}
                >
                  {L.order}
                </Button>
              </div>
            </div>

            {/* unused but keeps lint happy since t used */}
            <span className="hidden">{t.nav?.home}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
