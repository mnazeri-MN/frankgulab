import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

    await db.drizzle.execute(
      sql.raw(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" varchar(255) DEFAULT 'editor'`)
    )

    return NextResponse.json({ ok: true, message: "Added role column to users table" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
