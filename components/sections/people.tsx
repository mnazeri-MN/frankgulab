import { getPayload } from "payload"
import config from "@payload-config"
import { SectionLabel } from "@/components/ui/section-label"
import { PeopleGrid, type Person } from "@/components/sections/people-client"

const ROLE_PRIORITY: Record<string, number> = {
  "Principal Investigator": 0,
  "Research Associate": 1,
  "Postdoctoral Fellow": 2,
  "PhD Candidate": 3,
  "MASc Student": 4,
  "MEng Student": 5,
  "Undergraduate Researcher": 6,
  "Lab Manager": 7,
  "Visiting Scholar": 8,
}

export async function People() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "people",
    limit: 100,
  })

  const today = new Date()
  const active = docs.filter((doc) => {
    const start = doc.startDate ? new Date(doc.startDate as string) : null
    const end = doc.endDate ? new Date(doc.endDate as string) : null
    if (start && start > today) return false
    if (end && end < today) return false
    return true
  })

  const people: Person[] = active
    .slice()
    .sort((a, b) => {
      const rDiff = (ROLE_PRIORITY[a.role] ?? 99) - (ROLE_PRIORITY[b.role] ?? 99)
      if (rDiff !== 0) return rDiff
      return (a.lastInitial ?? "").localeCompare(b.lastInitial ?? "")
    })
    .map((doc) => {
      const title = doc.title && doc.title !== "" ? `${doc.title} ` : ""
      const displayName = `${title}${doc.preferredFirstName} ${doc.lastInitial}`
      return {
        displayName,
        role: doc.role,
        lastInitial: doc.lastInitial ?? "",
        bio: (doc.bio as string | null | undefined) ?? undefined,
        email: doc.email ?? undefined,
        scholar: doc.googleScholar ?? undefined,
        linkedin: doc.linkedin ?? undefined,
        photo: doc.photo && typeof doc.photo === "object"
          ? (doc.photo as { url?: string | null }).url ?? undefined
          : undefined,
      }
    })

  return (
    <section id="people" className="bg-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>The Team</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
          People
        </h2>
        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          A multidisciplinary team of researchers, engineers, and scientists
          working at the frontier of automated discovery.
        </p>
        <PeopleGrid people={people} />
      </div>
    </section>
  )
}
