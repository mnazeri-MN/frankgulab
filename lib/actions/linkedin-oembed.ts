"use server"

export type LinkedInOEmbedResult = {
  title: string | null
  authorName: string | null
  thumbnailUrl: string | null
}

export async function fetchLinkedInOEmbed(postUrl: string): Promise<LinkedInOEmbedResult> {
  const endpoint = `https://www.linkedin.com/oembed?url=${encodeURIComponent(postUrl)}&format=json`
  const res = await fetch(endpoint, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`LinkedIn oEmbed returned ${res.status}`)
  const data = await res.json()
  return {
    title: (data.title as string) || null,
    authorName: (data.author_name as string) || null,
    thumbnailUrl: (data.thumbnail_url as string) || null,
  }
}
