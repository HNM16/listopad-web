"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  const { t } = useLanguage()

  const content = {
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 22 октября 2025",
      sections: [
        {
          title: "1. Сбор информации",
          content:
            "Мы собираем информацию, которую вы предоставляете при регистрации и использовании наших услуг, включая имя, адрес электронной почты, платежную информацию и технические данные о вашем использовании сервисов. Также мы автоматически собираем информацию о вашем устройстве, IP-адресе, браузере и действиях на нашем сайте.",
        },
        {
          title: "2. Использование информации",
          content:
            "Собранная информация используется для предоставления и улучшения наших услуг, обработки платежей, технической поддержки, отправки уведомлений о состоянии сервисов и важных обновлениях. Мы также используем данные для анализа использования сервисов и предотвращения мошенничества.",
        },
        {
          title: "3. Защита данных",
          content:
            "Мы применяем современные технологии шифрования и защиты данных. Все данные хранятся на защищенных серверах с ограниченным доступом. Мы регулярно проводим аудит безопасности и обновляем системы защиты. Доступ к персональным данным имеют только уполномоченные сотрудники, которые обязаны соблюдать конфиденциальность.",
        },
        {
          title: "4. Передача данных третьим лицам",
          content:
            "Мы не продаем и не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством. Мы можем передавать данные нашим партнерам для обработки платежей и предоставления технической поддержки, при этом партнеры обязаны соблюдать конфиденциальность.",
        },
        {
          title: "5. Файлы cookie",
          content:
            "Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента. Вы можете отключить cookie в настройках браузера, однако это может ограничить функциональность сайта. Мы используем как собственные cookie, так и cookie третьих лиц для аналитики.",
        },
        {
          title: "6. Ваши права",
          content:
            "Вы имеете право на доступ к своим персональным данным, их исправление, удаление или ограничение обработки. Вы можете отозвать согласие на обработку данных в любое время. Для реализации своих прав свяжитесь с нами по адресу privacy@listopadcloud.com.",
        },
        {
          title: "7. Изменения в политике",
          content:
            "Мы оставляем за собой право изменять настоящую Политику конфиденциальности. О существенных изменениях мы уведомим вас по электронной почте за 14 дней до вступления изменений в силу. Рекомендуем регулярно проверять эту страницу для ознакомления с актуальной версией политики.",
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 22, 2025",
      sections: [
        {
          title: "1. Information Collection",
          content:
            "We collect information you provide when registering and using our services, including name, email address, payment information, and technical data about your use of services. We also automatically collect information about your device, IP address, browser, and actions on our website.",
        },
        {
          title: "2. Use of Information",
          content:
            "The collected information is used to provide and improve our services, process payments, provide technical support, send notifications about service status and important updates. We also use data to analyze service usage and prevent fraud.",
        },
        {
          title: "3. Data Protection",
          content:
            "We use modern encryption and data protection technologies. All data is stored on secure servers with restricted access. We regularly conduct security audits and update protection systems. Only authorized employees have access to personal data and are required to maintain confidentiality.",
        },
        {
          title: "4. Data Transfer to Third Parties",
          content:
            "We do not sell or transfer your personal data to third parties without your consent, except as required by law. We may transfer data to our partners for payment processing and technical support, and partners are required to maintain confidentiality.",
        },
        {
          title: "5. Cookies",
          content:
            "We use cookies to improve website functionality, analyze traffic, and personalize content. You can disable cookies in your browser settings, but this may limit website functionality. We use both our own cookies and third-party cookies for analytics.",
        },
        {
          title: "6. Your Rights",
          content:
            "You have the right to access your personal data, correct it, delete it, or restrict processing. You can withdraw consent to data processing at any time. To exercise your rights, contact us at privacy@listopadcloud.com.",
        },
        {
          title: "7. Policy Changes",
          content:
            "We reserve the right to change this Privacy Policy. We will notify you of significant changes by email 14 days before the changes take effect. We recommend regularly checking this page to review the current version of the policy.",
        },
      ],
    },
    tj: {
      title: "Сиёсати махфият",
      lastUpdated: "Навсозии охирин: 22 октябри соли 2025",
      sections: [
        {
          title: "1. Ҷамъоварии маълумот",
          content:
            "Мо маълумотеро, ки шумо ҳангоми сабти ном ва истифодаи хидматҳои мо пешниҳод мекунед, аз ҷумла ном, суроғаи почтаи электронӣ, маълумоти пардохт ва маълумоти техникӣ дар бораи истифодаи хидматҳо ҷамъ меоварем. Мо инчунин ба таври худкор маълумот дар бораи дастгоҳи шумо, суроғаи IP, браузер ва амалҳои шумо дар сомонаи мо ҷамъ меоварем.",
        },
        {
          title: "2. Истифодаи маълумот",
          content:
            "Маълумоти ҷамъовардашуда барои пешниҳод ва беҳтар кардани хидматҳои мо, коркарди пардохтҳо, дастгирии техникӣ, фиристодани огоҳиҳо дар бораи ҳолати хидматҳо ва навсозиҳои муҳим истифода мешавад. Мо инчунин маълумотро барои таҳлили истифодаи хидматҳо ва пешгирии қаллобӣ истифода мебарем.",
        },
        {
          title: "3. Ҳифзи маълумот",
          content:
            "Мо технологияҳои муосири рамзгузорӣ ва ҳифзи маълумотро истифода мебарем. Ҳамаи маълумот дар серверҳои муҳофизатшуда бо дастрасии маҳдуд нигоҳ дошта мешаванд. Мо мунтазам санҷиши бехатариро гузаронида, системаҳои ҳифзро навсозӣ мекунем. Танҳо кормандони ваколатдор ба маълумоти шахсӣ дастрасӣ доранд ва онҳо бояд махфиятро риоя кунанд.",
        },
        {
          title: "4. Интиқоли маълумот ба шахсони сеюм",
          content:
            "Мо маълумоти шахсии шуморо бе розигии шумо ба шахсони сеюм намефурӯшем ва интиқол намедиҳем, ба ғайр аз ҳолатҳое, ки бо қонунгузорӣ пешбинӣ шудаанд. Мо метавонем маълумотро ба шарикони худ барои коркарди пардохтҳо ва пешниҳоди дастгирии техникӣ интиқол диҳем, дар ин ҳолат шарикон бояд махфиятро риоя кунанд.",
        },
        {
          title: "5. Файлҳои cookie",
          content:
            "Мо файлҳои cookie-ро барои беҳтар кардани кори сомона, таҳлили трафик ва шахсикунонии мундариҷа истифода мебарем. Шумо метавонед cookie-ро дар танзимоти браузер хомӯш кунед, аммо ин метавонад функсионалии сомонаро маҳдуд кунад. Мо ҳам cookie-и худӣ ва ҳам cookie-и шахсони сеюмро барои таҳлил истифода мебарем.",
        },
        {
          title: "6. Ҳуқуқҳои шумо",
          content:
            "Шумо ҳуқуқ доред ба маълумоти шахсии худ дастрасӣ дошта бошед, онҳоро ислоҳ, нест ё коркарди онҳоро маҳдуд кунед. Шумо метавонед розигии худро барои коркарди маълумот дар ҳар вақт бозпас гиред. Барои амалӣ кардани ҳуқуқҳои худ бо мо тавассути суроғаи privacy@listopadcloud.com тамос гиред.",
        },
        {
          title: "7. Тағйирот дар сиёсат",
          content:
            "Мо ҳуқуқи тағир додани ин Сиёсати махфиятро аз худ нигоҳ медорем. Дар бораи тағйироти муҳим мо шуморо тавассути почтаи электронӣ 14 рӯз пеш аз эътибори тағйирот огоҳ мекунем. Тавсия медиҳем, ки ин саҳифаро мунтазам барои шинос шудан бо версияи ҷории сиёсат санҷед.",
        },
      ],
    },
  }

  const lang = t.nav.about === "О компании" ? "ru" : t.nav.about === "About" ? "en" : "tj"
  const pageContent = content[lang]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl"
            >
              <div className="mb-6 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-balance text-center text-5xl font-bold">{pageContent.title}</h1>
              <p className="mt-4 text-center text-sm text-muted-foreground">{pageContent.lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-4xl space-y-8"
            >
              {pageContent.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{section.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
