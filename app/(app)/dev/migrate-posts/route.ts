import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"

// Run once after deploying the posts collection to create its tables.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<{ rowCount?: number }> } }

    // Create posts table
    await db.drizzle.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" serial PRIMARY KEY,
        "title" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "excerpt" text,
        "cover_image_id" integer,
        "author_id" integer,
        "published_at" timestamp with time zone,
        "body" jsonb,
        "_status" varchar(255) DEFAULT 'published',
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      )
    `))

    // Create posts versions table
    await db.drizzle.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "_posts_v" (
        "id" serial PRIMARY KEY,
        "parent_id" integer REFERENCES "posts"("id") ON DELETE SET NULL,
        "version__status" varchar(255) DEFAULT 'draft',
        "version_title" varchar(255),
        "version_slug" varchar(255),
        "version_excerpt" text,
        "version_cover_image_id" integer,
        "version_author_id" integer,
        "version_published_at" timestamp with time zone,
        "version_body" jsonb,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      )
    `))

    return NextResponse.json({ ok: true, message: "posts and _posts_v tables created" })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
