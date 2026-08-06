import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "mucin-polymer.png"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "NMR fingerprint binding profiles for mucin-polymer interactions" },
    file: { data, mimetype: "image/png", name: "mucin-polymer.png", size: data.length },
  })

  await payload.update({ collection: "publications", id: 11, data: { image: media.id } })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
