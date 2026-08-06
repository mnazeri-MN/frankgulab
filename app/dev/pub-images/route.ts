import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })

  const [pubs, slides, media] = await Promise.all([
    payload.find({ collection: "publications", sort: "-year", limit: 50, depth: 1 }),
    payload.find({ collection: "hero-slides", sort: "order", limit: 20, depth: 1 }),
    payload.find({ collection: "media", limit: 100, depth: 0 }),
  ])

  return NextResponse.json({
    publications: pubs.docs.map((p: any) => ({
      id: p.id,
      year: p.year,
      title: p.title,
      hasImage: !!(p.image || p.fetchedImageUrl),
      imageId: p.image?.id ?? null,
    })),
    heroSlideImageIds: slides.docs.map((s: any) => s.image?.id ?? null).filter(Boolean),
    media: media.docs.map((m: any) => ({ id: m.id, filename: m.filename, alt: m.alt })),
  })
}
