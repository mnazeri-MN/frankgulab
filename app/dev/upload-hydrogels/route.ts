import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "hydrogels.png"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "Ion-mediated hyaluronic acid hydrogels formed with metal ions" },
    file: { data, mimetype: "image/png", name: "hydrogels.png", size: data.length },
  })

  await payload.update({ collection: "publications", id: 4, data: { image: media.id } })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
