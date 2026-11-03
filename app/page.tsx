import type { Metadata } from "next"
import HomePage from "./home-page"

export const metadata: Metadata = {
  title: "NVME VPS в Таджикистане – Облачные сервисы | listopadcloud",
  description:
    "listopadcloud — современные облачные сервисы Таджикистана – VPS, Облачное хранилище, CDN и защита.",
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return <HomePage />
}