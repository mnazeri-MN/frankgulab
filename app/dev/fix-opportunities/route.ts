import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  await payload.db.pool.query(`
    CREATE TABLE IF NOT EXISTS "opportunities" (
      id serial PRIMARY KEY,
      title varchar NOT NULL,
      description varchar,
      "order" integer DEFAULT 99,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)
  log.push("Created opportunities table")

  await payload.db.pool.query(`
    CREATE INDEX IF NOT EXISTS "opportunities_created_at_idx" ON "opportunities" ("created_at")
  `)
  log.push("Created index")

  return NextResponse.json({ ok: true, log })
}
