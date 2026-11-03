import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ускорение сайтов и приложений - оператор CDN в Таджикистане | listopadcloud",
  description: "Подключите сайт к CDN, чтобы обеспечить быструю загрузку тяжелой статики и трансляцию видео без обрывов и буферизации.",
  alternates: { canonical: "/cdn" },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}