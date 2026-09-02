"use client"

import { useState } from "react"
import { useField } from "@payloadcms/ui"
import type { UIFieldClientProps } from "payload"

type Status = "idle" | "loading" | "done" | "error"

export function LinkedInNewsField(_props: UIFieldClientProps) {
  const { value: linkedInUrl } = useField<string>({ path: "linkedInUrl" })
  const { setValue: setTitle } = useField<string>({ path: "title" })
  const { setValue: setSource } = useField<string>({ path: "source" })
  const { setValue: setUrl } = useField<string>({ path: "url" })
  const { setValue: setImageUrl } = useField<string>({ path: "imageUrl" })

  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleFetch() {
    if (!linkedInUrl) return
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch(`/api/linkedin-oembed?url=${encodeURIComponent(linkedInUrl)}`)
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (data.title) setTitle(data.title)
      if (data.author_name) setSource(data.author_name)
      if (data.thumbnail_url) setImageUrl(data.thumbnail_url)
      setUrl(linkedInUrl)
      setStatus("done")
    } catch (e) {
      setStatus("error")
      setErrorMsg(e instanceof Error ? e.message : "Unknown error")
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <button
        type="button"
        onClick={handleFetch}
        disabled={!linkedInUrl || status === "loading"}
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          background: "var(--theme-elevation-800)",
          color: "var(--theme-elevation-0)",
          fontSize: 13,
          fontWeight: 600,
          cursor: !linkedInUrl || status === "loading" ? "not-allowed" : "pointer",
          opacity: !linkedInUrl || status === "loading" ? 0.5 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {status === "loading" ? "Fetching…" : "Fetch Details"}
      </button>
      {status === "done" && (
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--theme-success-500)" }}>
          ✓ Fields populated from LinkedIn. Set the date and summary, then save.
        </p>
      )}
      {status === "error" && (
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--theme-error-500)" }}>
          ✗ {errorMsg || "Could not fetch this URL. LinkedIn may be blocking the request — fill in fields manually."}
        </p>
      )}
    </div>
  )
}
