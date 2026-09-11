import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Research } from "@/components/sections/research"
import { People } from "@/components/sections/people"
import { Publications } from "@/components/sections/publications"
import { News } from "@/components/sections/news"
import { Blog } from "@/components/sections/blog"
import { Opportunities } from "@/components/sections/opportunities"
import { Contact } from "@/components/sections/contact"

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Research />
        <Publications cardVariant="e" cardLayout="grid3" />
        <People />
        <News cardVariant="e" cardLayout="grid3" />
        <Blog />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
