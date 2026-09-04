import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// Creates the _v (versions) tables for all 7 content collections.
// Must be hit once after the first deploy that includes versions: { drafts: true }.
// The _status column already exists on all main tables (added by migrate-drafts).
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<unknown> } }

    const statements = [
      // people → _people_v
      `CREATE TABLE IF NOT EXISTS "_people_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_title" varchar,
        "version_preferred_first_name" varchar,
        "version_last_initial" varchar,
        "version_role" varchar,
        "version_email" varchar,
        "version_google_scholar" varchar,
        "version_linkedin" varchar,
        "version_photo_id" integer,
        "version_start_date" timestamp with time zone,
        "version_end_date" timestamp with time zone,
        "version_bio" varchar,
        "version_show_full_last_name" boolean DEFAULT true,
        "version_show_bio" boolean DEFAULT true,
        "version_show_email" boolean DEFAULT false,
        "version_show_scholar" boolean DEFAULT true,
        "version_show_linkedin" boolean DEFAULT true,
        "version_show_photo" boolean DEFAULT true,
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
      `CREATE INDEX IF NOT EXISTS "_people_v_parent_id_idx" ON "_people_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_people_v_version__status_idx" ON "_people_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_people_v_latest_idx" ON "_people_v" ("latest")`,

      // publications → _publications_v
      `CREATE TABLE IF NOT EXISTS "_publications_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_doi" varchar,
        "version_title" varchar,
        "version_first_author" varchar,
        "version_year" numeric,
        "version_href" varchar,
        "version_image_id" integer,
        "version_fetched_image_url" varchar,
        "version_summary" varchar,
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
      `CREATE INDEX IF NOT EXISTS "_publications_v_parent_id_idx" ON "_publications_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_publications_v_version__status_idx" ON "_publications_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_publications_v_latest_idx" ON "_publications_v" ("latest")`,

      // projects → _projects_v
      `CREATE TABLE IF NOT EXISTS "_projects_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_title" varchar,
        "version_description" varchar,
        "version_tag" varchar,
        "version_youtube_url" varchar,
        "version_image_id" integer,
        "version_order" numeric,
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
      `CREATE INDEX IF NOT EXISTS "_projects_v_parent_id_idx" ON "_projects_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_projects_v_version__status_idx" ON "_projects_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_projects_v_latest_idx" ON "_projects_v" ("latest")`,

      // hero_slides → _hero_slides_v
      `CREATE TABLE IF NOT EXISTS "_hero_slides_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_name" varchar,
        "version_tagline" varchar,
        "version_image_id" integer,
        "version_order" numeric,
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
      `CREATE INDEX IF NOT EXISTS "_hero_slides_v_parent_id_idx" ON "_hero_slides_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_hero_slides_v_version__status_idx" ON "_hero_slides_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_hero_slides_v_latest_idx" ON "_hero_slides_v" ("latest")`,

      // news → _news_v
      `CREATE TABLE IF NOT EXISTS "_news_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_linked_in_url" varchar,
        "version_title" varchar,
        "version_source" varchar,
        "version_date" timestamp with time zone,
        "version_url" varchar,
        "version_image_url" varchar,
        "version_summary" varchar,
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
      `CREATE INDEX IF NOT EXISTS "_news_v_parent_id_idx" ON "_news_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_news_v_version__status_idx" ON "_news_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_news_v_latest_idx" ON "_news_v" ("latest")`,

      // opportunities → _opportunities_v
      `CREATE TABLE IF NOT EXISTS "_opportunities_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_title" varchar,
        "version_description" varchar,
        "version_order" integer,
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
      `CREATE INDEX IF NOT EXISTS "_opportunities_v_parent_id_idx" ON "_opportunities_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_opportunities_v_version__status_idx" ON "_opportunities_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_opportunities_v_latest_idx" ON "_opportunities_v" ("latest")`,

      // lab_photos → _lab_photos_v
      `CREATE TABLE IF NOT EXISTS "_lab_photos_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_year" numeric,
        "version_caption" varchar,
        "version_photo_id" integer,
        "version_order" numeric,
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
      `CREATE INDEX IF NOT EXISTS "_lab_photos_v_parent_id_idx" ON "_lab_photos_v" ("parent_id")`,
      `CREATE INDEX IF NOT EXISTS "_lab_photos_v_version__status_idx" ON "_lab_photos_v" ("version__status")`,
      `CREATE INDEX IF NOT EXISTS "_lab_photos_v_latest_idx" ON "_lab_photos_v" ("latest")`,
    ]

    for (const stmt of statements) {
      await db.drizzle.execute(sql.raw(stmt))
    }

    return NextResponse.json({ ok: true, message: `Created ${7} _v tables and indexes` })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
