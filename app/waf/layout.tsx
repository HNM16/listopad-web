import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Защита веб-приложений с WAF-сервисом от облачного провайдера | listopadcloud",
  description: "Обеспечьте безопасность вашего веб-проекта с продвинутым WAF-сервисом от облачного провайдера. Защитите приложения от SQL инъекций и других угроз.",
  alternates: { canonical: "/waf" },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}