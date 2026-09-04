import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })

  const filePath = path.join(process.cwd(), "public/images/lab-group-photo.jpeg")
  const fileData = fs.readFileSync(filePath)

  const media = await payload.create({
    collection: "media",
    data: { alt: "The Mixture Lab group photo" },
    file: {
      data: Buffer.from(fileData),
      mimetype: "image/jpeg",
      name: "lab-group-photo.jpeg",
      size: fileData.byteLength,
    },
  })

  await payload.create({
    collection: "lab-photos",
    data: {
      year: 2025,
      caption: "The Mixture Lab",
      photo: media.id,
      order: 1,
    } as never,
  })

  return NextResponse.json({ ok: true, mediaId: media.id })
}
