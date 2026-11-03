"use client"

import { useLanguage } from "@/hooks/use-language"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const clients = [
  { name: "Xymo", logo: "/images/clients/xymo.webp" },
  { name: "Фотострана", logo: "/images/clients/fotostrana.png" },
  { name: "PAYDO", logo: "/images/clients/paydo.svg" },
  { name: "DocX", logo: "/images/clients/docx.png" },
]

export function ClientsSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-balance text-3xl font-bold">{t.clients.title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="flex h-20 w-full items-center justify-center rounded-lg p-4 bg-card">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
