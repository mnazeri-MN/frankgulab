"use client"

import { useState } from "react"
import { useField } from "@payloadcms/ui"
import type { TextFieldClientProps } from "payload"
import { lookupDoi } from "@/lib/actions/doi"

type Status = "idle" | "loading" | "done" | "error"

export function DoiField(props: TextFieldClientProps) {
  const { value: doi, setValue: setDoi } = useField<string>({ path: props.path })
  const { setValue: setTitle } = useField<string>({ path: "title" })
  const { setValue: setFirstAuthor } = useField<string>({ path: "firstAuthor" })
  const { setValue: setYear } = useField<number>({ path: "year" })
  const { setValue: setHref } = useField<string>({ path: "href" })
  const { setValue: setFetchedImageUrl } = useField<string>({ path: "fetchedImageUrl" })

  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleFetch() {
    if (!doi) return
    setStatus("loading")
    setErrorMsg("")
    try {
      const result = await lookupDoi(doi)
      if (result.title) setTitle(result.title)
      if (result.firstAuthor) setFirstAuthor(result.firstAuthor)
      if (result.year) setYear(result.year)
      if (result.href) setHref(result.href)
      if (result.imageUrl) setFetchedImageUrl(result.imageUrl)
      setStatus("done")
    } catch (e) {
      setStatus("error")
      setErrorMsg(e instanceof Error ? e.message : "Unknown error")
    }
  }

  return (
    <div className="field-type text">
      <label
        style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600 }}
      >
        DOI
      </label>
      <p style={{ marginBottom: 8, fontSize: 12, color: "var(--theme-elevation-500)" }}>
        Paste a DOI (e.g. <code>10.1038/s41586-021-03819-2</code>) then click
        Fetch to auto-fill the fields below.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={doi ?? ""}
          onChange={(e) => { setDoi(e.target.value); setStatus("idle") }}
          placeholder="10.1038/… or https://doi.org/…"
          style={{
            flex: 1,
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: 4,
            padding: "8px 10px",
            fontSize: 13,
            background: "var(--theme-input-bg)",
            color: "var(--theme-text)",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={handleFetch}
          disabled={!doi || status === "loading"}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            background: "var(--theme-elevation-800)",
            color: "var(--theme-elevation-0)",
            fontSize: 13,
            fontWeight: 600,
            cursor: !doi || status === "loading" ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: !doi || status === "loading" ? 0.5 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {status === "loading" ? "Fetching…" : "Fetch Details"}
        </button>
      </div>
      {status === "done" && (
        <p style={{ marginTop: 6, fontSize: 12, color: "var(--theme-success-500)" }}>
          ✓ Fields populated from CrossRef. Review and save.
        </p>
      )}
      {status === "error" && (
        <p style={{ marginTop: 6, fontSize: 12, color: "var(--theme-error-500)" }}>
          ✗ {errorMsg || "Could not fetch this DOI. Check it and try again."}
        </p>
      )}
    </div>
  )
}
