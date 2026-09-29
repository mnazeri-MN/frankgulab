import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Mixture Lab — Frank Gu Lab, University of Toronto"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  const circles = [
    { cx: 178,   cy: 61,    r: 61, fill: "#47537a" },
    { cx: 294.8, cy: 128.5, r: 61, fill: "#a1a9bc" },
    { cx: 294.8, cy: 263.5, r: 61, fill: "#9098af" },
    { cx: 178,   cy: 331,   r: 61, fill: "#7c85a0" },
    { cx: 61,    cy: 263.5, r: 61, fill: "#6d7794" },
    { cx: 61,    cy: 128.5, r: 61, fill: "#576485" },
    { cx: 178,   cy: 196,   r: 61, fill: "#293147" },
  ]

  // Scale the 356×392 logo to fit ~220px tall in the image
  const scale = 200 / 392
  const logoW = 356 * scale   // ~182
  const logoH = 392 * scale   // 200
  const logoX = 90            // left margin
  const logoY = (630 - logoH) / 2  // vertically centred

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
        {/* Logo */}
        <svg
          width={logoW}
          height={logoH}
          viewBox="0 0 356 392"
          style={{ flexShrink: 0, marginRight: 64 }}
        >
          {circles.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} />
          ))}
        </svg>

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
