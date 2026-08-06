import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "publications",
    sort: "-year",
    limit: 50,
    depth: 1,
  })

  const result = docs.map((p: any) => ({
    id: p.id,
    year: p.year,
    title: p.title,
    hasImage: !!(p.image || p.fetchedImageUrl),
    fetchedImageUrl: p.fetchedImageUrl ?? null,
  }))

  return NextResponse.json(result)
}
