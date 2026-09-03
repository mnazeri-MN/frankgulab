import { getPayload } from "payload"
import config from "@payload-config"
import { ArrowUpRight, Linkedin } from "lucide-react"
import type { PublicationItem } from "@/components/sections/publications-carousel"
import type { NewsItem } from "@/components/sections/news-carousel"

export const dynamic = "force-dynamic"

// ─── Variant A: current layout (image + title left, summary right) ────────────

function PubCardA({ pub }: { pub: PublicationItem }) {
  return (
    <a
      href={pub.href || "#"}
      target={pub.href ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md md:flex"
    >
      <div className="flex flex-col md:w-1/2">
        <div className="relative aspect-video w-full overflow-hidden bg-light-grey md:flex-1 md:aspect-auto">
          {pub.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pub.imageUrl} alt={pub.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-light-grey">
              <span className="font-body text-sm text-grey">No image</span>
            </div>
          )}
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-body text-xl font-medium leading-8 text-ink">{pub.title}</p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-xl text-grey">{pub.firstAuthor} · {pub.year}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-t border-ink/10 p-4 md:w-1/2 md:border-l md:border-t-0 md:p-5">
        <p className="font-body text-xl leading-9 text-dark-grey">{pub.summary ?? <span className="italic text-grey/50">No summary yet.</span>}</p>
        {pub.href && (
          <div className="mt-4 flex justify-end">
            <span className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-sm text-grey">
              <Linkedin className="h-3.5 w-3.5" /> Share
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

function NewsCardA({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md md:flex"
    >
      <div className="flex flex-col md:w-1/2">
        <div className="relative aspect-video w-full overflow-hidden bg-light-grey md:flex-1 md:aspect-auto">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="h-full w-full bg-light-grey" />
          )}
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-xl text-grey">{item.source} · {item.date}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-t border-ink/10 p-4 md:w-1/2 md:border-l md:border-t-0 md:p-5">
        <p className="font-body text-xl leading-9 text-dark-grey">{item.summary ?? <span className="italic text-grey/50">No summary yet.</span>}</p>
        <div className="mt-4 flex justify-end">
          <span className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-sm text-grey">
            <Linkedin className="h-3.5 w-3.5" /> Share
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── Variant B: image top-left, title top-right, summary bottom ───────────────

function PubCardB({ pub }: { pub: PublicationItem }) {
  return (
    <a
      href={pub.href || "#"}
      target={pub.href ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      {/* Top row: image left, title right */}
      <div className="flex">
        <div className="relative w-2/5 shrink-0 overflow-hidden bg-light-grey" style={{ aspectRatio: "1/1" }}>
          {pub.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pub.imageUrl} alt={pub.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="h-full w-full bg-light-grey" />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="font-body text-base font-medium leading-6 text-ink">{pub.title}</p>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-sm text-grey">{pub.firstAuthor} · {pub.year}</p>
        </div>
      </div>
      {/* Bottom: summary full width */}
      <div className="flex flex-col justify-between border-t border-ink/10 p-4">
        <p className="font-body text-base leading-7 text-dark-grey">{pub.summary ?? <span className="italic text-grey/50">No summary yet.</span>}</p>
        {pub.href && (
          <div className="mt-3 flex justify-end">
            <span className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-sm text-grey">
              <Linkedin className="h-3.5 w-3.5" /> Share
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

function NewsCardB({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="flex">
        <div className="relative w-2/5 shrink-0 overflow-hidden bg-light-grey" style={{ aspectRatio: "1/1" }}>
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="h-full w-full bg-light-grey" />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="font-body text-base font-medium leading-6 text-ink">{item.title}</p>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-sm text-grey">{item.source} · {item.date}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-t border-ink/10 p-4">
        <p className="font-body text-base leading-7 text-dark-grey">{item.summary ?? <span className="italic text-grey/50">No summary yet.</span>}</p>
        <div className="mt-3 flex justify-end">
          <span className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-sm text-grey">
            <Linkedin className="h-3.5 w-3.5" /> Share
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── Demo page ────────────────────────────────────────────────────────────────

type SearchParams = Promise<{ cards?: string }>

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const { cards = "a" } = await searchParams

  const payload = await getPayload({ config })

  const [{ docs: pubDocs }, { docs: newsDocs }] = await Promise.all([
    payload.find({ collection: "publications", limit: 4, sort: "-year" }),
    payload.find({ collection: "news", limit: 4, sort: "-date" }),
  ])

  const publications: PublicationItem[] = pubDocs.map((doc) => ({
    title: doc.title,
    firstAuthor: doc.firstAuthor ?? "",
    year: doc.year,
    href: doc.href ?? "",
    imageUrl: doc.image && typeof doc.image === "object"
      ? (doc.image as { url?: string | null }).url ?? null
      : (doc.fetchedImageUrl as string | null) ?? null,
    summary: doc.summary as string | null ?? null,
  }))

  const news: NewsItem[] = newsDocs.map((doc) => ({
    title: doc.title,
    source: doc.source,
    date: new Date(doc.date as string).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" }),
    url: doc.url,
    imageUrl: (doc.imageUrl as string | null) ?? null,
    summary: (doc.summary as string | null) ?? null,
  }))

  const variants = [
    { key: "a", label: "Current" },
    { key: "b", label: "Image · Title · Summary" },
  ]

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Demo toolbar */}
      <div className="sticky top-0 z-50 border-b border-ink/10 bg-warm-white/90 backdrop-blur px-6 py-3 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <span className="font-heading text-sm font-semibold text-ink">Design Review — Card Layout</span>
          <div className="flex items-center gap-1">
            {variants.map((v) => (
              <a
                key={v.key}
                href={`/demo?cards=${v.key}`}
                className={`rounded-full px-4 py-1.5 font-body text-sm transition-colors ${
                  cards === v.key
                    ? "bg-ink text-white"
                    : "text-grey hover:text-ink"
                }`}
              >
                {v.label}
              </a>
            ))}
          </div>
          <a href="/" className="font-body text-sm text-grey hover:text-ink transition-colors">
            ← Live site
          </a>
        </div>
      </div>

      {/* Publications */}
      <section className="px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-sm font-medium uppercase tracking-widest text-grey">Selected Works</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-ink">Publications</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {publications.map((pub, i) =>
              cards === "b"
                ? <PubCardB key={i} pub={pub} />
                : <PubCardA key={i} pub={pub} />
            )}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-ink/10 px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-sm font-medium uppercase tracking-widest text-grey">Press &amp; Updates</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-ink">News</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {news.map((item, i) =>
              cards === "b"
                ? <NewsCardB key={i} item={item} />
                : <NewsCardA key={i} item={item} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
