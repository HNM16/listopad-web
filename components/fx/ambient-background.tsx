/**
 * Fixed, site-wide atmospheric layer: slow aurora light, a faint
 * engineering grid and film grain. Pure CSS so it costs nothing on the
 * main thread and renders before hydration.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
      <div
        className="animate-aurora-a absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
      />
      <div
        className="animate-aurora-b absolute -right-[20%] top-[25%] h-[60vmax] w-[60vmax] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--aurora-3), transparent)" }}
      />
      <div
        className="animate-aurora-a absolute -bottom-[30%] left-[20%] h-[55vmax] w-[55vmax] rounded-full blur-[120px] [animation-delay:-9s]"
        style={{ background: "radial-gradient(closest-side, var(--aurora-2), transparent)" }}
      />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]" />
    </div>
  )
}
