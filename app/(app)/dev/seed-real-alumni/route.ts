import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Delete the 5 placeholder alumni seeded earlier
const PLACEHOLDERS = [
  { preferredFirstName: "Sarah", lastInitial: "Chen" },
  { preferredFirstName: "James", lastInitial: "Park" },
  { preferredFirstName: "Anika", lastInitial: "Patel" },
  { preferredFirstName: "Lucas", lastInitial: "Moreau" },
  { preferredFirstName: "Mei",   lastInitial: "Zhang" },
]

const ALUMNI: {
  title?: string
  preferredFirstName: string
  lastInitial: string
  role: string
  endDate: string
}[] = [
  // Postdocs / Research Fellows
  { title: "Dr.", preferredFirstName: "Sandy",       lastInitial: "Liu",                role: "Postdoctoral Fellow", endDate: "2016-12-31" },
  { title: "Dr.", preferredFirstName: "Tim",         lastInitial: "Leshuk",             role: "Postdoctoral Fellow", endDate: "2019-12-31" },

  // UofT — 2024 graduates
  { title: "Dr.", preferredFirstName: "Aaron",       lastInitial: "Clasky",             role: "PhD Candidate",      endDate: "2024-12-31" },
  { title: "Dr.", preferredFirstName: "Aldrich",     lastInitial: "Ngan",               role: "PhD Candidate",      endDate: "2024-12-31" },
  {               preferredFirstName: "Yunji",       lastInitial: "Seo",                role: "MASc Student",       endDate: "2024-12-31" },
  {               preferredFirstName: "Christopher", lastInitial: "Chan",               role: "MASc Student",       endDate: "2024-12-31" },
  {               preferredFirstName: "Sheldon",     lastInitial: "Mei",                role: "MASc Student",       endDate: "2024-12-31" },
  {               preferredFirstName: "Yanny",       lastInitial: "Chen",               role: "MASc Student",       endDate: "2024-12-31" },

  // UofT — 2023 graduates
  { title: "Dr.", preferredFirstName: "Jeffrey",     lastInitial: "Watchorn",           role: "PhD Candidate",      endDate: "2023-12-31" },
  {               preferredFirstName: "Aaron",       lastInitial: "Bleasdale-Pollowy",  role: "MASc Student",       endDate: "2023-12-31" },

  // UofT — 2022 graduates
  { title: "Dr.", preferredFirstName: "Paul",        lastInitial: "Chen",               role: "PhD Candidate",      endDate: "2022-12-31" },
  {               preferredFirstName: "Nicholas",    lastInitial: "Luy",                role: "MASc Student",       endDate: "2022-12-31" },
  {               preferredFirstName: "Kristina",    lastInitial: "Faurschou",          role: "MASc Student",       endDate: "2022-12-31" },
  {               preferredFirstName: "Samantha",    lastInitial: "Stuart",             role: "MASc Student",       endDate: "2022-12-31" },
  {               preferredFirstName: "Mahta",       lastInitial: "Massoud",            role: "MASc Student",       endDate: "2022-12-31" },

  // UofT — no date
  {               preferredFirstName: "Vincent",     lastInitial: "Wang",               role: "PhD Candidate",      endDate: "2026-01-01" },

  // UWaterloo — 2019
  { title: "Dr.", preferredFirstName: "Stuart",      lastInitial: "Linley",             role: "PhD Candidate",      endDate: "2019-12-31" },
  {               preferredFirstName: "Sukrit",      lastInitial: "Rajpal",             role: "MASc Student",       endDate: "2019-12-31" },
  {               preferredFirstName: "Lori",        lastInitial: "Pollit",             role: "MASc Student",       endDate: "2019-12-31" },

  // UWaterloo — 2018
  {               preferredFirstName: "Harish",      lastInitial: "Krishnakumar",       role: "MASc Student",       endDate: "2018-12-31" },
  {               preferredFirstName: "Noor",        lastInitial: "Bahsoun",            role: "MASc Student",       endDate: "2018-12-31" },

  // UWaterloo — 2017
  { title: "Dr.", preferredFirstName: "Peter",       lastInitial: "Lin",                role: "PhD Candidate",      endDate: "2017-12-31" },
  {               preferredFirstName: "Aaminah",     lastInitial: "Ahmad",              role: "MASc Student",       endDate: "2017-12-31" },

  // UWaterloo — 2016
  { title: "Dr.", preferredFirstName: "Erin",        lastInitial: "Bedford",            role: "PhD Candidate",      endDate: "2016-12-31" },
  {               preferredFirstName: "Jacob",       lastInitial: "Ragowski",           role: "MASc Student",       endDate: "2016-12-31" },

  // UWaterloo — 2015
  { title: "Dr.", preferredFirstName: "Mohit",       lastInitial: "Verma",              role: "PhD Candidate",      endDate: "2015-12-31" },
  {               preferredFirstName: "Sarah",       lastInitial: "Strathern",          role: "MASc Student",       endDate: "2015-12-31" },
]

export async function GET() {
  try {
  const payload = await getPayload({ config })

  // Delete placeholders — fetch all, filter in JS to avoid where-clause issues
  const { docs: all } = await payload.find({ collection: "people", limit: 200 })
  for (const doc of all) {
    const isPlaceholder = PLACEHOLDERS.some(
      (p) => p.preferredFirstName === doc.preferredFirstName && p.lastInitial === doc.lastInitial
    )
    if (isPlaceholder) {
      await payload.delete({ collection: "people", id: doc.id })
    }
  }

  // Create real alumni
  const created: string[] = []
  for (const person of ALUMNI) {
    const data: Record<string, unknown> = {
      preferredFirstName: person.preferredFirstName,
      lastInitial: person.lastInitial,
      role: person.role,
      endDate: new Date(person.endDate).toISOString(),
    }
    if (person.title) data.title = person.title

    await payload.create({ collection: "people", data: data as never })
    created.push(`${person.title ?? ""} ${person.preferredFirstName} ${person.lastInitial}`.trim())
  }

  return NextResponse.json({ ok: true, created })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
