"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import type { MotionValue } from "framer-motion"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

/* -------------------------------------------------------------------------- */
/*  Config                                                                     */
/* -------------------------------------------------------------------------- */

const BLADES = 4
const BLADE_W = 3.4
const BLADE_H = 0.46
const BLADE_D = 2.3
const BLADE_GAP = 0.62
const INTRO_SECONDS = 2.8
/** Aspect ratio of the pre-rendered poster; the live scene uses the same framing rule. */
export const POSTER_ASPECT = 0.9
const BASE_SCALE = 0.85

const PALETTE = {
  dark: {
    metal: "#344057",
    led: "#2aa8ff",
    ledHot: "#bdf3ff",
    ring: "#3aa8ff",
    particle: "#8fd3ff",
    backlight: "#1f7bff",
    floorGlow: "#1f9bff",
    shadowOpacity: 0.45,
    blending: THREE.AdditiveBlending,
  },
  light: {
    metal: "#1c2436",
    led: "#008fff",
    ledHot: "#7fe3ff",
    ring: "#0a84ff",
    particle: "#2f8fff",
    backlight: "#7cc4ff",
    floorGlow: "#58b4ff",
    shadowOpacity: 0.22,
    blending: THREE.NormalBlending,
  },
} as const

type Palette = (typeof PALETTE)[keyof typeof PALETTE]


/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const ORIGIN = new THREE.Vector3(0, 0, 0)
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const damp = THREE.MathUtils.damp

/** Soft round sprite used for glows and particles (generated, no asset fetch). */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.25, "rgba(255,255,255,0.55)")
    g.addColorStop(0.6, "rgba(255,255,255,0.12)")
    g.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

/** Image-based lighting from a procedural studio room: real reflections without HDR downloads. */
function StudioEnvironment() {
  const { gl, scene, invalidate } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.9
    invalidate()
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
      ;(room as unknown as { dispose?: () => void }).dispose?.()
    }
  }, [gl, scene, invalidate])
  return null
}

/* -------------------------------------------------------------------------- */
/*  Server stack                                                               */
/* -------------------------------------------------------------------------- */

function ServerStack({ palette, glow, progress, reducedMotion }: { palette: Palette; glow: THREE.Texture; progress: MotionValue<number>; reducedMotion: boolean }) {
  const blades = useRef<(THREE.Group | null)[]>([])
  const ledMats = useRef<THREE.MeshStandardMaterial[]>([])
  const scanners = useRef<(THREE.Mesh | null)[]>([])

  const bladeGeo = useMemo(() => new RoundedBoxGeometry(BLADE_W, BLADE_H, BLADE_D, 3, 0.09), [])
  const ventGeo = useMemo(() => new THREE.BoxGeometry(0.035, BLADE_H * 0.52, 0.02), [])
  const ledGeo = useMemo(() => new THREE.BoxGeometry(1.9, 0.045, 0.02), [])
  const scanGeo = useMemo(() => new THREE.BoxGeometry(0.32, 0.06, 0.025), [])
  const dotGeo = useMemo(() => new THREE.SphereGeometry(0.035, 16, 16), [])
  const coreGeo = useMemo(() => new THREE.BoxGeometry(BLADE_W * 0.82, 0.06, BLADE_D * 0.7), [])

  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: palette.metal,
        metalness: 0.88,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMapIntensity: 0.85,
      }),
    [palette.metal],
  )

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#dff1ff",
        metalness: 0,
        roughness: 0.08,
        // Plain translucency instead of `transmission`, which costs a full extra render pass.
        opacity: 0.42,
        thickness: 0.6,
        ior: 1.45,
        iridescence: 0.6,
        iridescenceIOR: 1.3,
        clearcoat: 1,
        envMapIntensity: 1.4,
        transparent: true,
      }),
    [],
  )

  const ventMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#05070c", metalness: 0.4, roughness: 0.6 }), [])
  const scanMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: palette.ledHot, emissive: palette.ledHot, emissiveIntensity: 4, toneMapped: false }),
    [palette.ledHot],
  )
  const coreMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: palette.led, emissive: palette.led, emissiveIntensity: 3, toneMapped: false }),
    [palette.led],
  )
  const dotMats = useMemo(
    () =>
      ["#3ef2a6", "#2fd4f0", palette.led].map(
        (c) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 3, toneMapped: false }),
      ),
    [palette.led],
  )

  // One LED material per blade so each can breathe on its own rhythm.
  ledMats.current = useMemo(
    () =>
      Array.from(
        { length: BLADES },
        () => new THREE.MeshStandardMaterial({ color: palette.led, emissive: palette.led, emissiveIntensity: 2, toneMapped: false }),
      ),
    [palette.led],
  )

  // Each resource is released only when it is replaced or the scene unmounts.
  useEffect(() => () => [bladeGeo, ventGeo, ledGeo, scanGeo, dotGeo, coreGeo, ventMat].forEach((r) => r.dispose()), [bladeGeo, ventGeo, ledGeo, scanGeo, dotGeo, coreGeo, ventMat])
  useEffect(() => () => metal.dispose(), [metal])
  useEffect(() => () => glass.dispose(), [glass])
  useEffect(() => () => [scanMat, coreMat, ...dotMats].forEach((m) => m.dispose()), [scanMat, coreMat, dotMats])
  const leds = ledMats.current
  useEffect(() => () => leds.forEach((m) => m.dispose()), [leds])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = progress.get()
    const explode = easeOutCubic(Math.min(1, p * 1.6))

    for (let i = 0; i < BLADES; i++) {
      const g = blades.current[i]
      if (!g) continue
      const centered = i - (BLADES - 1) / 2
      const float = reducedMotion ? 0 : Math.sin(t * 1.1 + i * 0.9) * 0.035
      const targetY = centered * (BLADE_GAP + explode * 0.75) + float
      const ease = (cur: number, target: number, lambda: number) => (reducedMotion ? target : damp(cur, target, lambda, delta))
      g.position.y = ease(g.position.y, targetY, 6)
      g.rotation.y = ease(g.rotation.y, centered * 0.32 * explode, 5)
      g.position.z = ease(g.position.z, -centered * 0.25 * explode, 5)

      const mat = ledMats.current[i]
      if (mat) mat.emissiveIntensity = reducedMotion ? 2 : 1.7 + Math.sin(t * 2.2 + i * 1.3) * 0.7

      const scan = scanners.current[i]
      if (scan) {
        const phase = reducedMotion ? 0.5 : (t * 0.45 + i * 0.29) % 1
        scan.position.x = -0.35 - 0.95 + phase * 1.9
      }
    }
  })

  return (
    <group>
      {Array.from({ length: BLADES }, (_, i) => {
        const isTop = i === BLADES - 1
        const centered = i - (BLADES - 1) / 2
        return (
          <group key={i} ref={(el) => void (blades.current[i] = el)} position={[0, centered * BLADE_GAP, 0]}>
            <mesh geometry={bladeGeo} material={isTop ? glass : metal} />

            {isTop && <mesh geometry={coreGeo} material={coreMat} />}

            {/* front face */}
            <group position={[0, 0, BLADE_D / 2 + 0.006]}>
              {Array.from({ length: 9 }, (_, v) => (
                <mesh key={v} geometry={ventGeo} material={ventMat} position={[-BLADE_W / 2 + 0.28 + v * 0.075, 0, 0]} />
              ))}
              <mesh geometry={ledGeo} material={ledMats.current[i]} position={[-0.35, 0, 0]} />
              <mesh ref={(el) => void (scanners.current[i] = el)} geometry={scanGeo} material={scanMat} position={[-0.35, 0, 0.004]} />
              {dotMats.map((m, d) => (
                <mesh key={d} geometry={dotGeo} material={m} position={[BLADE_W / 2 - 0.62 + d * 0.16, 0, 0.01]} />
              ))}
            </group>
          </group>
        )
      })}

      {/* inner light bleeding between blades */}
      <sprite scale={[6.5, 3.6, 1]} position={[0, 0, -0.4]}>
        <spriteMaterial map={glow} color={palette.backlight} transparent opacity={0.35} depthWrite={false} blending={palette.blending} />
      </sprite>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Orbit rings with travelling data packets                                   */
/* -------------------------------------------------------------------------- */

const RINGS = [
  { radius: 3.1, tilt: [1.2, 0.15, 0.2], speed: 0.16, packets: 3 },
  { radius: 3.75, tilt: [1.45, -0.35, -0.15], speed: -0.11, packets: 2 },
  { radius: 4.4, tilt: [1.05, 0.5, 0.35], speed: 0.07, packets: 4 },
] as const

function OrbitRings({ palette, glow, reducedMotion }: { palette: Palette; glow: THREE.Texture; reducedMotion: boolean }) {
  const ringRefs = useRef<(THREE.Group | null)[]>([])
  const packetRefs = useRef<(THREE.Group | null)[][]>(RINGS.map(() => []))

  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: palette.ring, transparent: true, opacity: 0.45, depthWrite: false }),
    [palette.ring],
  )
  const packetMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: palette.ledHot, emissive: palette.ledHot, emissiveIntensity: 5, toneMapped: false }),
    [palette.ledHot],
  )
  const packetGeo = useMemo(() => new THREE.SphereGeometry(0.045, 16, 16), [])
  const ringGeos = useMemo(() => RINGS.map((r) => new THREE.TorusGeometry(r.radius, 0.0065, 8, 220)), [])

  useEffect(
    () => () => {
      ringMat.dispose()
      packetMat.dispose()
      packetGeo.dispose()
      ringGeos.forEach((g) => g.dispose())
    },
    [ringMat, packetMat, packetGeo, ringGeos],
  )

  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime
    RINGS.forEach((ring, ri) => {
      const group = ringRefs.current[ri]
      if (group) group.rotation.z = t * ring.speed * 0.6
      packetRefs.current[ri].forEach((pkt, pi) => {
        if (!pkt) return
        const a = t * ring.speed * 4 + (pi / ring.packets) * Math.PI * 2
        pkt.position.set(Math.cos(a) * ring.radius, Math.sin(a) * ring.radius, 0)
      })
    })
  })

  return (
    <group>
      {RINGS.map((ring, ri) => (
        <group key={ri} rotation={ring.tilt as unknown as THREE.Euler}>
          <group ref={(el) => void (ringRefs.current[ri] = el)}>
            <mesh geometry={ringGeos[ri]} material={ringMat} />
            {Array.from({ length: ring.packets }, (_, pi) => (
              <group key={pi} ref={(el) => void (packetRefs.current[ri][pi] = el)}>
                <mesh geometry={packetGeo} material={packetMat} />
                <sprite scale={[0.55, 0.55, 1]}>
                  <spriteMaterial map={glow} color={palette.led} transparent opacity={0.9} depthWrite={false} blending={palette.blending} />
                </sprite>
              </group>
            ))}
          </group>
        </group>
      ))}
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Atmosphere                                                                 */
/* -------------------------------------------------------------------------- */

function Particles({ palette, glow, count, reducedMotion }: { palette: Palette; glow: THREE.Texture; count: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = (r * Math.cos(phi)) * 0.55
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 3
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y += delta * 0.018
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={glow}
        color={palette.particle}
        size={0.085}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={palette.blending}
      />
    </points>
  )
}

/** Baked soft contact shadow: a dark radial sprite instead of a real-time shadow-map pass. */
function useShadowTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(0,0,0,1)")
    g.addColorStop(0.45, "rgba(0,0,0,0.55)")
    g.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

function Floor({ palette, glow }: { palette: Palette; glow: THREE.Texture }) {
  const shadow = useShadowTexture()
  useEffect(() => () => shadow.dispose(), [shadow])
  return (
    <group position={[0, -2.35, 0]}>
      <mesh rotation-x={-Math.PI / 2} scale={[1, 0.62, 1]}>
        <planeGeometry args={[7.5, 7.5]} />
        <meshBasicMaterial map={shadow} transparent opacity={palette.shadowOpacity * 1.6} depthWrite={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
        <planeGeometry args={[9, 9]} />
        <meshBasicMaterial map={glow} color={palette.floorGlow} transparent opacity={0.5} depthWrite={false} blending={palette.blending} />
      </mesh>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Rig: framing, pointer parallax, camera                                     */
/* -------------------------------------------------------------------------- */

function Rig({
  children,
  progress,
  reducedMotion,
  intro,
}: {
  children: React.ReactNode
  progress: MotionValue<number>
  reducedMotion: boolean
  intro: boolean
}) {
  const root = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const { camera, size } = useThree()
  const start = useRef<number | null>(null)

  useFrame((state, delta) => {
    const g = root.current
    const s = spin.current
    if (!g || !s) return
    const t = state.clock.elapsedTime
    if (start.current === null) start.current = t
    const local = t - start.current
    const p = progress.get()

    // Same framing rule as the poster image (object-fit: contain at POSTER_ASPECT):
    // fill the height on wide boxes, fit the width on narrow ones.
    const aspect = size.width / size.height
    const scale = BASE_SCALE * Math.min(1, aspect / POSTER_ASPECT)
    const ease = (cur: number, target: number, lambda: number) => (reducedMotion ? target : damp(cur, target, lambda, delta))
    g.position.y = ease(g.position.y, -p * 1.2, 4)
    g.scale.setScalar(ease(g.scale.x, scale * (1 - p * 0.12), 4))

    // Pointer parallax + slow showroom rotation (both start at the poster pose).
    const px = reducedMotion ? 0 : state.pointer.x
    const py = reducedMotion ? 0 : state.pointer.y
    const idle = reducedMotion ? 0 : Math.sin(local * 0.25) * 0.35
    s.rotation.y = ease(s.rotation.y, -0.55 + idle + px * 0.35 + p * 0.9, 3)
    s.rotation.x = ease(s.rotation.x, 0.12 - py * 0.12 + p * 0.25, 3)

    // Optional dolly-in; skipped when a poster was shown so the hand-off is seamless.
    const k = reducedMotion || !intro ? 1 : easeOutCubic(Math.min(1, local / INTRO_SECONDS))
    const camZ = THREE.MathUtils.lerp(17, 11.2, k) + p * 2.2
    const camY = THREE.MathUtils.lerp(4.2, 1.1, k) + p * 1.6
    const camX = reducedMotion ? 0 : Math.sin(local * 0.18) * 0.2 + px * 0.25
    camera.position.set(camX, camY, camZ)
    camera.lookAt(0, -0.1 + p * 0.4, 0)
  })

  return (
    <group ref={root} scale={BASE_SCALE}>
      <group ref={spin} rotation={[0.12, -0.55, 0]}>
        {children}
      </group>
    </group>
  )
}

function Lights({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.6} />
      <directionalLight position={[1.5, 10, 3]} intensity={isDark ? 2.6 : 2.8} />
      <pointLight position={[-4.5, 1.5, -3]} intensity={isDark ? 60 : 30} color="#1f8bff" distance={14} />
      <pointLight position={[4, -1, 3]} intensity={isDark ? 22 : 12} color="#2fd4f0" distance={10} />
      <pointLight position={[0, 4, -4]} intensity={isDark ? 25 : 10} color="#8a7bff" distance={12} />
    </>
  )
}

function Scene({
  isDark,
  progress,
  reducedMotion,
  particleCount,
  intro,
  onDegrade,
}: {
  isDark: boolean
  progress: MotionValue<number>
  reducedMotion: boolean
  particleCount: number
  intro: boolean
  onDegrade?: () => void
}) {
  const glow = useGlowTexture()
  const palette = isDark ? PALETTE.dark : PALETTE.light
  const invalidate = useThree((st) => st.invalidate)
  useEffect(() => () => glow.dispose(), [glow])
  // In on-demand mode, render fresh frames whenever the look changes.
  useEffect(() => {
    invalidate()
    const id = requestAnimationFrame(() => invalidate())
    return () => cancelAnimationFrame(id)
  }, [invalidate, reducedMotion, isDark])

  return (
    <>
      <StudioEnvironment />
      {onDegrade && <PerfGuard onDegrade={onDegrade} />}
      <Lights isDark={isDark} />

      {/* backlight halo behind the hero object */}
      <sprite position={[0, 0.2, -6]} scale={[20, 14, 1]}>
        <spriteMaterial map={glow} color={palette.backlight} transparent opacity={isDark ? 0.5 : 0.45} depthWrite={false} blending={palette.blending} />
      </sprite>

      {particleCount > 0 && <Particles palette={palette} glow={glow} count={particleCount} reducedMotion={reducedMotion} />}

      <Rig progress={progress} reducedMotion={reducedMotion} intro={intro}>
        <ServerStack palette={palette} glow={glow} progress={progress} reducedMotion={reducedMotion} />
        <OrbitRings palette={palette} glow={glow} reducedMotion={reducedMotion} />
        <Floor palette={palette} glow={glow} />
      </Rig>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Adaptive quality                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Samples real frame times. Below ~40 fps it drops the pixel ratio to 1;
 * if the device still can't keep up it asks the host to fall back to the
 * static poster (which unmounts the canvas and frees the GPU).
 */
function PerfGuard({ onDegrade }: { onDegrade: () => void }) {
  const setDpr = useThree((st) => st.setDpr)
  const begin = useRef<number | null>(null)
  const windowStart = useRef(0)
  const frames = useRef(0)
  const lowered = useRef(false)
  const done = useRef(false)

  // Time-based windows (not frame counts) so a struggling device is detected
  // within a few seconds even at very low frame rates.
  useFrame(() => {
    if (done.current) return
    const now = performance.now()
    if (begin.current === null) {
      begin.current = now
      return
    }
    if (now - begin.current < 1000) return // shader compilation / first upload
    if (windowStart.current === 0) {
      windowStart.current = now
      frames.current = 0
      return
    }
    frames.current++
    const elapsed = now - windowStart.current
    if (elapsed < 1500) return
    const fps = (frames.current * 1000) / elapsed
    windowStart.current = now
    frames.current = 0
    if (fps >= 40) return
    if (!lowered.current && fps >= 20) {
      lowered.current = true
      setDpr(1)
      return
    }
    done.current = true
    onDegrade()
  })
  return null
}

/* -------------------------------------------------------------------------- */
/*  Canvas                                                                     */
/* -------------------------------------------------------------------------- */

export type HeroSceneProps = {
  /** 0 → hero fully visible, 1 → hero scrolled out. */
  progress: MotionValue<number>
  isDark: boolean
  reducedMotion: boolean
  /** Rendering is paused when false (off-screen / tab hidden). */
  active: boolean
  /** Play the camera dolly-in. Off when a poster was shown first. */
  intro?: boolean
  /** Number of background particles (0 disables them). */
  particles?: number
  onReady?: () => void
  /** Called when the device can't sustain a usable frame rate. */
  onDegrade?: () => void
}

export default function HeroScene({ progress, isDark, reducedMotion, active, intro = false, particles = 420, onReady, onDegrade }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
      camera={{ position: [0, intro ? 4.2 : 1.1, intro ? 17 : 11.2], fov: 32, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        gl.setClearColor(0x000000, 0)
        requestAnimationFrame(() => onReady?.())
      }}
      aria-hidden
    >
      <Scene
        isDark={isDark}
        progress={progress}
        reducedMotion={reducedMotion}
        particleCount={particles}
        intro={intro}
        onDegrade={onDegrade}
      />
    </Canvas>
  )
}
