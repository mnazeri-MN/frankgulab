"use client"

export function ExportPeopleButton() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
      <a
        href="/api/export/people"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          fontSize: "13px",
          fontWeight: 500,
          border: "1px solid var(--theme-border-color, #ccc)",
          borderRadius: "4px",
          textDecoration: "none",
          color: "inherit",
          opacity: 0.85,
        }}
      >
        Export CSV
      </a>
    </div>
  )
}
