import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  // Find the hero slide using raise-labeled.png (media ID 24)
  const { docs: slides } = await payload.find({
    collection: "hero-slides",
    where: { "image.id": { equals: 24 } },
    depth: 0,
  })

  if (slides.length > 0) {
    await payload.delete({ collection: "hero-slides", id: slides[0].id })
    log.push(`Deleted hero slide: ${slides[0].id}`)
  } else {
    log.push("No hero slide with image 24 found")
  }

  // Assign raise-labeled.png to the RAISE publication (id 1)
  await payload.update({
    collection: "publications",
    id: 1,
    data: { image: 24 },
  })
  log.push("Assigned raise-labeled.png to RAISE publication")

  return NextResponse.json({ ok: true, log })
}
