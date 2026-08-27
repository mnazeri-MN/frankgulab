import Image from "next/image"
import { Mail, BookOpen, Linkedin } from "lucide-react"
import { getPayload } from "payload"
import config from "@payload-config"
import { SectionLabel } from "@/components/ui/section-label"

type Person = {
  displayName: string
  role: string
  photo?: string
  email?: string
  scholar?: string
  linkedin?: string
  lastInitial: string
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="rounded-card bg-white p-5 ring-1 ring-ink/10">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-inner bg-light-grey">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.displayName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-3xl font-semibold text-grey">
              {person.displayName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-heading text-lg font-semibold text-ink">
        {person.displayName}
      </h3>
      <p className="mt-0.5 font-body text-lg text-dark-grey">{person.role}</p>
      {(person.email || person.scholar || person.linkedin) && (
        <div className="mt-3 flex items-center gap-3">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="text-grey transition-colors hover:text-ink"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {person.scholar && (
            <a
              href={person.scholar}
              className="text-grey transition-colors hover:text-ink"
              aria-label="Google Scholar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              className="text-grey transition-colors hover:text-ink"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

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

        <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {people.map((person, i) => (
            <PersonCard key={i} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}
