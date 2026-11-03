import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Payload = {
  name: string
  email: string
  phone?: string
  message: string
  website?: string // honeypot
}

/** ===== Rate limit (in-memory) =====
 * 5 запросов / 10 минут / IP
 * Важно: если у тебя будет несколько инстансов — нужен Redis. Для одного сервера норм.
 */
type Bucket = { count: number; resetAt: number }
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQ = 5
const buckets = new Map<string, Bucket>()

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for") || ""
  const ip = xff.split(",")[0]?.trim()
  return ip || "unknown"
}

function rateLimit(ip: string) {
  const now = Date.now()
  const b = buckets.get(ip)

  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true as const, remaining: MAX_REQ - 1 }
  }

  if (b.count >= MAX_REQ) {
    const retryAfterSec = Math.ceil((b.resetAt - now) / 1000)
    return { ok: false as const, retryAfterSec }
  }

  b.count += 1
  buckets.set(ip, b)
  return { ok: true as const, remaining: MAX_REQ - b.count }
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)

    // ✅ rate limit
    const rl = rateLimit(ip)
    if (!rl.ok) {
      console.warn(`[contact] rate limit hit ip=${ip} retryAfter=${rl.retryAfterSec}s`)
      return Response.json(
        { error: `Too many requests. Retry after ${rl.retryAfterSec}s` },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
      )
    }

    const body = (await req.json()) as Payload

    // ✅ honeypot
    if (body.website) return Response.json({ ok: true })

    const name = String(body.name || "").trim().slice(0, 80)
    const email = String(body.email || "").trim().toLowerCase().slice(0, 120)
    const phone = String(body.phone || "").trim().slice(0, 40)
    const message = String(body.message || "").trim().slice(0, 4000)

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }
    if (!isEmailValid(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 })
    }

    // ENV
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || user

    if (!host || !user || !pass) {
      console.error("[contact] Missing SMTP env:", {
        SMTP_HOST: host,
        SMTP_PORT: port,
        SMTP_USER: user ? "set" : "missing",
        SMTP_PASS: pass ? "set" : "missing",
      })
      return Response.json({ error: "SMTP not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // ✅ 587 = STARTTLS
      auth: { user, pass },
      requireTLS: true,
      tls: { minVersion: "TLSv1.2" },
    })

    await transporter.verify()

    await transporter.sendMail({
      from: from || user,
      to: "sales@listopad.tj",
      subject: `Заявка с сайта: ${name}`,
      replyTo: email,
      text:
        `Имя: ${name}\n` +
        `Email: ${email}\n` +
        `Телефон: ${phone || "-"}\n` +
        `IP: ${ip}\n\n` +
        `Сообщение:\n${message}\n`,
    })

    return Response.json({ ok: true, remaining: rl.remaining })
  } catch (e: any) {
    console.error("[contact] Failed to send:", e?.message || e)
    if (e?.stack) console.error(e.stack)
    return Response.json({ error: e?.message || "Failed to send" }, { status: 500 })
  }
}
