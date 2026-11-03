"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LegalLayout } from "@/components/legal-layout"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/fx/reveal"
import { useLanguage } from "@/hooks/use-language"
import { Mail, ShieldCheck } from "lucide-react"

export default function TermsPage() {
  const { t } = useLanguage()

  const tr = (ru: string, en: string, tj: string) =>
    t.nav.about === "О компании" ? ru : t.nav.about === "About" ? en : tj

  const sections = [
    {
      title: tr("1. Определения", "1. Definitions", "1. Муайянкуниҳо"),
      text: tr(
        "Условия предоставления услуг — настоящие Общие условия. Пользователь — сторона, которой адресована оферта. Продукты — движимое имущество. Услуги — все работы и действия в рамках соглашения. Соглашение — любой акцепт оферты.",
        "Terms of Service — these General Terms. User — the party addressed by the offer. Products — movable property. Services — all works and actions under the agreement. Agreement — any acceptance of the offer.",
        "Шартҳои хизматрасонӣ — ин Шартҳои умумӣ. Корбар — тарафе, ки пешниҳод ба ӯ нигаронида шудааст. Маҳсулот — амволи манқул. Хизматрасониҳо — ҳама корҳо ва амалҳо дар доираи созишнома. Созишнома — ҳар гуна қабули пешниҳод."
      )
    },
    {
      title: tr("2. Применимость Общих условий", "2. Applicability", "2. Татбиқи шартҳои умумӣ"),
      text: tr(
        "Условия применимы ко всем офертам и соглашениям Listopad.tj. Отступления действительны только в письменной форме. Listopad.tj отклоняет общие условия покупки Пользователя.",
        "Terms apply to all Listopad.tj offers and agreements. Deviations are valid only in writing. Listopad.tj explicitly rejects User's general purchase terms.",
        "Шартҳо ба ҳама пешниҳодҳо ва созишномаҳои Listopad.tj татбиқ мешаванд. Истисноҳо танҳо дар шакли хаттӣ эътибор доранд. Listopad.tj шартҳои умумии хариди Корбарро рад мекунад."
      )
    },
    {
      title: tr("3. Оферта и Соглашение", "3. Offer and Agreement", "3. Пешниҳод ва Созишнома"),
      text: tr(
        "Соглашения заключаются на срок 36 месяцев, если не указано иное. Продление происходит автоматически на 12 месяцев. Пользователь может прекратить использование в любое время.",
        "Agreements are concluded for 36 months unless otherwise agreed. Automatic renewal for 12 months. User may terminate use at any time.",
        "Созишномаҳо ба муҳлати 36 моҳ баста мешаванд, агар тартиби дигаре пешбинӣ нашуда бошад. Тамдиди автоматӣ барои 12 моҳ. Корбар метавонад истифодаро дилхоҳ вақт қатъ кунад."
      )
    },
    {
      title: tr("4. Цены, тарифы и надбавки", "4. Prices and Tariffs", "4. Нархҳо ва тарифҳо"),
      text: tr(
        "Цены указаны в сомони с учетом НДС. Listopad.tj имеет право изменять тарифы. Изменения вступают в силу через 2 месяца после объявления.",
        "Prices are in TJS including VAT. Listopad.tj reserves the right to change tariffs. Changes take effect 2 months after announcement.",
        "Нархҳо бо сомонӣ бо назардошти ААИ нишон дода шудаанд. Listopad.tj ҳуқуқ дорад тарифҳоро тағйир диҳад. Тағйирот пас аз 2 моҳи эълон эътибор пайдо мекунанд."
      )
    },
    {
      title: tr("5. Политика допустимого использования", "5. Acceptable Use Policy", "5. Сиёсати истифодаи қобили қабул"),
      text: tr(
        "Ресурсы предназначены для обычного потребления. Превышение лимитов или нарушение стабильности системы может привести к ограничению услуг экспертами платформы.",
        "Resources are intended for normal consumption. Exceeding limits or disrupting system stability may lead to service restriction by platform experts.",
        "Захираҳо барои истифодаи муқаррарӣ пешбинӣ шудаанд. Гузаштан аз меъёр ё халалдор кардани устувории система метавонад боиси маҳдуд шудани хизматрасониҳо гардад."
      )
    },
    {
      title: tr("6. Оплата", "6. Payment", "6. Пардохт"),
      text: tr(
        "Срок оплаты счета — 30 дней, если не указано иное. На просроченную сумму начисляются пени в размере 2% в месяц. При задержке более 7 дней данные могут быть удалены.",
        "Payment term is 30 days unless specified. Overdue payments incur 2% monthly interest. Data may be deleted if payment is delayed more than 7 days.",
        "Муҳлати пардохт 30 рӯз аст. Ба маблағи гузашташуда 2% ҷаримаи моҳона ҳисоб карда мешавад. Дар сурати зиёда аз 7 рӯз таъхир кардан, маълумот метавонад нест карда шавад."
      )
    },
    {
      title: tr("7. Политика возврата", "7. Refund Policy", "7. Сиёсати баргардонидан"),
      text: tr(
        "После активации услуги денежные средства возврату не подлежат, кроме случаев технических ошибок или непредоставления услуги согласно законам РТ.",
        "Refunds are not available after service activation, except for technical errors or failure to provide service under RT laws.",
        "Пас аз фаъолсозии хизматрасонӣ маблағ баргардонида намешавад, ба истиснои хатогиҳои техникӣ ё пешниҳод нашудани хизматрасонӣ."
      )
    },
    {
      title: tr("8. Удаление учетной записи", "8. Account Deletion", "8. Нест кардани ҳисоб"),
      text: tr(
        "Запрос направляется на support@listopad.tj. Информация о транзакциях сохраняется для предотвращения мошенничества и отмывания денег.",
        "Requests must be sent to support@listopad.tj. Transaction records are retained for fraud and anti-money laundering compliance.",
        "Дархост ба support@listopad.tj фиристода мешавад. Маълумоти транзаксияҳо барои пешгирии қаллобӣ нигоҳ дошта мешавад."
      )
    },
    {
      title: tr("9. Передача, риски и сохранение прав", "9. Transfer and Risks", "9. Интиқол ва хатарҳо"),
      text: tr(
        "Риск потери или повреждения Продуктов переходит к Пользователю в момент фактического владения. Пользователь обязан проверить Продукт сразу после получения.",
        "Risk of loss or damage passes to the User upon physical possession. User must inspect Products immediately upon delivery.",
        "Хатари гум шудан ё зарар дидани Маҳсулот ҳангоми соҳиб шудан ба Корбар мегузарад. Корбар бояд маҳсулотро фавран тафтиш кунад."
      )
    },
    {
      title: tr("10. Претензии", "10. Claims", "10. Эътирозҳо"),
      text: tr(
        "Претензии по счетам или качеству услуг принимаются в течение 14 дней. По истечении этого срока услуги и суммы считаются утвержденными.",
        "Claims regarding invoices or service quality must be submitted within 14 days. After this period, amounts and services are deemed approved.",
        "Эътирозҳо оид ба ҳисобҳо ё сифати хизматрасонӣ дар давоми 14 рӯз қабул карда мешаванд. Пас аз ин муҳлат хизматрасониҳо тасдиқшуда ҳисобида мешаванд."
      )
    },
    {
      title: tr("11. Интеллектуальная собственность", "11. Intellectual Property", "11. Моликияти зеҳнӣ"),
      text: tr(
        "Все права принадлежат Listopad.tj. Пользователю предоставляется неисключительное право использования. Публичное размножение запрещено без разрешения.",
        "All rights belong to Listopad.tj. User is granted a non-exclusive right to use. Public reproduction is prohibited without permission.",
        "Ҳама ҳуқуқҳо ба Listopad.tj тааллуқ доранд. Ба корбар ҳуқуқи истифодаи ғайриистисноӣ дода мешавад. Нашри оммавӣ бидуни иҷозат манъ аст."
      )
    },
    {
      title: tr("12. Предоставление информации", "12. Information Provision", "12. Пешниҳоди иттилоот"),
      text: tr(
        "Пользователь обязан предоставлять точную информацию и гарантирует, что персональные данные получены в соответствии с законодательством РТ.",
        "User must provide accurate information and guarantees that personal data is obtained in compliance with RT legislation.",
        "Корбар вазифадор аст иттилооти дақиқ пешниҳод кунад ва кафолат диҳад, ки маълумоти шахсӣ тибқи қонунгузории ҶТ гирифта шудааст."
      )
    },
    {
      title: tr("13. Конфиденциальность", "13. Confidentiality", "13. Махфият"),
      text: tr(
        "Стороны обязуются не разглашать конфиденциальную информацию друг друга и наложить это обязательство на свой персонал.",
        "Parties agree not to disclose each other's confidential information and to impose this obligation on their personnel.",
        "Тарафҳо уҳдадор мешаванд, ки маълумоти махфии якдигарро ошкор накунанд ва ин вазифаро ба кормандони худ гузоранд."
      )
    },
    {
      title: tr("14. Ответственность Listopad.tj", "14. Liability of Listopad.tj", "14. Масъулияти Listopad.tj"),
      text: tr(
        "Ответственность ограничена реальным ущербом и не превышает 3000 сомони за случай. Косвенный ущерб и упущенная выгода исключаются.",
        "Liability is limited to actual damages and shall not exceed 3000 TJS per case. Indirect losses and lost profits are excluded.",
        "Масъулият бо зарари воқеӣ маҳдуд буда, аз 3000 сомонӣ зиёд нест. Зарари ғайримустақим ва фоидаи аз даст рафта ҷуброн карда намешавад."
      )
    },
    {
      title: tr("15. Обстоятельства непреодолимой силы", "15. Force Majeure", "15. Ҳолатҳои рафънопазир"),
      text: tr(
        "При действии форс-мажора более 60 дней Пользователь может расторгнуть соглашение. Listopad.tj не несет ответственности за ущерб в таких случаях.",
        "In case of force majeure lasting over 60 days, User may terminate the agreement. Listopad.tj is not liable for damages in such events.",
        "Дар сурати зиёда аз 60 рӯз давом кардани ҳолатҳои рафънопазир, Корбар метавонад созишномаро қатъ кунад."
      )
    },
    {
      title: tr("16. Расторжение соглашения", "16. Termination", "16. Қатъи созишнома"),
      text: tr(
        "Срок уведомления о расторжении — 3 месяца (для серверов — 1 месяц). Порнографический или эксплуатирующий контент является основанием для немедленного удаления.",
        "Termination notice period is 3 months (1 month for servers). Pornographic or exploitative content is grounds for immediate termination.",
        "Муҳлати огоҳӣ дар бораи қатъи созишнома 3 моҳ (барои серверҳо 1 моҳ) аст. Контенти порнографӣ боиси қатъи фаврӣ мегардад."
      )
    },
    {
      title: tr("17. Прекращение предоставления услуг", "17. Cessation of Services", "17. Қатъи хизматрасонӣ"),
      text: tr(
        "При прекращении услуг необходимо удалить данные. Если доступ блокируется за вредоносную деятельность, Listopad.tj уведомляет владельца по e-mail.",
        "Data must be deleted upon service cessation. If access is blocked for malicious activity, Listopad.tj notifies the owner via email.",
        "Ҳангоми қатъи хизматрасонӣ маълумот бояд нест карда шавад. Дар сурати бастани дастрасӣ барои фаъолияти зараровар, бо почтаи электронӣ огоҳӣ фиристода мешавад."
      )
    },
    {
      title: tr("18. Приостановка за неуплату", "18. Suspension for Non-payment", "18. Қатъи муваққатӣ барои пардохт накардан"),
      text: tr(
        "При нулевом балансе доступ к панели блокируется немедленно. Через 48 часов отключаются экземпляры, через неделю/месяц (зависит от услуги) — данные удаляются безвозвратно.",
        "At zero balance, panel access is blocked immediately. Instances shut down after 48 hours; data is permanently deleted after 1 week/month depending on service.",
        "Дар сурати бақияи сифрӣ, дастрасӣ фавран баста мешавад. Пас аз 48 соат серверҳо хомӯш мешаванд, пас аз як ҳафта/моҳ маълумот комилан нест карда мешавад."
      )
    },
    {
      title: tr("19. Персонал", "19. Personnel", "19. Кормандон"),
      text: tr(
        "Пользователь не имеет права нанимать персонал Listopad.tj в течение срока действия соглашения и 1 года после его окончания без разрешения.",
        "User may not hire Listopad.tj personnel during the agreement term and for 1 year thereafter without written permission.",
        "Корбар ҳуқуқ надорад кормандони Listopad.tj-ро дар давоми муҳлати созишнома ва 1 сол пас аз он ба кор гирад."
      )
    },
    {
      title: tr("20. Разрешение споров", "20. Dispute Resolution", "20. Ҳалли баҳсҳо"),
      text: tr(
        "Споры решаются путем переговоров. При недостижении согласия — в судебном порядке в соответствии с законодательством Республики Таджикистан.",
        "Disputes are resolved via negotiations. If unresolved, they shall be settled in court according to the laws of the Republic of Tajikistan.",
        "Баҳсҳо тавассути гуфтушунид ҳал карда мешаванд. Дар сурати ба мувофиқа наомадан — дар суд тибқи қонунгузории ҶТ."
      )
    },
    {
      title: tr("21. Деактивация Услуг", "21. Service Deactivation", "21.Ғайрифаъолсозии хизматрасониҳо"),
      text: tr(
        "Listopad.tj может отключать услуги для техобслуживания или за нарушения. Повторное подключение стоит 30 сомони (без НДС).",
        "Listopad.tj may deactivate services for maintenance or violations. Reconnection fee is 30 TJS (excluding VAT).",
        "Listopad.tj метавонад хизматрасониро барои корҳои техникӣ ё вайронкуниҳо қатъ кунад. Пайвастшавии дубора 30 сомонӣ (бидуни ААИ) мебошад."
      )
    },
    {
      title: tr("22. Запрещенные действия", "22. Prohibited Activities", "22. Амалҳои мамнӯъ"),
      text: tr(
        "Запрещены: спам, DDoS, фишинг, хакерство, детская порнография и террористическая деятельность. При нарушении данные удаляются немедленно без возврата средств.",
        "Prohibited: spam, DDoS, phishing, hacking, child pornography, and terrorism-related activity. Violations lead to immediate data deletion without refund.",
        "Спам, DDoS, фишинг, ҳакерӣ, порнографияи кӯдакона ва фаъолияти террористӣ манъ аст. Дар сурати вайронкунӣ маълумот фавран нест карда мешавад."
      )
    },
    {
      title: tr("23. Заявления о конфиденциальности", "23. Privacy Statements", "23. Изҳорот дар бораи махфият"),
      text: tr(
        "Listopad.tj обеспечивает защиту персональных данных в соответствии с применимыми законами. Контакты: support@listopad.tj.",
        "Listopad.tj ensures personal data protection in accordance with applicable laws. Contact: support@listopad.tj.",
        "Listopad.tj ҳифзи маълумоти шахсиро тибқи қонунҳои амалкунанда таъмин мекунад. Тамос: support@listopad.tj."
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          icon={ShieldCheck}
          eyebrow="v2.0 2026"
          title={tr("Условия предоставления услуг", "Terms of Service", "Шартҳои хизматрасонӣ")}
          description={tr(
            "Полный перечень правил и обязательств при использовании платформы Listopad.tj",
            "Complete list of rules and obligations when using the Listopad.tj platform",
            "Рӯйхати пурраи қоидаҳо ва уҳдадориҳо ҳангоми истифодаи платформаи Listopad.tj",
          )}
        />

        <LegalLayout
          sections={sections.map((s) => ({ title: s.title, body: s.text }))}
          footer={
            <Reveal className="pt-8">
              <div className="ring-gradient rounded-[2rem]">
                <div className="glass relative overflow-hidden rounded-[inherit] p-8 md:p-10">
                  <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
                  <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-display text-2xl font-medium">Listopad.tj</h3>
                      <p className="mt-2 text-muted-foreground">ООО «Лидер Консалтинг»</p>
                      <div className="mt-6 space-y-1.5 text-sm text-muted-foreground">
                        <p>ИНН: 010092118</p>
                        <p>{tr("Адрес: г. Душанбе, ул. Бухоро, 13", "Address: 13 Bukhoro St, Dushanbe", "Суроға: ш. Душанбе, к. Бухоро, 13")}</p>
                      </div>
                    </div>
                    <a
                      href="mailto:support@listopad.tj"
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-cyan)_-20%,var(--brand)_45%,var(--brand-violet)_140%)] px-7 py-3 font-semibold text-white shadow-[0_12px_30px_-10px_var(--brand)] transition-all hover:brightness-110"
                    >
                      <Mail className="h-4 w-4" />
                      support@listopad.tj
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          }
        />
      </main>

      <Footer />
    </div>
  )
}
