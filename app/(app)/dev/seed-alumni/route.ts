import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const ALUMNI = [
  { preferredFirstName: "Sarah", lastInitial: "Chen", role: "PhD Candidate" },
  { preferredFirstName: "James", lastInitial: "Park", role: "Postdoctoral Fellow" },
  { preferredFirstName: "Anika", lastInitial: "Patel", role: "MASc Student" },
  { preferredFirstName: "Lucas", lastInitial: "Moreau", role: "PhD Candidate" },
  { preferredFirstName: "Mei", lastInitial: "Zhang", role: "Undergraduate Researcher" },
]

const END_DATE = "2026-01-01"

export async function GET() {
  const payload = await getPayload({ config })

  const results: string[] = []
  for (const person of ALUMNI) {
    await payload.create({
      collection: "people",
      data: {
        ...person,
        endDate: END_DATE,
        role: person.role as never,
      } as never,
    })
    results.push(`${person.preferredFirstName} ${person.lastInitial}`)
  }

  return NextResponse.json({ ok: true, created: results })
}
