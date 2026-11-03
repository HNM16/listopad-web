"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  /** Display value, e.g. "99.98%", "1200+", "10 Gb/s". Numeric part animates, the rest is preserved. */
  value: string
  duration?: number
  className?: string
}

export function CountUp({ value, duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  const match = value.match(/^(\D*)([\d.,\s]*\d)(.*)$/)
  const prefix = match?.[1] ?? ""
  const numStr = match?.[2]?.replace(/[\s,]/g, "") ?? ""
  const suffix = match?.[3] ?? ""
  const target = Number.parseFloat(numStr)
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0

  // Server render shows the final value (correct without JS and for crawlers);
  // after mount it rewinds to zero and counts up once visible.
  const [display, setDisplay] = useState(Number.isNaN(target) ? "" : target.toFixed(decimals))
  const armed = useRef(false)

  useEffect(() => {
    if (!match || Number.isNaN(target) || reduce || armed.current) return
    armed.current = true
    setDisplay((0).toFixed(decimals))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!match || Number.isNaN(target)) return
    if (reduce) {
      setDisplay(target.toFixed(decimals))
      return
    }
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, decimals, reduce, duration])

  if (!match || Number.isNaN(target)) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  )
}
