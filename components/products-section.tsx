"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const products = [
  {
    image: "/images/products/cloud-server.png",
    key: "cloudServer" as const,
    link: "/pricing",
  },
  {
    image: "/images/products/cdn.png",
    key: "cdn" as const,
    link: "/cdn",
  },
  {
    image: "/images/products/dns.png",
    key: "dns" as const,
    link: "/dns",
  },
  {
    image: "/images/products/waf.png",
    key: "waf" as const,
    link: "/waf",
  },
]

export function ProductsSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="products" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-balance text-4xl font-bold">{t.products.title}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <CardHeader>
                  <div className="mb-4 flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-blue-900 p-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={t.products[product.key].title}
                      width={120}
                      height={120}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <CardTitle>{t.products[product.key].title}</CardTitle>
                  <CardDescription className="text-pretty">{t.products[product.key].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={product.link}>
                    <Button
                      variant="ghost"
                      className="group/btn p-0 text-blue-500 hover:bg-transparent hover:text-blue-600"
                    >
                      {t.products.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
