/**
 * Decorative peering mesh: deterministic nodes linked by flowing light.
 * Pure SVG + CSS (seeded layout, so server and client markup match).
 */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const W = 1200
const H = 640

const nodes = (() => {
  const rnd = seeded(42)
  return Array.from({ length: 34 }, () => ({ x: 40 + rnd() * (W - 80), y: 40 + rnd() * (H - 80), r: 1.5 + rnd() * 2.5 }))
})()

const links = (() => {
  const out: [number, number][] = []
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j }) => j > i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ j, d }) => d < 320 && out.push([i, j]))
  })
  return out
})()

export function NetworkMesh({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className}>
      <defs>
        <linearGradient id="mesh-line" x1="0" x2="1">
          <stop offset="0" stopColor="var(--brand-cyan)" />
          <stop offset="1" stopColor="var(--brand-violet)" />
        </linearGradient>
      </defs>
      {links.map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="var(--brand)" strokeOpacity={0.14} strokeWidth={1} />
          <line
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#mesh-line)"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeDasharray="14 220"
            className="mesh-flow"
            style={{ animationDelay: `${(i * 0.37) % 6}s`, animationDuration: `${5 + (i % 5)}s` }}
          />
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r * 3.2} fill="var(--brand)" opacity={0.1} />
          <circle cx={n.x} cy={n.y} r={n.r} fill="var(--brand-cyan)" className="mesh-node" style={{ animationDelay: `${(i * 0.53) % 4}s` }} />
        </g>
      ))}
    </svg>
  )
}
