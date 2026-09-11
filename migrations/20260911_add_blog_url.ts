import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres"
import { sql } from "@payloadcms/db-postgres"

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "blog_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "publications" DROP COLUMN IF EXISTS "blog_url";
  `)
}
