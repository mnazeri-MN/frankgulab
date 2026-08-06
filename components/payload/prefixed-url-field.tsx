"use client"
import { useField } from "@payloadcms/ui"
import type { TextFieldClientProps } from "payload"

type Props = TextFieldClientProps & {
  prefix: string
  placeholder?: string
}

function PrefixedUrlField({ field, path, prefix, placeholder }: Props) {
  const { value, setValue } = useField<string>({ path })
  const suffix = value?.startsWith(prefix) ? value.slice(prefix.length) : (value ?? "")

  return (
    <div className="field-type text">
      <label
        className="field-label"
        style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600 }}
      >
        {field.label as string}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: 4,
          overflow: "hidden",
          background: "var(--theme-input-bg)",
        }}
      >
        <span
          style={{
            padding: "8px 10px",
            color: "var(--theme-elevation-500)",
            whiteSpace: "nowrap",
            background: "var(--theme-elevation-50)",
            borderRight: "1px solid var(--theme-elevation-150)",
            fontSize: 13,
            userSelect: "none",
          }}
        >
          {prefix}
        </span>
        <input
          type="text"
          value={suffix}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value ? prefix + e.target.value : "")}
          style={{
            flex: 1,
            border: "none",
            padding: "8px 10px",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "var(--theme-text)",
            minWidth: 0,
          }}
        />
      </div>
    </div>
  )
}

export function LinkedInField(props: TextFieldClientProps) {
  return (
    <PrefixedUrlField
      {...props}
      prefix="https://linkedin.com/in/"
      placeholder="username"
    />
  )
}

export function LinkedInCompanyField(props: TextFieldClientProps) {
  return (
    <PrefixedUrlField
      {...props}
      prefix="https://linkedin.com/company/"
      placeholder="company-slug"
    />
  )
}

export function ScholarField(props: TextFieldClientProps) {
  return (
    <PrefixedUrlField
      {...props}
      prefix="https://scholar.google.ca/citations?user="
      placeholder="user-id"
    />
  )
}
