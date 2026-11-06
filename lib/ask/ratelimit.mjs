// Per-IP fixed-window rate limit for /ask, in memory (one Railway instance).
// Defaults: 5 questions per minute and 30 per day per IP.
export function clientIp(headers) {
  const xff = headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return headers.get("x-real-ip") || "unknown"
}

export function createRateLimiter({ perMinute = 5, perDay = 30, maxKeys = 10000, now = () => Date.now() } = {}) {
  const hits = new Map() // ip -> { minute, minuteCount, day, dayCount }
  return {
    check(ip) {
      const t = now()
      const minute = Math.floor(t / 60000)
      const day = Math.floor(t / 86400000)
      let h = hits.get(ip)
      if (!h || h.day !== day) h = { minute, minuteCount: 0, day, dayCount: 0 }
      if (h.minute !== minute) { h.minute = minute; h.minuteCount = 0 }
      if (h.minuteCount >= perMinute) return { ok: false, retryAfterSec: 60 - Math.floor((t / 1000) % 60), scope: "minute" }
      if (h.dayCount >= perDay) return { ok: false, retryAfterSec: 86400 - Math.floor((t / 1000) % 86400), scope: "day" }
      h.minuteCount++
      h.dayCount++
      if (!hits.has(ip) && hits.size >= maxKeys) hits.delete(hits.keys().next().value)
      hits.set(ip, h)
      return { ok: true }
    },
  }
}
