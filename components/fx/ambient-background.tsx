/**
 * Fixed, site-wide atmospheric layer: soft light pools, a faint engineering
 * grid and grain. Deliberately static and filter-free: radial gradients are
 * already soft, so no blur() or blend modes that would repaint on scroll.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(60vmax 50vmax at 10% 0%, var(--aurora-1), transparent 70%)",
            "radial-gradient(50vmax 45vmax at 95% 40%, var(--aurora-3), transparent 70%)",
            "radial-gradient(50vmax 40vmax at 40% 110%, var(--aurora-2), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="noise absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  )
}
