import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

    // Add youtube_url column to projects table
    await db.drizzle.execute(
      sql`ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "youtube_url" varchar`
    )

    // Drop the old research_highlights table (icon-based section, no longer in config)
    // Must drop FK constraint first
    await db.drizzle.execute(
      sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "research_highlights_id"`
    )
    await db.drizzle.execute(
      sql`DROP TABLE IF EXISTS "research_highlights" CASCADE`
    )

    return NextResponse.json({ ok: true, message: "Added youtube_url to projects; dropped legacy research_highlights table" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
