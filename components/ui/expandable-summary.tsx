"use client"

export function ExpandableSummary({ text, className }: { text: string; className?: string }) {
  return (
    <p className={`${className ?? ""} line-clamp-5`}>
      {text}
    </p>
  )
}
