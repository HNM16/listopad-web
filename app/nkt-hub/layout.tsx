import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Modern Internet Exchange — Digital backbone of Central Asia | listopadcloud",
  description:
    "Modern Internet Exchange in Dushanbe: local & international IX connectivity, colocation, access to global CDN platforms, and high network density.",
  metadataBase: new URL("https://listopad.tj"),
  alternates: {
    canonical: "/ix",
  },
}

export default function IxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}