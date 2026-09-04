"use client"

import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

type Params = { cards: string; labels: string; spacing: string; text: string }

const controls: { key: keyof Params; label: string; options: { value: string; label: string }[] }[] = [
  {
    key: "cards",
    label: "Cards",
    options: [
      { value: "a", label: "Current" },
      { value: "b", label: "Image · Title · Summary" },
      { value: "c", label: "Full Image · Overlay" },
      { value: "d", label: "Cropped · Title · Bottom Bar" },
    ],
  },
  {
    key: "labels",
    label: "Labels",
    options: [
      { value: "on", label: "Visible" },
      { value: "off", label: "Hidden" },
    ],
  },
  {
    key: "spacing",
    label: "Spacing",
    options: [
      { value: "default", label: "Default" },
      { value: "compact", label: "Compact" },
    ],
  },
  {
    key: "text",
    label: "Text",
    options: [
      { value: "default", label: "Default" },
      { value: "reduced", label: "Reduced" },
    ],
  },
]

export function DemoToolbar(params: Params) {
  const router = useRouter()

  function navigate(overrides: Partial<Params>) {
    const p = { ...params, ...overrides }
    router.push(`/demo?cards=${p.cards}&labels=${p.labels}&spacing=${p.spacing}&text=${p.text}`)
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-1 divide-x divide-ink/10 rounded-full border border-ink/15 bg-warm-white/95 shadow-lg backdrop-blur-md">
        {controls.map(({ key, label, options }) => (
          <div key={key} className="relative flex items-center gap-2 px-4 py-2 first:pl-5 last:pr-5">
            <span className="font-body text-xs font-medium uppercase tracking-widest text-grey">{label}</span>
            <div className="relative">
              <select
                value={params[key]}
                onChange={(e) => navigate({ [key]: e.target.value })}
                className="cursor-pointer appearance-none rounded bg-transparent py-0.5 pl-0 pr-5 font-body text-sm text-ink outline-none"
              >
                {options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-grey" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
