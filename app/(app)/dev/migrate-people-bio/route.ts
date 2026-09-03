import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const db = payload.db as unknown as { pool: { query: (sql: string) => Promise<unknown> } }
  await db.pool.query(`ALTER TABLE "people" ADD COLUMN IF NOT EXISTS "bio" varchar`)
  return NextResponse.json({ ok: true })
}
