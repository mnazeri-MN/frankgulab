import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })

  await payload.db.pool.query(`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "opportunities_id" integer
    REFERENCES "opportunities"("id") ON DELETE CASCADE
  `)

  return NextResponse.json({ ok: true })
}
