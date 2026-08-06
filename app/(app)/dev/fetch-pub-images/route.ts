import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { lookupDoi } from "@/lib/actions/doi"

export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "publications",
    where: { doi: { exists: true } },
    limit: 200,
  })

  const results: { id: number | string; doi: string; imageUrl: string | null; status: string }[] = []

  for (const doc of docs) {
    if (!doc.doi || doc.fetchedImageUrl) {
      results.push({ id: doc.id, doi: doc.doi ?? "", imageUrl: doc.fetchedImageUrl as string | null, status: "skipped" })
      continue
    }
    try {
      const data = await lookupDoi(doc.doi)
      if (data.imageUrl) {
        await payload.update({ collection: "publications", id: doc.id, data: { fetchedImageUrl: data.imageUrl } })
        results.push({ id: doc.id, doi: doc.doi, imageUrl: data.imageUrl, status: "updated" })
      } else {
        results.push({ id: doc.id, doi: doc.doi, imageUrl: null, status: "no_image" })
      }
    } catch (e) {
      results.push({ id: doc.id, doi: doc.doi ?? "", imageUrl: null, status: `error: ${e instanceof Error ? e.message : e}` })
    }
  }

  return NextResponse.json({ ok: true, results })
}
