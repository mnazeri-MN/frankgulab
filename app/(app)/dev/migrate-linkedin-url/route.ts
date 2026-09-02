import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const db = payload.db as unknown as { pool: { query: (sql: string) => Promise<unknown> } }
  await db.pool.query(`ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "linked_in_url" varchar`)
  return NextResponse.json({ ok: true })
}
