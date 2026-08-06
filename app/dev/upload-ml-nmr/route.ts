import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const data = readFileSync(join(process.cwd(), "seed-assets", "ml-nmr.png"))

  const media = await payload.create({
    collection: "media",
    data: { alt: "ML framework for modelling macromolecular interactions: screen, featurize, interpret" },
    file: { data, mimetype: "image/png", name: "ml-nmr.png", size: data.length },
  })

  await payload.update({ collection: "publications", id: 8, data: { image: media.id } })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
