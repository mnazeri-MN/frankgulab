import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const db = payload.db as unknown as { pool: { query: (sql: string) => Promise<unknown> } }

  await db.pool.query(`
    CREATE TABLE IF NOT EXISTS "lab_photos" (
      "id" serial PRIMARY KEY,
      "year" numeric NOT NULL,
      "caption" varchar,
      "photo_id" integer REFERENCES "media"("id") ON DELETE set null,
      "order" numeric DEFAULT 99,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "lab_photos_created_at_idx" ON "lab_photos" USING btree ("created_at");
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "lab_photos_id" integer REFERENCES "lab_photos"("id") ON DELETE cascade;
  `)

  return NextResponse.json({ ok: true })
}
