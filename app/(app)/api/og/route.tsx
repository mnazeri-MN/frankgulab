import { ImageResponse } from "next/og"

export const runtime = "edge"

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#1a2035",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          {/* 7 circles — laid out inline so no absolute positioning needed */}
          {[
            "#47537a", "#a1a9bc", "#9098af",
            "#7c85a0", "#6d7794", "#576485", "#293147",
          ].map((color, i) => (
            <div
              key={i}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: color,
                marginRight: 10,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          The Mixture Lab
        </div>
        <div style={{ fontSize: 28, color: "#9098af", marginBottom: 12 }}>
          Prof. Frank Gu · University of Toronto
        </div>
        <div style={{ fontSize: 22, color: "#7c85a0" }}>
          Automated discovery and AI-driven formulation
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
