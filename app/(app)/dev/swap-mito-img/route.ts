import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankgulab.vercel.app"

export async function GET() {
  const payload = await getPayload({ config })
  try {
    const res = await fetch(`${BASE}/images/mitochondria.webp`)
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const media = await payload.create({
      collection: "media",
      data: { alt: "Mitochondria — cellular energy structures targeted for transplantation therapy" },
      file: { data: buffer, mimetype: "image/webp", name: "mitochondria.webp", size: buffer.length },
    })
    // Find and update the Mitochondrial Medicine project
    const projects = await payload.find({ collection: "projects", where: { title: { equals: "Mitochondrial Medicine" } }, limit: 1 })
    if (!projects.docs.length) throw new Error("Mitochondrial Medicine project not found")
    await payload.update({ collection: "projects", id: projects.docs[0].id, data: { image: media.id } })
    return NextResponse.json({ ok: true, mediaId: media.id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
