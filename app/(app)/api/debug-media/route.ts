import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: "media", limit: 1 })
    return NextResponse.json({ ok: true, count: result.totalDocs, first: result.docs[0] ?? null })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e), stack: e instanceof Error ? e.stack : undefined }, { status: 500 })
  }
}
