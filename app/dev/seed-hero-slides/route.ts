import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  // Upload droplet image
  const dropletData = readFileSync(join(process.cwd(), "seed-assets", "droplet.jpg"))
  const dropletMedia = await payload.create({
    collection: "media",
    data: { alt: "A droplet of formulation on skin" },
    file: { data: dropletData, mimetype: "image/jpeg", name: "droplet.jpg", size: dropletData.length },
  })
  log.push(`Uploaded droplet: media ID ${dropletMedia.id}`)

  // Upload citric acid image
  const citricData = readFileSync(join(process.cwd(), "seed-assets", "citric-acid.jpeg"))
  const citricMedia = await payload.create({
    collection: "media",
    data: { alt: "Citric acid crystals — abstract materials science" },
    file: { data: citricData, mimetype: "image/jpeg", name: "citric-acid.jpeg", size: citricData.length },
  })
  log.push(`Uploaded citric acid: media ID ${citricMedia.id}`)

  // Create hero slides for all three
  const slides = [
    {
      name: "Formulation Science",
      tagline: "From ingredient to finished product: precision formulation at every scale.",
      image: dropletMedia.id,
      order: 2,
    },
    {
      name: "Pilot-Scale Electrochemistry",
      tagline: "Scaling green hydrogen and advanced electrosynthesis from lab bench to pilot plant.",
      image: 22, // electrolyzer-team already uploaded
      order: 3,
    },
    {
      name: "Advanced Materials",
      tagline: "Engineering matter at the molecular level for performance-driven applications.",
      image: citricMedia.id,
      order: 4,
    },
  ]

  for (const slide of slides) {
    await payload.create({ collection: "hero-slides", data: slide })
    log.push(`Created hero slide: ${slide.name}`)
  }

  return NextResponse.json({ ok: true, log })
}
