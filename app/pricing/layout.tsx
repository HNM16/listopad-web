import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Калькулятор стоимости облачных сервисов в Таджикистане | listopadcloud",
  description: "Рассчитайте стоимость облачных услуг быстро и удобно с нашим калькулятором.",
  alternates: { canonical: "/pricing" },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}