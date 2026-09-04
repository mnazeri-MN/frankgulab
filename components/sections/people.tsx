import { getPayload } from "payload"
import config from "@payload-config"
import { SectionLabel } from "@/components/ui/section-label"
import { PeopleGrid, type Person } from "@/components/sections/people-client"
import { LabPhotosCarousel, type LabPhoto } from "@/components/sections/lab-photos-carousel"

const ROLE_PRIORITY: Record<string, number> = {
  "Principal Investigator": 0,
  "Research Associate": 1,
  "Postdoctoral Fellow": 2,
  "PhD Candidate": 3,
  "Lab Manager": 4,
  "MASc Student": 5,
  "MEng Student": 6,
  "Undergraduate Researcher": 7,
  "Visiting Scholar": 8,
}

export async function People() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "people",
    limit: 100,
    where: { status: { equals: "published" } },
  })

  const today = new Date()
  function isActive(doc: (typeof docs)[number]) {
    const start = doc.startDate ? new Date(doc.startDate as string) : null
    const end = doc.endDate ? new Date(doc.endDate as string) : null
    if (start && start > today) return false
    if (end && end < today) return false
    return true
  }

  function toPerson(doc: (typeof docs)[number]): Person {
    const title = doc.title && doc.title !== "" ? `${doc.title} ` : ""
    const showFull = doc.showFullLastName !== false
    const lastName = showFull
      ? (doc.lastInitial ?? "")
      : `${(doc.lastInitial ?? "").charAt(0)}.`
    const displayName = `${title}${doc.preferredFirstName} ${lastName}`

    const photoUrl = doc.photo && typeof doc.photo === "object"
      ? (doc.photo as { url?: string | null }).url ?? undefined
      : undefined

    return {
      displayName,
      role: doc.role,
      lastInitial: doc.lastInitial ?? "",
      bio: doc.showBio !== false ? ((doc.bio as string | null | undefined) ?? undefined) : undefined,
      email: doc.showEmail === true ? (doc.email ?? undefined) : undefined,
      scholar: doc.showScholar !== false ? (doc.googleScholar ?? undefined) : undefined,
      linkedin: doc.showLinkedin !== false ? (doc.linkedin ?? undefined) : undefined,
      photo: doc.showPhoto !== false ? photoUrl : undefined,
    }
  }

  function sortPeople(list: (typeof docs)) {
    return list.slice().sort((a, b) => {
      const rDiff = (ROLE_PRIORITY[a.role] ?? 99) - (ROLE_PRIORITY[b.role] ?? 99)
      if (rDiff !== 0) return rDiff
      return (a.lastInitial ?? "").localeCompare(b.lastInitial ?? "")
    })
  }

  const people = sortPeople(docs.filter(isActive)).map(toPerson)
  const alumni = sortPeople(docs.filter((d) => !isActive(d) && d.endDate)).map(toPerson)

  let labPhotos: LabPhoto[] = []
  try {
    const { docs: photoDocs } = await payload.find({
      collection: "lab-photos",
      sort: "order",
      limit: 50,
      where: { status: { equals: "published" } },
    })
    labPhotos = photoDocs
      .filter((d) => d.photo && typeof d.photo === "object")
      .map((d) => {
        const img = d.photo as { url?: string | null; alt?: string | null }
        return {
          url: img.url ?? "",
          alt: img.alt ?? `Lab photo ${d.year}`,
          year: d.year,
          caption: (d.caption as string | null) ?? undefined,
        }
      })
  } catch {
    // table not yet migrated — skip
  }

  return (
    <section id="people" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>The Team</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
          People
        </h2>
        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          A multidisciplinary team of researchers, engineers, and scientists
          working at the frontier of automated discovery.
        </p>
        <PeopleGrid people={people} alumni={alumni} />
        {labPhotos.length > 0 && <hr className="mt-14 border-ink/10" />}
        <LabPhotosCarousel photos={labPhotos} />
      </div>
    </section>
  )
}
