import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankgulab.vercel.app"

async function uploadImage(payload: Awaited<ReturnType<typeof getPayload>>, filename: string, alt: string) {
  const res = await fetch(`${BASE}/images/${filename}`)
  if (!res.ok) throw new Error(`Failed to fetch ${filename}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const mimeType = filename.endsWith(".png") ? "image/png" : filename.endsWith(".jpeg") ? "image/jpeg" : "image/jpeg"
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: { data: buffer, mimetype: mimeType, name: filename, size: buffer.length },
  })
  return doc
}

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  try {
    // 1. Delete all existing media, projects, hero-slides
    const existingMedia = await payload.find({ collection: "media", limit: 100 })
    for (const doc of existingMedia.docs) {
      await payload.delete({ collection: "media", id: doc.id })
    }
    log.push(`Deleted ${existingMedia.docs.length} media records`)

    const existingProjects = await payload.find({ collection: "projects", limit: 100 })
    for (const doc of existingProjects.docs) {
      await payload.delete({ collection: "projects", id: doc.id })
    }
    log.push(`Deleted ${existingProjects.docs.length} projects`)

    const existingSlides = await payload.find({ collection: "hero-slides", limit: 100 })
    for (const doc of existingSlides.docs) {
      await payload.delete({ collection: "hero-slides", id: doc.id })
    }
    log.push(`Deleted ${existingSlides.docs.length} hero slides`)

    // 2. Upload images
    const elec      = await uploadImage(payload, "electrolyzer.jpg",      "Automated electrochemical reactor system")
    const nano      = await uploadImage(payload, "nanoparticles.png",     "AI-driven nanoparticle formulation")
    const nail      = await uploadImage(payload, "nail-polish.jpg",       "Smart cosmetics manufacturing")
    const hydrogel  = await uploadImage(payload, "hydrogel-imaging.jpeg", "Hydrogel synthesis and imaging")
    const remed     = await uploadImage(payload, "remediation.jpg",       "Environmental remediation research")
    const droplet   = await uploadImage(payload, "droplet-cinematic.jpg", "Microfluidic droplet generation")
    const team      = await uploadImage(payload, "electrolyzer-team.jpg", "Mixture Lab team with pilot-scale electrolyzer")
    const raiseOps  = await uploadImage(payload, "raise-operations.jpg",  "RAISE robotics platform in operation")
    const raiseLbl  = await uploadImage(payload, "raise-labeled.png",     "RAISE platform — labeled components")
    log.push("Uploaded 9 images to Blob")

    // 3. Recreate projects
    const projects = [
      { title: "Automated Electrochemical Systems", description: "We develop self-driving electrochemical reactors that autonomously optimise parameters for green hydrogen production, battery electrolyte formulation, and electrodeposition processes — dramatically reducing the time from hypothesis to validated protocol.", tag: "Electrochemistry", image: elec.id, order: 1 },
      { title: "AI-Driven Nanoparticle Formulation", description: "Our lab uses machine learning and high-throughput microfluidics to design lipid nanoparticles and polymeric carriers for drug delivery. Automated platforms explore thousands of formulation conditions to identify candidates with optimal size, encapsulation, and release profiles.", tag: "Nanotechnology", image: nano.id, order: 2 },
      { title: "Smart Cosmetics & Personal Care", description: "We apply closed-loop optimisation to personal care formulation — automatically navigating complex ingredient interactions to achieve target sensory, stability, and efficacy profiles. The same platform accelerates development across sunscreens, emulsions, and surfactant systems.", tag: "Formulation Science", image: nail.id, order: 3 },
      { title: "Hydrogel Synthesis & Characterisation", description: "Using automated synthesis robots and in-line rheology, we map the full design space of hydrogel networks — tuning crosslink density, swelling behaviour, and mechanical properties for applications in wound healing, tissue engineering, and controlled release.", tag: "Materials Science", image: hydrogel.id, order: 4 },
      { title: "Drug Delivery & Nanoparticles", description: "We design and optimise nanoparticulate drug delivery systems — including lipid nanoparticles, polymeric micelles, and dendrimers — using high-throughput automated platforms. Our self-driving workflows identify formulations with optimal bioavailability, stability, and targeted release.", tag: "Drug Delivery", image: remed.id, order: 5 },
      { title: "Environmental Remediation", description: "We apply automated formulation science to develop advanced materials for water purification and soil remediation. Machine learning guides the synthesis of photocatalysts, adsorbents, and reactive materials that break down pollutants more efficiently than conventional approaches.", tag: "Environmental Science", image: droplet.id, order: 6 },
    ]
    for (const p of projects) {
      await payload.create({ collection: "projects", data: p })
    }
    log.push(`Created ${projects.length} projects`)

    // 4. Recreate hero slides
    const slides = [
      { name: "RAISE Platform", tagline: "Robotic Autonomous Intelligent Systems for Experimentation — our flagship self-driving lab platform.", image: raiseOps.id, order: 1 },
      { name: "RAISE — Labelled", tagline: "Every module of RAISE is purpose-built for closed-loop formulation science.", image: raiseLbl.id, order: 2 },
    ]
    for (const s of slides) {
      await payload.create({ collection: "hero-slides", data: s })
    }
    log.push(`Created ${slides.length} hero slides`)

    // 5. Update site settings contact photo
    await payload.updateGlobal({ slug: "site-settings", data: { contactPhoto: team.id } })
    log.push("Updated site-settings contactPhoto")

    return NextResponse.json({ ok: true, log })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e), log }, { status: 500 })
  }
}
