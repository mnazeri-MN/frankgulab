import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "mucosal-delivery.png"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "Nanoparticle design roadmap for mucosal drug delivery" },
    file: { data, mimetype: "image/png", name: "mucosal-delivery.png", size: data.length },
  })

  await payload.update({ collection: "publications", id: 10, data: { image: media.id } })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
