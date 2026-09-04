import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

    await db.drizzle.execute(sql`
      ALTER TABLE "people"
        ADD COLUMN IF NOT EXISTS "show_full_last_name" boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS "show_bio"            boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS "show_email"          boolean DEFAULT false,
        ADD COLUMN IF NOT EXISTS "show_scholar"        boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS "show_linkedin"       boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS "show_photo"          boolean DEFAULT true
    `)

    return NextResponse.json({ ok: true, message: "Added privacy toggle columns to people table" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
