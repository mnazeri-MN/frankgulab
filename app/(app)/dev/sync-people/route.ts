import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

// ── CSV parser (handles quoted multiline fields) ──────────────────────────────

function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let current: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { field += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === "," && !inQuotes) {
      current.push(field); field = ""
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++
      current.push(field); field = ""
      rows.push(current); current = []
    } else {
      field += ch
    }
  }
  if (current.length > 0) { current.push(field); rows.push(current) }

  const headers = rows[0]
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => { obj[h.trim()] = (row[i] ?? "").trim() })
    return obj
  })
}

// ── Field normalisers ─────────────────────────────────────────────────────────

function normLinkedIn(raw: string): string | null {
  if (!raw) return null
  const m = raw.match(/linkedin\.com\/in\/([^?#\s]+)/i)
  if (!m) return null
  return `https://linkedin.com/in/${m[1].replace(/\/$/, "")}`
}

function normScholar(raw: string): string | null {
  if (!raw) return null
  const m = raw.match(/citations\?(.+)/)
  if (!m) return null
  return `https://scholar.google.ca/citations?${m[1]}`
}

function parseDate(raw: string): string | null {
  if (!raw) return null
  // "Jan-27" → 2027-01-01
  const short = raw.match(/^([A-Za-z]{3})-(\d{2})$/)
  if (short) {
    const mon: Record<string, string> = { Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12" }
    return `20${short[2]}-${mon[short[1]] ?? "01"}-01T00:00:00.000Z`
  }
  // "M/D/YYYY"
  const parts = raw.split("/")
  if (parts.length === 3) {
    const [m, d, y] = parts
    return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}T00:00:00.000Z`
  }
  return null
}

function parseBool(raw: string, def: boolean): boolean {
  const v = raw.trim().toLowerCase()
  if (v === "yes") return true
  if (v === "no") return false
  return def
}

// ── Role mapping ──────────────────────────────────────────────────────────────

const ROLE_MAP: Record<string, string> = {
  "PhD Student": "PhD Candidate",
  "Undergraduate Student": "Undergraduate Researcher",
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function GET() {
  const payload = await getPayload({ config })

  const csvPath = path.resolve(process.cwd(), "..", "people(people-2026-09-04).csv")
  if (!fs.existsSync(csvPath)) {
    return NextResponse.json({ error: `CSV not found at ${csvPath}` }, { status: 404 })
  }

  const rows = parseCSV(fs.readFileSync(csvPath, "utf-8"))

  const created: string[] = []
  const updated: string[] = []
  const skipped: string[] = []
  const errors: { name: string; error: string }[] = []

  for (const row of rows) {
    const firstName = row["Preferred First Name"]
    const lastName = row["Last Name"]
    if (!firstName || !lastName) { skipped.push("(blank row)"); continue }

    const fullName = `${firstName} ${lastName}`

    let role = row["Role"]
    role = ROLE_MAP[role] ?? role
    if (!role) { skipped.push(`${fullName} — no role`); continue }

    const linkedin = normLinkedIn(row["LinkedIn"] ?? "")
    const scholar = normScholar(row["Google Scholar"] ?? "")

    const data: Record<string, unknown> = {
      preferredFirstName: firstName,
      lastInitial: lastName,
      showFullLastName: parseBool(row["Show Full Last Name"], true),
      title: row["Title"] || null,
      role,
      bio: row["Bio"] || null,
      showBio: parseBool(row["Show Bio"], true),
      email: row["Email"] || null,
      showEmail: parseBool(row["Show Email"], false),
      googleScholar: scholar,
      showScholar: parseBool(row["Show Scholar"], true),
      linkedin,
      showLinkedin: parseBool(row["Show LinkedIn"], true),
      showPhoto: parseBool(row["Show Photo"], true),
      startDate: parseDate(row["Start Date"] ?? ""),
      endDate: parseDate(row["End Date"] ?? ""),
      _status: "published",
    }

    try {
      const existing = await payload.find({
        collection: "people",
        where: { and: [
          { preferredFirstName: { equals: firstName } },
          { lastInitial: { equals: lastName } },
        ]},
        limit: 1,
        overrideAccess: true,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "people",
          id: existing.docs[0].id,
          data,
          overrideAccess: true,
        })
        updated.push(fullName)
      } else {
        await payload.create({
          collection: "people",
          data,
          overrideAccess: true,
        })
        created.push(fullName)
      }
    } catch (e) {
      errors.push({ name: fullName, error: String(e) })
    }
  }

  return NextResponse.json({ created, updated, skipped, errors, summary: { created: created.length, updated: updated.length, skipped: skipped.length, errors: errors.length } })
}
