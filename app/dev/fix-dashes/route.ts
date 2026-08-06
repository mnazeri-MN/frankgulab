import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })

  const updates = [
    {
      collection: "research-highlights" as const,
      id: 7,
      data: {
        description:
          "We develop AI-driven delivery systems and engineered materials for mitochondrial transplantation therapy, introducing healthy mitochondria into damaged cells to reverse dysfunction underlying organ failure, chronic inflammation, and degenerative disease.",
      },
    },
    {
      collection: "research-highlights" as const,
      id: 6,
      data: {
        description:
          "Solar-driven photocatalytic systems that passively treat industrial wastewater, removing selenium from mine effluent and detoxifying oil sands process-affected water using buoyant TiO2-based reactors.",
      },
    },
    {
      collection: "research-highlights" as const,
      id: 4,
      data: {
        description:
          "Engineering nanoparticles and polymer coatings to carry drugs across biological barriers, from mucoadhesive systems for ocular therapy to inflammation-targeting microgels.",
      },
    },
    {
      collection: "projects" as const,
      id: 13,
      data: {
        description:
          "We develop AI-driven delivery systems and engineered materials to transplant healthy mitochondria into damaged cells, reversing the energy dysfunction underlying organ failure, chronic inflammation, and degenerative disease.",
      },
    },
    {
      collection: "projects" as const,
      id: 12,
      data: {
        description:
          "We apply automated formulation science to develop advanced materials for water purification and soil remediation, using machine learning to guide synthesis of photocatalysts, adsorbents, and reactive materials.",
      },
    },
    {
      collection: "projects" as const,
      id: 11,
      data: {
        description:
          "We use machine learning and high-throughput microfluidics to design lipid nanoparticles and polymeric carriers for drug delivery, tuning particle size, encapsulation efficiency, and release profile at scale.",
      },
    },
    {
      collection: "projects" as const,
      id: 10,
      data: {
        description:
          "Using automated synthesis robots and in-line rheology, we map the full design space of hydrogel networks, tuning crosslink density, swelling, and mechanical properties for wound healing, tissue engineering, and controlled release.",
      },
    },
    {
      collection: "projects" as const,
      id: 9,
      data: {
        description:
          "We apply closed-loop optimisation to personal care formulation, automatically navigating complex ingredient interactions to achieve target sensory, stability, and efficacy profiles across sunscreens, emulsions, and surfactant systems.",
      },
    },
    {
      collection: "projects" as const,
      id: 7,
      data: {
        description:
          "We develop self-driving electrochemical reactors that autonomously optimise conditions for green hydrogen production, battery electrolyte formulation, and electrodeposition, cutting the time from hypothesis to validated protocol.",
      },
    },
    {
      collection: "hero-slides" as const,
      id: 6,
      data: {
        tagline:
          "Robotic Autonomous Intelligent Systems for Experimentation: our flagship self-driving lab platform.",
      },
    },
  ]

  const log: string[] = []
  for (const { collection, id, data } of updates) {
    await payload.update({ collection, id, data })
    log.push(`Updated ${collection}#${id}`)
  }

  return NextResponse.json({ ok: true, log })
}
