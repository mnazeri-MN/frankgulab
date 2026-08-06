import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Try listing with depth=0 like the admin does
    const result = await payload.find({ collection: "media", depth: 0, limit: 1 })

    // Check blob token
    const token = process.env.BLOB_READ_WRITE_TOKEN ?? ""
    const blobEnabled = /^vercel_blob_rw_/i.test(token)
    const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_/i)?.[1] ?? null

    return NextResponse.json({
      ok: true,
      count: result.totalDocs,
      firstUrl: result.docs[0]?.url ?? null,
      blob: { enabled: blobEnabled, storeId, tokenLength: token.length },
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: String(e),
      stack: e instanceof Error ? e.stack?.split("\n").slice(0, 8).join("\n") : undefined,
    }, { status: 500 })
  }
}
