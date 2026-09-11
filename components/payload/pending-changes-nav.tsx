"use client"

import { usePathname } from "next/navigation"

export function PendingChangesNav() {
  const pathname = usePathname()
  const isActive = pathname === "/admin/pending-changes"
  return (
    <div style={{ padding: "0 16px 4px" }}>
      <a
        href="/admin/pending-changes"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          color: isActive ? "var(--theme-text)" : "var(--theme-elevation-500)",
          background: isActive ? "var(--theme-elevation-100)" : "transparent",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        <span style={{ fontSize: 15 }}>📋</span>
        Pending Changes
      </a>
    </div>
  )
}
