import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Mixture Lab — Frank Gu Lab, University of Toronto"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Logo: 7 circles in a hexagonal arrangement
// Original viewBox 356×392, scaled to fit ~200px tall
const SCALE = 200 / 392
const circles = [
  { cx: 178,   cy: 61,    fill: "#47537a" },
  { cx: 294.8, cy: 128.5, fill: "#a1a9bc" },
  { cx: 294.8, cy: 263.5, fill: "#9098af" },
  { cx: 178,   cy: 331,   fill: "#7c85a0" },
  { cx: 61,    cy: 263.5, fill: "#6d7794" },
  { cx: 61,    cy: 128.5, fill: "#576485" },
  { cx: 178,   cy: 196,   fill: "#293147" },
]
const R = Math.round(61 * SCALE)   // ~31px

export default function OGImage() {
  const logoW = Math.round(356 * SCALE)  // ~182
  const logoH = Math.round(392 * SCALE)  // 200

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1a2035",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo rendered as positioned divs */}
        <div
          style={{
            position: "relative",
            width: logoW,
            height: logoH,
            flexShrink: 0,
            marginRight: 64,
          }}
        >
          {circles.map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: R * 2,
                height: R * 2,
                borderRadius: "50%",
                background: c.fill,
                left: Math.round(c.cx * SCALE) - R,
                top: Math.round(c.cy * SCALE) - R,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The Mixture Lab
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#9098af",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Prof. Frank Gu · University of Toronto
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 22,
              color: "#7c85a0",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 560,
            }}
          >
            Automated discovery & AI-driven formulation
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
