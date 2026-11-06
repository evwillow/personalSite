import { ImageResponse } from "next/og"

// 1200x630 social card, generated at build time. Text only, no figures.
export const alt = "Evan Maus | Economics, Data Science & AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1b1b1b",
          color: "#ffffff",
        }}
      >
        <div style={{ width: 120, height: 8, background: "#00cffd", marginBottom: 40 }} />
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>Evan Maus</div>
        <div style={{ fontSize: 44, marginTop: 24, color: "#d4d4d4" }}>
          Economics and Data Science at UC Berkeley
        </div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#00cffd" }}>
          I build software.
        </div>
        <div style={{ fontSize: 30, marginTop: 64, color: "#9ca3af" }}>evwillow.com</div>
      </div>
    ),
    { ...size }
  )
}
