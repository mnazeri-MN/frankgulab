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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ResearchHighlights />
        <Research />
        <People />
        <Publications />
        <News />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
