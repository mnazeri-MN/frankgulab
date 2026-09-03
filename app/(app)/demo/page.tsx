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

type SearchParams = Promise<{ cards?: string; labels?: string }>

const cardVariants = [
  { key: "a", label: "Current" },
  { key: "b", label: "Image · Title · Summary" },
  { key: "c", label: "Full Image · Overlay" },
]

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const { cards = "a", labels = "on" } = await searchParams
  const cardVariant = (["a", "b", "c"].includes(cards) ? cards : "a") as "a" | "b" | "c"
  const showLabels = labels !== "off"

  return (
    <>
      <div className={`min-h-screen${showLabels ? "" : " [&_[data-section-label]]:hidden"}`}>
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

      {/* Floating demo toolbar — fixed bottom, out of the way */}
      <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-warm-white/95 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Cards</span>
          <div className="h-3 w-px bg-ink/15" />
          {cardVariants.map((v) => (
            <a
              key={v.key}
              href={`/demo?cards=${v.key}&labels=${labels}`}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${
                cardVariant === v.key ? "bg-ink text-white" : "text-grey hover:text-ink"
              }`}
            >
              {v.label}
            </a>
          ))}
          <div className="h-3 w-px bg-ink/15" />
          <span className="px-3 font-body text-xs font-medium uppercase tracking-widest text-grey">Labels</span>
          <div className="h-3 w-px bg-ink/15" />
          {["on", "off"].map((v) => (
            <a
              key={v}
              href={`/demo?cards=${cards}&labels=${v}`}
              className={`rounded-full px-3 py-1 font-body text-sm transition-colors ${
                labels === v ? "bg-ink text-white" : "text-grey hover:text-ink"
              }`}
            >
              {v === "on" ? "Visible" : "Hidden"}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
