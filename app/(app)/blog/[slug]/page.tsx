import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "lexical"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let post: {
    title: string
    excerpt: string | null
    publishedAt: string | null
    coverImageUrl: string | null
    authorName: string | null
    body: SerializedEditorState | null
  } | null = null

  try {
    const { docs } = await payload.find({
      collection: "posts",
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
        ],
      },
    })

    if (!docs[0]) return notFound()

    const doc = docs[0]
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

    post = {
      title: doc.title,
      excerpt: (doc.excerpt as string | null) ?? null,
      publishedAt: dateStr,
      coverImageUrl,
      authorName,
      body: (doc.body as SerializedEditorState | null) ?? null,
    }
  } catch {
    notFound()
  }

  if (!post) return notFound()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <Link
          href="/blog"
          className="font-body text-sm text-dark-grey hover:text-ink"
        >
          ← All posts
        </Link>

        <h1 className="mt-8 font-heading text-4xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 font-body text-base text-dark-grey">
          {[post.publishedAt, post.authorName].filter(Boolean).join(" · ")}
        </p>

        {post.coverImageUrl && (
          <div className="relative mt-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && (
          <div className="blog-body mt-12 font-body text-ink">
            <RichText data={post.body as SerializedEditorState} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
