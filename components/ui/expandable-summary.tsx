"use client"

import { useState } from "react"

const WORD_LIMIT = 30

export function ExpandableSummary({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const words = text.trim().split(/\s+/)
  const needsTruncation = words.length > WORD_LIMIT

  function toggle(e: React.MouseEvent | React.KeyboardEvent) {
    e.preventDefault()
    e.stopPropagation()
    setExpanded((v) => !v)
  }

  const displayed = needsTruncation && !expanded
    ? words.slice(0, WORD_LIMIT).join(" ")
    : text

  return (
    <p className={className}>
      {displayed}
      {needsTruncation && (
        <>
          {!expanded && "…"}
          {" "}
          <span
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(e)}
            className="cursor-pointer font-medium text-grey transition-colors hover:text-ink"
          >
            {expanded ? "less" : "more"}
          </span>
        </>
      )}
    </p>
  )
}
