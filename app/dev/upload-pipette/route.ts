import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  const payload = await getPayload({ config })

  const filePath = join(process.cwd(), "seed-assets", "pipette.png")
  const data = readFileSync(filePath)

  const media = await payload.create({
    collection: "media",
    data: { alt: "Opentrons pipette robot with multi-well plate setup" },
    file: {
      data,
      mimetype: "image/png",
      name: "pipette.png",
      size: data.length,
    },
  })

  await payload.update({
    collection: "publications",
    id: 2,
    data: { image: media.id },
  })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
