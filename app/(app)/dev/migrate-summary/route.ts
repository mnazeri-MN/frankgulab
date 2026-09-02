import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

  await db.drizzle.execute(sql`ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "summary" varchar`)
  await db.drizzle.execute(sql`ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "summary" varchar`)

  return NextResponse.json({ ok: true })
}
