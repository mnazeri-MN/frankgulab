import { getPayload } from "payload"
import config from "@payload-config"
import { headers as getHeaders } from "next/headers"

const COLLECTIONS = [
  { slug: "people",              label: "People",             titleField: "preferredFirstName" },
  { slug: "publications",        label: "Publications",        titleField: "title" },
  { slug: "research-highlights", label: "Research Highlights", titleField: "title" },
  { slug: "hero-slides",         label: "Hero Slides",         titleField: "name" },
  { slug: "news",                label: "News",                titleField: "title" },
  { slug: "opportunities",       label: "Opportunities",       titleField: "title" },
  { slug: "posts",               label: "Posts",               titleField: "title" },
  { slug: "lab-photos",          label: "Lab Photos",          titleField: "year" },
] as const

export default async function PendingChangesView() {
  const payload = await getPayload({ config })
  const headersList = await getHeaders()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user as { role?: string }).role !== "admin") {
    return (
      <div style={{ padding: 32 }}>
        <p style={{ color: "var(--theme-error-500, #e55353)" }}>Access denied. Admins only.</p>
      </div>
    )
  }

  const results = await Promise.all(
    COLLECTIONS.map(async ({ slug, label, titleField }) => {
      const { docs, totalDocs } = await payload.find({
        collection: slug,
        where: { _status: { equals: "draft" } },
        limit: 100,
        overrideAccess: true,
        draft: true,
      })
      return { slug, label, titleField, docs, totalDocs }
    })
  )

  const hasAny = results.some((r) => r.totalDocs > 0)

  return (
    <div style={{ padding: "32px 40px", maxWidth: 860 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Pending Changes</h1>
      <p style={{ fontSize: 14, color: "var(--theme-elevation-400)", marginBottom: 32 }}>
        Documents saved as draft — review and publish when ready.
      </p>

      {!hasAny ? (
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
          .filter((r) => r.totalDocs > 0)
          .map(({ slug, label, titleField, docs }) => (
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
                {docs.map((doc, i) => {
                  const title = String((doc as Record<string, unknown>)[titleField] ?? doc.id ?? "Untitled")
                  const updatedAt = doc.updatedAt ? new Date(doc.updatedAt as string).toLocaleDateString("en-CA", {
                    year: "numeric", month: "short", day: "numeric",
                  }) : ""
                  return (
                    <a
                      key={String(doc.id)}
                      href={`/admin/collections/${slug}/${doc.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderTop: i === 0 ? "none" : "1px solid var(--theme-elevation-150)",
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: 14,
                        background: "var(--theme-elevation-0)",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--theme-elevation-50)" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--theme-elevation-0)" }}
                    >
                      <span style={{ fontWeight: 500 }}>{title}</span>
                      <span style={{ fontSize: 12, color: "var(--theme-elevation-400)", whiteSpace: "nowrap", marginLeft: 16 }}>
                        {updatedAt} →
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          ))
      )}
    </div>
  )
}
