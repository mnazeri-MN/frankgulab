import {
  Bot, BrainCircuit, Zap, Droplets, FlaskConical, Dna, Microscope, Atom,
  TestTube, Cpu, Network, TrendingUp, Magnet, Thermometer, Waves,
  CircuitBoard, Pill, HeartPulse, Syringe, Leaf, Database, Layers, Wrench, Globe,
} from "lucide-react"
import type { LucideProps } from "lucide-react"
import { getPayload } from "payload"
import config from "@payload-config"
import { SectionLabel } from "@/components/ui/section-label"

type IconComponent = React.ComponentType<LucideProps>

const ICONS: Record<string, IconComponent> = {
  Bot, BrainCircuit, Zap, Droplets, FlaskConical, Dna, Microscope, Atom,
  TestTube, Cpu, Network, TrendingUp, Magnet, Thermometer, Waves,
  CircuitBoard, Pill, HeartPulse, Syringe, Leaf, Database, Layers, Wrench, Globe,
}

export async function ResearchHighlights() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "research-highlights",
    sort: "order",
    limit: 20,
  })

  return (
    <section className="bg-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Areas of Focus</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
          Research Highlights
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((item) => {
            const Icon = ICONS[item.icon] ?? FlaskConical
            return (
              <div
                key={item.id}
                className="rounded-card bg-white p-6 ring-1 ring-ink/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-inner bg-ink">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-xl leading-8 text-dark-grey">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
