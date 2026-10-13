import type { AdminViewServerProps } from "payload"
import { DefaultTemplate } from "@payloadcms/next/templates"

type PendingDoc = { id: number; title: string; updatedAt: string }
type CollectionResult = { slug: string; label: string; docs: PendingDoc[] }

// Maps each collection to its version table and the SQL expression for the display title.
// Filters on latest = true so old draft history entries are not included.
const COLLECTIONS: { slug: string; label: string; table: string; titleExpr: string }[] = [
  { slug: "people",        label: "People",             table: "_people_v",        titleExpr: "version_preferred_first_name || ' ' || version_last_initial" },
  { slug: "publications",  label: "Publications",        table: "_publications_v",  titleExpr: "version_title" },
  { slug: "projects",      label: "Research Highlights", table: "_projects_v",      titleExpr: "version_title" },
  { slug: "hero-slides",   label: "Hero Slides",         table: "_hero_slides_v",   titleExpr: "version_name" },
  { slug: "news",          label: "News",                table: "_news_v",          titleExpr: "version_title" },
  { slug: "opportunities", label: "Opportunities",       table: "_opportunities_v", titleExpr: "version_title" },
  { slug: "posts",         label: "Posts",               table: "_posts_v",         titleExpr: "version_title" },
  { slug: "lab-photos",    label: "Lab Photos",          table: "_lab_photos_v",    titleExpr: "version_year::text" },
]

export default async function PendingChangesView(props: AdminViewServerProps) {
  const { initPageResult, params, searchParams } = props
  const { req, visibleEntities } = initPageResult
  const { payload, user } = req

  const isAdmin = (user as { role?: string } | null)?.role === "admin"

  let results: CollectionResult[] = []

  if (isAdmin) {
    const db = (payload.db as unknown as { pool: { query: (sql: string) => Promise<{ rows: { id: number; title: string; updated_at: string }[] }> } }).pool
    results = await Promise.all(
      COLLECTIONS.map(async ({ slug, label, table, titleExpr }) => {
        const { rows } = await db.query(
          `SELECT parent_id AS id, ${titleExpr} AS title, version_updated_at AS updated_at
           FROM ${table}
           WHERE latest = true AND version__status = 'draft'
           ORDER BY version_updated_at DESC
           LIMIT 100`
        )
        return {
          slug,
          label,
          docs: rows.map(r => ({ id: r.id, title: r.title ?? "Untitled", updatedAt: r.updated_at })),
        }
      })
    )
  }

  const hasAny = results.some((r) => r.docs.length > 0)

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={payload}
      permissions={initPageResult.permissions}
      req={req}
      searchParams={searchParams}
      user={user ?? undefined}
      visibleEntities={{
        collections: visibleEntities.collections,
        globals: visibleEntities.globals,
      }}
    >
      <div style={{ padding: "32px 40px", maxWidth: 860 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Pending Changes</h1>
        <p style={{ fontSize: 14, color: "var(--theme-elevation-400)", marginBottom: 32 }}>
          Documents saved as draft — review and publish when ready.
        </p>

        {!isAdmin ? (
          <div style={{ padding: 32, color: "var(--theme-error-500, #e55353)" }}>
            Access denied. Admins only.
          </div>
        ) : !hasAny ? (
          <div style={{
            padding: "40px 32px",
            borderRadius: 8,
            border: "1px solid var(--theme-elevation-150)",
            textAlign: "center",
            color: "var(--theme-elevation-400)",
            fontSize: 14,
          }}>
            No pending changes. Everything is published.
          </div>
        ) : (
          results
            .filter((r) => r.docs.length > 0)
            .map(({ slug, label, docs }) => (
              <div key={slug} style={{ marginBottom: 32 }}>
                <h2 style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-elevation-400)",
                  marginBottom: 8,
                }}>
                  {label}
                </h2>
                <div style={{
                  border: "1px solid var(--theme-elevation-150)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}>
                  {docs.map(({ id, title, updatedAt }, i) => {
                    const dateStr = updatedAt
                      ? new Date(updatedAt).toLocaleDateString("en-CA", {
                          year: "numeric", month: "short", day: "numeric",
                        })
                      : ""
                    return (
                      <a
                        key={id}
                        href={`/admin/collections/${slug}/${id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderTop: i === 0 ? "none" : "1px solid var(--theme-elevation-150)",
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: 14,
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>{title}</span>
                        <span style={{ fontSize: 12, color: "var(--theme-elevation-400)", whiteSpace: "nowrap", marginLeft: 16 }}>
                          {dateStr} →
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))
        )}
      </div>
    </DefaultTemplate>
  )
}
