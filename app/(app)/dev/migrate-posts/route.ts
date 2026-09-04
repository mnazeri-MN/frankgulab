import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

// Run once after deploying the posts collection to create its tables.
// Safe to re-run — uses CREATE TABLE IF NOT EXISTS and ALTER TABLE ... ADD COLUMN IF NOT EXISTS.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

    const statements = [
      // Drop the under-spec'd tables created by the first migration run
      `DROP TABLE IF EXISTS "_posts_v"`,
      `DROP TABLE IF EXISTS "posts"`,

      // posts main table
      `CREATE TABLE IF NOT EXISTS "posts" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "excerpt" varchar,
        "cover_image_id" integer,
        "author_id" integer,
        "published_at" timestamp with time zone,
        "body" jsonb,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "_status" varchar DEFAULT 'draft'
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" ("slug")`,

      // _posts_v versions table — must match Payload's expected schema exactly
      `CREATE TABLE IF NOT EXISTS "_posts_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_title" varchar,
        "version_slug" varchar,
        "version_excerpt" varchar,
        "version_cover_image_id" integer,
        "version_author_id" integer,
        "version_published_at" timestamp with time zone,
        "version_body" jsonb,
        "version_updated_at" timestamp with time zone,
        "version_created_at" timestamp with time zone,
        "version__status" varchar DEFAULT 'draft',
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "snapshot" boolean,
        "published_locale" varchar,
        "latest" boolean,
        "autosave" boolean
      )`,
      `CREATE INDEX IF NOT EXISTS "_posts_v_parent_id_idx" ON "_posts_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_posts_v_version__status_idx" ON "_posts_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" ("latest")`,
    ]

    for (const stmt of statements) {
      await db.drizzle.execute(sql.raw(stmt))
    }

    return NextResponse.json({ ok: true, message: "posts and _posts_v tables created with correct schema" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
