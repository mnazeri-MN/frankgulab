import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

const clean = (s: unknown) =>
  typeof s === "string" ? s.replace(/[–—]/g, (m) => (m === "–" ? "-" : " ")) : s

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  // Collections with text fields to clean
  const collections = [
    { slug: "news", fields: ["title", "source"] },
    { slug: "publications", fields: ["title", "firstAuthor"] },
    { slug: "opportunities", fields: ["title", "description"] },
    { slug: "research-highlights", fields: ["title", "description"] },
    { slug: "projects", fields: ["title", "description", "tag"] },
    { slug: "hero-slides", fields: ["name", "tagline"] },
  ] as const

  for (const { slug, fields } of collections) {
    const { docs } = await payload.find({ collection: slug as any, limit: 100, depth: 0 })
    for (const doc of docs) {
      const update: Record<string, string> = {}
      for (const field of fields) {
        const cleaned = clean((doc as any)[field])
        if (cleaned !== (doc as any)[field]) update[field] = cleaned as string
      }
      if (Object.keys(update).length > 0) {
        await payload.update({ collection: slug as any, id: (doc as any).id, data: update })
        log.push(`${slug}#${(doc as any).id}: ${JSON.stringify(update)}`)
      }
    }
  }

  // Site settings global
  const s = await payload.findGlobal({ slug: "site-settings" }) as any
  const settingsFields = [
    "labName", "piName", "institution", "department", "address",
    "missionStatement", "heroSubtitle", "footerTagline",
  ]
  const settingsUpdate: Record<string, string> = {}
  for (const field of settingsFields) {
    const cleaned = clean(s[field])
    if (cleaned !== s[field]) settingsUpdate[field] = cleaned as string
  }
  if (Object.keys(settingsUpdate).length > 0) {
    await payload.updateGlobal({ slug: "site-settings", data: settingsUpdate })
    log.push(`site-settings: ${JSON.stringify(settingsUpdate)}`)
  }

  return NextResponse.json({ ok: true, changes: log.length, log })
}
