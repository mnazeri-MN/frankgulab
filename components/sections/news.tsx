import { getPayload } from "payload"
import config from "@payload-config"
import { NewsCarousel } from "./news-carousel"
import type { NewsItem } from "./news-carousel"

export async function News({ cardVariant }: { cardVariant?: "a" | "b" | "c" | "d" }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "news",
    sort: "-date",
    limit: 20,
    where: { status: { equals: "published" } },
  })

  const items: NewsItem[] = docs.map((doc) => ({
    title: doc.title,
    source: doc.source,
    date: new Date(doc.date as string).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
    }),
    url: doc.url,
    imageUrl: (doc.imageUrl as string | null) ?? null,
    summary: (doc.summary as string | null) ?? null,
  }))

  return <NewsCarousel items={items} cardVariant={cardVariant} />
}
