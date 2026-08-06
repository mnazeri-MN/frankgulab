import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "citric-acid-1.jpeg"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "Citric acid thin film" },
    file: { data, mimetype: "image/jpeg", name: "citric-acid-1.jpeg", size: data.length },
  })

  await payload.create({
    collection: "hero-slides",
    data: {
      name: "Materials Science",
      tagline: "Engineering matter at the molecular level for performance-driven applications.",
      image: media.id,
      order: 3,
    },
  })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
