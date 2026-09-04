import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p
      data-section-label=""
      className={cn(
        "font-body text-base font-semibold uppercase tracking-[0.12em]",
        light ? "text-white/60" : "text-dark-grey"
      )}
    >
      {children}
    </p>
  )
}
