import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

// Must be run immediately after deploy whenever versions/drafts are first enabled.
// Sets _status = 'published' on all existing records so they remain visible on the site.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<{ rowCount?: number }> } }

    const tables = [
      "people",
      "publications",
      "projects",
      "hero_slides",
      "news",
      "opportunities",
      "lab_photos",
    ]

    const results: Record<string, number> = {}

    for (const table of tables) {
      // Add the column if Payload hasn't pushed the schema yet
      await db.drizzle.execute(
        sql.raw(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "_status" varchar(255) DEFAULT 'published'`)
      )
      const res = await db.drizzle.execute(
        sql.raw(`UPDATE "${table}" SET "_status" = 'published' WHERE "_status" IS NULL OR "_status" != 'published'`)
      )
      results[table] = (res as { rowCount?: number }).rowCount ?? 0
    }

    return NextResponse.json({ ok: true, published: results })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
