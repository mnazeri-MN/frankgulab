import Link from "next/link"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { getPayload } from "payload"
import config from "@payload-config"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { notFound } from "next/navigation"

const SITE_URL = "https://frankgulab.com"

export const dynamic = "force-dynamic"

export default async function BlogListPage() {
  const payload = await getPayload({ config })

  let posts: {
    title: string
    slug: string
    excerpt: string | null
    publishedAt: string | null
    coverImageUrl: string | null
    authorName: string | null
  }[] = []

  try {
    const { docs } = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      limit: 100,
      where: { _status: { equals: "published" } },
    })

    posts = docs.map((doc) => {
      const coverImageUrl =
        doc.coverImage && typeof doc.coverImage === "object"
          ? ((doc.coverImage as { url?: string | null }).url ?? null)
          : null

      const author = doc.author && typeof doc.author === "object" ? doc.author as { preferredFirstName?: string; lastInitial?: string } : null
      const authorName = author
        ? [author.preferredFirstName, author.lastInitial].filter(Boolean).join(" ")
        : null

      const dateStr = doc.publishedAt
        ? new Date(doc.publishedAt as string).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null

      return {
        title: doc.title,
        slug: doc.slug as string,
        excerpt: (doc.excerpt as string | null) ?? null,
        publishedAt: dateStr,
        coverImageUrl,
        authorName,
      }
    })
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <h1 className="font-heading text-5xl font-semibold tracking-[-0.02em] text-ink">
          From the Lab
        </h1>
        <p className="mt-4 font-body text-xl text-dark-grey">
          Updates, insights, and stories from The Mixture Lab.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 font-body text-lg text-dark-grey">No posts yet.</p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-shadow hover:shadow-md">
                <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                  {post.coverImageUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-body text-sm text-dark-grey">
                      {[post.publishedAt, post.authorName].filter(Boolean).join(" · ")}
                    </p>
                    <h2 className="mt-2 font-heading text-xl font-semibold leading-snug text-ink">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 font-body text-base leading-7 text-dark-grey line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-4 font-body text-sm font-medium text-ink group-hover:underline">
                      Read more →
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end px-6 pb-5">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    Share
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
