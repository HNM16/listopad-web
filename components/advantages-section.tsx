"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Layout, Dice1 } from "lucide-react"
import { useRef } from "react"

export function AdvantagesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="advantages" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center" 
        >
          <h2 className="text-balance text-4xl font-bold">{t.advantages.title}</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{t.advantages.security.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty leading-relaxed">
                  {t.advantages.security.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>


          {/* Power Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{t.advantages.power.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>{t.advantages.power.specs.sla}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{t.advantages.power.specs.cpu}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                    <span>{t.advantages.power.specs.gpu}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>{t.advantages.power.specs.bandwidth}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interface Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-green-500">
                  <Layout className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{t.advantages.interface.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty leading-relaxed">
                  {t.advantages.interface.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
