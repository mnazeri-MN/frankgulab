import { NextRequest } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

function escapeCell(value: unknown): string {
  const str = value == null ? "" : String(value)
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatDate(value: unknown): string {
  if (!value) return ""
  const d = new Date(value as string)
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10)
}

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { docs } = await payload.find({
    collection: "people",
    limit: 1000,
    overrideAccess: true,
    sort: "lastInitial",
  })

  const headers = [
    "Preferred First Name",
    "Last Name",
    "Title",
    "Role",
    "Email",
    "Google Scholar",
    "LinkedIn",
    "Start Date",
    "End Date",
    "Status",
  ]

  const rows = docs.map((p) => [
    escapeCell(p.preferredFirstName),
    escapeCell(p.lastInitial),
    escapeCell(p.title),
    escapeCell(p.role),
    escapeCell(p.email),
    escapeCell(p.googleScholar),
    escapeCell(p.linkedin),
    escapeCell(formatDate(p.startDate)),
    escapeCell(formatDate(p.endDate)),
    escapeCell(p._status ?? "published"),
  ])

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="people-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
