import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: "lab-photos", limit: 10 })
  for (const doc of docs) {
    await payload.update({ collection: "lab-photos", id: doc.id, data: { caption: "" } as never })
  }
  return NextResponse.json({ ok: true, updated: docs.length })
}
