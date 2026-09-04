import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<{ rows: unknown[] }> } }

    const tables = [
      "people", "publications", "projects", "hero_slides",
      "news", "opportunities", "lab_photos", "users", "media",
    ]

    const result: Record<string, unknown[]> = {}
    for (const table of tables) {
      const res = await db.drizzle.execute(
        sql.raw(`
          SELECT column_name, data_type, udt_name, column_default, is_nullable
          FROM information_schema.columns
          WHERE table_name = '${table}'
          ORDER BY ordinal_position
        `)
      )
      result[table] = res.rows
    }

    // Also list existing tables to know what _v tables already exist
    const existing = await db.drizzle.execute(
      sql.raw(`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`)
    )
    result["_existing_tables"] = existing.rows

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
