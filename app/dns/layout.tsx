import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DNS-сервис от надежного провайдера в Таджикистане | listopadcloud",
  description: "Обеспечиваем надежную и быструю работу вашего домена с профессиональным DNS сервисом от ведущего облачного провайдера Таджикистана.",
  alternates: { canonical: "/dns" },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}