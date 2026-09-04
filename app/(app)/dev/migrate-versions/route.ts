import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// Creates and runs the Payload-generated migration for versions tables.
// Must be hit once after the first deploy that includes versions: { drafts: true }.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as {
      createMigration: (opts: { migrationName: string; forceAcceptWarning?: boolean }) => Promise<void>
      migrate: () => Promise<void>
    }

    await db.createMigration({ migrationName: "enable-versions", forceAcceptWarning: true })
    await db.migrate()

    return NextResponse.json({ ok: true, message: "Versions migration created and applied" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
