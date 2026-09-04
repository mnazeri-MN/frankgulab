import { getPayload } from "payload"
import config from "@payload-config"
import { PublicationsCarousel } from "./publications-carousel"
import type { PublicationItem } from "./publications-carousel"

export async function Publications({ cardVariant, cardLayout }: { cardVariant?: "a" | "b" | "c" | "d"; cardLayout?: "carousel" | "grid3" }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "publications",
    sort: "-year",
    limit: 200,
    where: { _status: { equals: "published" } },
  })

  const publications: PublicationItem[] = docs.map((doc) => {
    const uploadedUrl =
      doc.image && typeof doc.image === "object"
        ? (doc.image as { url?: string | null }).url ?? null
        : null

    return {
      title: doc.title,
      firstAuthor: doc.firstAuthor ?? "",
      year: doc.year,
      href: doc.href ?? "",
      imageUrl: uploadedUrl ?? (doc.fetchedImageUrl as string | null) ?? null,
      summary: (doc.summary as string | null) ?? null,
    }
  })

  return <PublicationsCarousel publications={publications} cardVariant={cardVariant} cardLayout={cardLayout} />
}
