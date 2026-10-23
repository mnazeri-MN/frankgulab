"use client"

import { useRef, useState, useEffect } from "react"

export function ExpandableSummary({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setClamped(el.scrollHeight > el.clientHeight)
  }, [text])

  function toggle(e: React.MouseEvent | React.KeyboardEvent) {
    e.preventDefault()
    e.stopPropagation()
    setExpanded((v) => !v)
  }

  return (
    <>
      <p ref={ref} className={`${className ?? ""} ${!expanded ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      {(clamped || expanded) && (
        <span
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(e)}
          className="mt-1 block cursor-pointer font-body text-base font-medium text-grey transition-colors hover:text-ink"
        >
          {expanded ? "less" : "more"}
        </span>
      )}
    </>
  )
}
