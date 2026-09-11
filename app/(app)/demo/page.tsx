import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Research } from "@/components/sections/research"
import { People } from "@/components/sections/people"
import { Publications } from "@/components/sections/publications"
import { News } from "@/components/sections/news"
import { Opportunities } from "@/components/sections/opportunities"
import { Contact } from "@/components/sections/contact"
import { DemoToolbar } from "./demo-toolbar"

export const dynamic = "force-dynamic"

type SearchParams = Promise<{ cards?: string; layout?: string; labels?: string; spacing?: string; text?: string }>

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const { cards = "a", layout = "carousel", labels = "on", spacing = "default", text = "default" } = await searchParams
  const cardVariant = (["a", "b", "c", "d", "e"].includes(cards) ? cards : "a") as "a" | "b" | "c" | "d" | "e"
  const cardLayout = (["carousel", "grid3"].includes(layout) ? layout : "carousel") as "carousel" | "grid3"
  const showLabels = labels !== "off"
  const compact = spacing === "compact"
  const reduced = text === "reduced"

  const wrapperClasses = [
    "min-h-screen",
    showLabels ? "" : "[&_[data-section-label]]:hidden",
    compact ? "[&_section]:!py-12" : "",
    reduced ? "[&_[data-reduced-text]]:!text-lg [&_[data-reduced-nav]]:!px-3 [&_[data-reduced-nav]]:!py-2 [&_[data-reduced-nav]]:lg:!px-8" : "",
  ].filter(Boolean).join(" ")

  return (
    <>
      <div className={wrapperClasses}>
        <Navbar />
        <main>
          <Hero />
          <Research />
          <Publications cardVariant={cardVariant} cardLayout={cardLayout} />
          <People />
          <News cardVariant={cardVariant} cardLayout={cardLayout} />
          <Opportunities />
          <Contact />
        </main>
        <Footer />
      </div>

      <DemoToolbar cards={cards} layout={layout} labels={labels} spacing={spacing} text={text} />
    </>
  )
}
