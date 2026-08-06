import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const log: string[] = []

  try {
    const payload = await getPayload({ config })
    // Access the underlying postgres pool via Payload's db adapter
    const pool = (payload.db as unknown as { pool: { query: (text: string, params?: unknown[]) => Promise<unknown> } }).pool

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "site_settings_affiliates" (
        "_order"     integer      NOT NULL,
        "_parent_id" integer      NOT NULL REFERENCES "site_settings"("id") ON DELETE CASCADE,
        "id"         varchar      PRIMARY KEY NOT NULL,
        "name"       varchar,
        "url"        varchar
      )
    `)
    log.push("Created site_settings_affiliates table")

    await pool.query(`
      CREATE INDEX IF NOT EXISTS "site_settings_affiliates_order_idx"
        ON "site_settings_affiliates" ("_order")
    `)
    log.push("Created index")

    // Seed defaults via Payload local API
    const defaults = [
      { name: "University of Toronto",                    url: "https://www.utoronto.ca" },
      { name: "Chemical Engineering & Applied Chemistry", url: "https://www.chem-eng.utoronto.ca" },
      { name: "Acceleration Consortium",                  url: "https://acceleration.utoronto.ca" },
    ]

    await payload.updateGlobal({
      slug: "site-settings",
      data: { affiliates: defaults },
    })
    log.push("Seeded default affiliates")

    return NextResponse.json({ ok: true, log })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), log }, { status: 500 })
  }
}
