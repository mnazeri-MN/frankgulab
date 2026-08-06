import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const log: string[] = []

  try {
    const payload = await getPayload({ config })
    const pool = (payload.db as unknown as { pool: { query: (text: string) => Promise<unknown> } }).pool

    // Add missing scalar columns to site_settings (safe with IF NOT EXISTS via DO block)
    const alterColumns = [
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "logo_id" integer REFERENCES "media"("id")`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "lab_name" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "pi_name" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "institution" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "department" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "address" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_email" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "mission_statement" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_subtitle" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "linked_in" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "google_scholar" varchar`,
      `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_tagline" varchar`,
    ]

    for (const stmt of alterColumns) {
      await pool.query(stmt)
    }
    log.push("Added missing scalar columns to site_settings")

    // Create affiliates join table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "site_settings_affiliates" (
        "_order"     integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "site_settings"("id") ON DELETE CASCADE,
        "id"         varchar PRIMARY KEY NOT NULL,
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

    // Seed defaults
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        affiliates: [
          { name: "University of Toronto",                    url: "https://www.utoronto.ca" },
          { name: "Chemical Engineering & Applied Chemistry", url: "https://www.chem-eng.utoronto.ca" },
          { name: "Acceleration Consortium",                  url: "https://acceleration.utoronto.ca" },
        ],
      },
    })
    log.push("Seeded default affiliates")

    return NextResponse.json({ ok: true, log })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), log }, { status: 500 })
  }
}
