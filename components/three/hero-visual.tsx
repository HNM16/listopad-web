"use client"

import type { MotionValue } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// three.js + R3F live in their own chunk, fetched only on the home page.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")))
  } catch {
    return false
  }
}

/**
 * Lazy, resilient host for the 3D hero:
 * - waits for the browser to be idle before downloading three.js (protects LCP)
 * - pauses rendering when the hero leaves the viewport or the tab is hidden
 * - falls back to a static illustration when WebGL is unavailable
 */
export function HeroVisual({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { resolvedTheme } = useTheme()
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending")
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!supportsWebGL()) {
      setMode("fallback")
      return
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMode("webgl"), { timeout: 900 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setMode("webgl"), 200)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px" })
    io.observe(el)
    const onVis = () => setVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return (
    <div ref={host} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {/* Placeholder glow shown until the first WebGL frame */}
      <div
        className={cn(
          "absolute right-[8%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-brand/20 blur-[100px] transition-opacity duration-1000 lg:block",
          ready && "opacity-40",
        )}
      />

      {mode === "webgl" && (
        <div className={cn("absolute inset-0 transition-opacity duration-[1400ms] ease-out", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene
            progress={progress}
            isDark={resolvedTheme !== "light"}
            reducedMotion={reduce}
            active={inView && visible}
            onReady={() => setReady(true)}
          />
        </div>
      )}

      {mode === "fallback" && (
        <div className="absolute inset-x-0 top-[12%] flex justify-center lg:inset-y-0 lg:left-auto lg:right-[6%] lg:top-0 lg:items-center">
          <Image
            src="/images/hero-cloud-bg.png"
            alt=""
            width={600}
            height={262}
            priority
            className="animate-float w-[78%] max-w-xl drop-shadow-[0_30px_60px_rgba(0,143,255,0.35)] lg:w-[40vw]"
          />
        </div>
      )}
    </div>
  )
}
