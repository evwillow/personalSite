"use client"
import { useEffect } from "react"

// Outcome events through the existing gtag on window (same GA4 ID as layout.js; no new vendor).
// One delegated listener, so every Resume and mailto link on every page is covered.
//   resume_download -> any link to /Evan_Maus_Resume.pdf
//   contact_click   -> mailto links and links to LinkedIn, GitHub or X
// case_study_75pct is not wired: no case-study pages exist yet (pending PUB04).
const send = (name, params) => {
  if (typeof window.gtag === "function") window.gtag("event", name, params)
}

export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (/Evan_Maus_Resume\.pdf(\?|#|$)/i.test(href)) {
        send("resume_download", { file_name: "Evan_Maus_Resume.pdf", page_path: window.location.pathname })
      } else if (href.startsWith("mailto:")) {
        send("contact_click", { method: "email", page_path: window.location.pathname })
      } else if (/^(https?:)?\/\/(www\.)?(linkedin\.com|github\.com|x\.com|twitter\.com)\//i.test(href)) {
        const method = href.match(/(linkedin|github|x|twitter)\.com/i)[1].toLowerCase()
        send("contact_click", { method, page_path: window.location.pathname })
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
