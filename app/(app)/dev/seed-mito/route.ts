import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankgulab.vercel.app"

export async function GET() {
  const payload = await getPayload({ config })
  try {
    const res = await fetch(`${BASE}/images/sles-abstract.jpeg`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const media = await payload.create({
      collection: "media",
      data: { alt: "Abstract molecular structures — mitochondrial medicine research" },
      file: { data: buffer, mimetype: "image/jpeg", name: "mito-abstract.jpeg", size: buffer.length },
    })
    const project = await payload.create({
      collection: "projects",
      data: {
        title: "Mitochondrial Medicine",
        tag: "Regenerative Medicine",
        description: "As part of the $23.8M MitoRevolution consortium (NFRF-T), The Mixture Lab leads the development of AI-driven delivery technologies and engineered materials for mitochondrial transplantation therapy. We design scalable systems that preserve mitochondrial viability from isolation through to transplantation — enabling healthy mitochondria to be reliably introduced into damaged cells to reverse the dysfunction underlying organ failure, chronic inflammation, and degenerative disease.",
        image: media.id,
        order: 6,
      },
    })
    return NextResponse.json({ ok: true, mediaId: media.id, projectId: project.id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
