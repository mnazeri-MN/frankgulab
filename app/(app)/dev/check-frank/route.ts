import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: "people", limit: 100 })
  const frank = docs.find((p) => p.preferredFirstName === "Frank" && p.lastInitial === "Gu")
  if (!frank) return NextResponse.json({ error: "Frank not found" })
  return NextResponse.json({
    id: frank.id,
    preferredFirstName: frank.preferredFirstName,
    lastInitial: frank.lastInitial,
    title: frank.title,
    role: frank.role,
    email: frank.email,
    googleScholar: frank.googleScholar,
    linkedin: frank.linkedin,
  })
}
