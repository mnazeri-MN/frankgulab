import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import { sql } from "@payloadcms/db-postgres"

export const dynamic = "force-dynamic"
export const maxDuration = 60

// Seeds the _v tables with published snapshots of all existing records.
// Required once after migrate-versions, because Payload's versioning system
// reads record state from _v and existing records have no versions yet.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = payload.db as { drizzle: { execute: (q: unknown) => Promise<{ rowCount?: number }> } }

    const inserts: Array<{ table: string; sql: string }> = [
      {
        table: "_people_v",
        sql: `
          INSERT INTO "_people_v" (
            parent_id, version_title, version_preferred_first_name, version_last_initial,
            version_role, version_email, version_google_scholar, version_linkedin,
            version_photo_id, version_start_date, version_end_date, version_bio,
            version_show_full_last_name, version_show_bio, version_show_email,
            version_show_scholar, version_show_linkedin, version_show_photo,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, title::text, preferred_first_name, last_initial,
            role::text, email, google_scholar, linkedin,
            photo_id, start_date, end_date, bio,
            COALESCE(show_full_last_name, true), COALESCE(show_bio, true), COALESCE(show_email, false),
            COALESCE(show_scholar, true), COALESCE(show_linkedin, true), COALESCE(show_photo, true),
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM people
          WHERE NOT EXISTS (SELECT 1 FROM "_people_v" WHERE "_people_v".parent_id = people.id)
        `,
      },
      {
        table: "_publications_v",
        sql: `
          INSERT INTO "_publications_v" (
            parent_id, version_doi, version_title, version_first_author, version_year,
            version_href, version_image_id, version_fetched_image_url, version_summary,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, doi, title, first_author, year,
            href, image_id, fetched_image_url, summary,
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM publications
          WHERE NOT EXISTS (SELECT 1 FROM "_publications_v" WHERE "_publications_v".parent_id = publications.id)
        `,
      },
      {
        table: "_projects_v",
        sql: `
          INSERT INTO "_projects_v" (
            parent_id, version_title, version_description, version_tag,
            version_youtube_url, version_image_id, version_order,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, title, description, tag,
            youtube_url, image_id, "order",
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM projects
          WHERE NOT EXISTS (SELECT 1 FROM "_projects_v" WHERE "_projects_v".parent_id = projects.id)
        `,
      },
      {
        table: "_hero_slides_v",
        sql: `
          INSERT INTO "_hero_slides_v" (
            parent_id, version_name, version_tagline, version_image_id, version_order,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, name, tagline, image_id, "order",
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM hero_slides
          WHERE NOT EXISTS (SELECT 1 FROM "_hero_slides_v" WHERE "_hero_slides_v".parent_id = hero_slides.id)
        `,
      },
      {
        table: "_news_v",
        sql: `
          INSERT INTO "_news_v" (
            parent_id, version_linked_in_url, version_title, version_source,
            version_date, version_url, version_image_url, version_summary,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, linked_in_url, title, source,
            date, url, image_url, summary,
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM news
          WHERE NOT EXISTS (SELECT 1 FROM "_news_v" WHERE "_news_v".parent_id = news.id)
        `,
      },
      {
        table: "_opportunities_v",
        sql: `
          INSERT INTO "_opportunities_v" (
            parent_id, version_title, version_description, version_order,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, title, description, "order",
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM opportunities
          WHERE NOT EXISTS (SELECT 1 FROM "_opportunities_v" WHERE "_opportunities_v".parent_id = opportunities.id)
        `,
      },
      {
        table: "_lab_photos_v",
        sql: `
          INSERT INTO "_lab_photos_v" (
            parent_id, version_year, version_caption, version_photo_id, version_order,
            version_updated_at, version_created_at,
            version__status, created_at, updated_at, latest, snapshot
          )
          SELECT
            id, year, caption, photo_id, "order",
            updated_at, created_at,
            COALESCE(_status, 'published'), now(), now(), true, false
          FROM lab_photos
          WHERE NOT EXISTS (SELECT 1 FROM "_lab_photos_v" WHERE "_lab_photos_v".parent_id = lab_photos.id)
        `,
      },
    ]

    const results: Record<string, number> = {}
    for (const { table, sql: stmt } of inserts) {
      const res = await db.drizzle.execute(sql.raw(stmt)) as { rowCount?: number }
      results[table] = res.rowCount ?? 0
    }

    return NextResponse.json({ ok: true, seeded: results })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
