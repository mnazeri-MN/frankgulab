import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: "publications", limit: 50, sort: "-year" })
  return NextResponse.json(docs.map((d) => ({ id: d.id, year: d.year, title: d.title, firstAuthor: d.firstAuthor })))
}
