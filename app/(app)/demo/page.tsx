import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Research } from "@/components/sections/research"
import { ResearchHighlights } from "@/components/sections/research-highlights"
import { People } from "@/components/sections/people"
import { Publications } from "@/components/sections/publications"
import { News } from "@/components/sections/news"
import { Opportunities } from "@/components/sections/opportunities"
import { Contact } from "@/components/sections/contact"

export const dynamic = "force-dynamic"

type SearchParams = Promise<{ cards?: string; labels?: string; spacing?: string; text?: string }>

const cardVariants = [
  { key: "a", label: "Current" },
  { key: "b", label: "Image · Title · Summary" },
  { key: "c", label: "Full Image · Overlay" },
]

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const { cards = "a", labels = "on", spacing = "default", text = "default" } = await searchParams
  const cardVariant = (["a", "b", "c"].includes(cards) ? cards : "a") as "a" | "b" | "c"
  const showLabels = labels !== "off"
  const compact = spacing === "compact"
  const reduced = text === "reduced"

  const wrapperClasses = [
    "min-h-screen",
    showLabels ? "" : "[&_[data-section-label]]:hidden",
    compact ? "[&_section]:!py-12" : "",
    reduced ? "[&_[data-reduced-text]]:!text-lg [&_[data-reduced-text]]:!leading-8" : "",
  ].filter(Boolean).join(" ")

  function href(overrides: Record<string, string>) {
    const p = { cards, labels, spacing, text, ...overrides }
    return `/demo?cards=${p.cards}&labels=${p.labels}&spacing=${p.spacing}&text=${p.text}`
  }

  return (
    <>
      <div className={wrapperClasses}>
        <Navbar />
        <main>
          <Hero />
          <ResearchHighlights />
          <Research />
          <People />
          <Publications cardVariant={cardVariant} />
          <News cardVariant={cardVariant} />
          <Opportunities />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating demo toolbar */}
      <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-warm-white/95 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Cards</span>
          <div className="h-3 w-px bg-ink/15" />
          {cardVariants.map((v) => (
            <a key={v.key} href={href({ cards: v.key })}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${cardVariant === v.key ? "bg-ink text-white" : "text-grey hover:text-ink"}`}>
              {v.label}
            </a>
          ))}
          <div className="h-3 w-px bg-ink/15" />
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Labels</span>
          <div className="h-3 w-px bg-ink/15" />
          {[{ key: "on", label: "Visible" }, { key: "off", label: "Hidden" }].map((v) => (
            <a key={v.key} href={href({ labels: v.key })}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${labels === v.key ? "bg-ink text-white" : "text-grey hover:text-ink"}`}>
              {v.label}
            </a>
          ))}
          <div className="h-3 w-px bg-ink/15" />
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Spacing</span>
          <div className="h-3 w-px bg-ink/15" />
          {[{ key: "default", label: "Default" }, { key: "compact", label: "Compact" }].map((v) => (
            <a key={v.key} href={href({ spacing: v.key })}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${spacing === v.key ? "bg-ink text-white" : "text-grey hover:text-ink"}`}>
              {v.label}
            </a>
          ))}
          <div className="h-3 w-px bg-ink/15" />
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Text</span>
          <div className="h-3 w-px bg-ink/15" />
          {[{ key: "default", label: "Default" }, { key: "reduced", label: "Reduced" }].map((v) => (
            <a key={v.key} href={href({ text: v.key })}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${text === v.key ? "bg-ink text-white" : "text-grey hover:text-ink"}`}>
              {v.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
