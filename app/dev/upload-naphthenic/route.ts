import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "naphthenic.png"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "Photocatalytic pre-treatment effects on biological degradation of naphthenic acids" },
    file: { data, mimetype: "image/png", name: "naphthenic.png", size: data.length },
  })

  await payload.update({ collection: "publications", id: 9, data: { image: media.id } })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
