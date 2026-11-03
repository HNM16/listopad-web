"use client"

import type { MotionValue } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// three.js + R3F live in their own chunk, fetched only when the live scene is used.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false })

type Mode = "poster" | "webgl"

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")))
  } catch {
    return false
  }
}

/**
 * Decide whether this device should run the live 3D scene.
 * Everything else keeps the pre-rendered poster, which looks the same at rest.
 * `?hero3d=on|off` overrides the check (handy for QA).
 */
function canRunLive3D(): boolean {
  const flag = new URLSearchParams(window.location.search).get("hero3d")
  if (flag === "off") return false
  if (flag === "on") return supportsWebGL()

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return false
  if (nav.connection?.saveData) return false
  if (nav.connection?.effectiveType && /(^|-)2g|3g/.test(nav.connection.effectiveType)) return false
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false
  return supportsWebGL()
}

/** Run `cb` after the page has fully loaded and the main thread is idle. */
function afterLoadAndIdle(cb: () => void) {
  let cancelled = false
  let idleId: number | undefined
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
    cancelIdleCallback?: (id: number) => void
  }
  const schedule = () => {
    if (cancelled) return
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => !cancelled && cb(), { timeout: 2000 })
    else idleId = window.setTimeout(() => !cancelled && cb(), 300)
  }
  if (document.readyState === "complete") schedule()
  else window.addEventListener("load", schedule, { once: true })
  return () => {
    cancelled = true
    window.removeEventListener("load", schedule)
    if (idleId !== undefined) (w.cancelIdleCallback ?? window.clearTimeout)(idleId)
  }
}

/**
 * Hero visual host.
 * 1. Always renders a pre-rendered poster of the scene (instant, no JS needed).
 * 2. On capable desktops, loads three.js after the page is idle and cross-fades
 *    to the live scene, which starts from the poster's exact pose.
 * 3. Pauses the canvas off-screen / in background tabs, and falls back to the
 *    poster if the device can't keep a usable frame rate.
 */
export function HeroVisual({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { resolvedTheme } = useTheme()
  const [mode, setMode] = useState<Mode>("poster")
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!canRunLive3D()) return
    return afterLoadAndIdle(() => setMode("webgl"))
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

  const live = mode === "webgl"

  return (
    <div
      ref={host}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[56svh] sm:h-[60svh]",
        "lg:inset-y-0 lg:left-[40%] lg:right-0 lg:h-auto",
        "[mask-image:linear-gradient(to_bottom,black_72%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_16%)]",
        className,
      )}
    >
      {/* Poster: CSS background so only the active theme's image is downloaded. */}
      <div
        className={cn(
          "hero-poster absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-700",
          !live && "animate-float",
          live && ready ? "opacity-0" : "opacity-100",
        )}
      />

      {live && (
        <div className={cn("absolute inset-0 transition-opacity duration-700 ease-out", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene
            progress={progress}
            isDark={resolvedTheme !== "light"}
            reducedMotion={reduce}
            active={inView && visible}
            onReady={() => setReady(true)}
            onDegrade={() => {
              setMode("poster")
              setReady(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
