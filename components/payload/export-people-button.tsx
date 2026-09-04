"use client"

export function ExportPeopleButton() {
  return (
    <div style={{ padding: "0 16px 8px" }}>
      <a
        href="/api/export/people"
        style={{
          display: "block",
          padding: "6px 12px",
          fontSize: "13px",
          fontWeight: 500,
          textDecoration: "none",
          color: "inherit",
          opacity: 0.7,
          borderRadius: "4px",
        }}
      >
        ↓ Export People CSV
      </a>
    </div>
  )
}
