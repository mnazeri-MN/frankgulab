import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const MEMBERS = [
  { title: "Prof.", preferredFirstName: "Frank",     lastInitial: "Gu",      role: "Principal Investigator",   email: "f.gu@utoronto.ca", startDate: "2010-01-01" },
  { title: "",      preferredFirstName: "Mohammad",  lastInitial: "Nazeri",  role: "PhD Candidate",            startDate: "2023-01-01" },
  { title: "",      preferredFirstName: "Cassandra", lastInitial: "Chidiac", role: "PhD Candidate",            startDate: "2020-01-01" },
  { title: "",      preferredFirstName: "Gayatri",   lastInitial: "Prakash", role: "PhD Candidate",            startDate: "2020-01-01" },
  { title: "",      preferredFirstName: "Dazhi",     lastInitial: "Ren",     role: "PhD Candidate",            startDate: "2020-01-01" },
  { title: "",      preferredFirstName: "Christine", lastInitial: "Huang",   role: "MASc Student",             startDate: "2023-01-01" },
  { title: "",      preferredFirstName: "Selena",    lastInitial: "Chen",    role: "MASc Student",             startDate: "2024-01-01" },
  { title: "",      preferredFirstName: "Erin",      lastInitial: "Ng",      role: "MASc Student",             startDate: "2024-01-01" },
  { title: "",      preferredFirstName: "Irisjade",  lastInitial: "Ong",     role: "Research Associate",       startDate: "2024-01-01" },
]

export async function GET() {
  const payload = await getPayload({ config })
  const results: Record<string, unknown> = {}

  // Seed people — skip if a record with the same first name + last initial already exists
  const existing = await payload.find({ collection: "people", limit: 100 })
  const existingKeys = new Set(
    existing.docs.map((p) => `${p.preferredFirstName}|${p.lastInitial}`)
  )

  const added: string[] = []
  const skipped: string[] = []

  for (const m of MEMBERS) {
    const key = `${m.preferredFirstName}|${m.lastInitial}`
    if (existingKeys.has(key)) {
      skipped.push(key)
      continue
    }
    await payload.create({
      collection: "people",
      data: {
        title: m.title || undefined,
        preferredFirstName: m.preferredFirstName,
        lastInitial: m.lastInitial,
        role: m.role,
        email: m.email ?? undefined,
        startDate: m.startDate,
      } as Parameters<typeof payload.create>[0]["data"],
    })
    added.push(key)
  }

  results.people = { added, skipped }

  // Upload group photo to media and set as contact photo in site-settings
  const photoPath = path.resolve(process.cwd(), "public/images/lab-group-photo.jpeg")
  if (fs.existsSync(photoPath)) {
    const buffer = fs.readFileSync(photoPath)
    const media = await payload.create({
      collection: "media",
      data: { alt: "The Mixture Lab group photo" },
      file: {
        data: buffer,
        mimetype: "image/jpeg",
        name: "lab-group-photo.jpeg",
        size: buffer.length,
      },
    })
    await payload.updateGlobal({
      slug: "site-settings",
      data: { contactPhoto: media.id },
    })
    results.groupPhoto = `uploaded as media id:${media.id}, set as contact photo`
  } else {
    results.groupPhoto = "file not found at public/images/lab-group-photo.jpeg"
  }

  return NextResponse.json({ ok: true, results })
}
