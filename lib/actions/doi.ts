"use server"

export type DoiResult = {
  title: string
  firstAuthor: string
  year: number | null
  href: string
  imageUrl: string | null
}

export async function lookupDoi(rawDoi: string): Promise<DoiResult> {
  const doi = rawDoi.trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
  if (!doi) throw new Error("No DOI provided")

  const res = await fetch(
    `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
    {
      headers: {
        "User-Agent": "MixtureLab/1.0 (mailto:f.gu@utoronto.ca)",
      },
      next: { revalidate: 0 },
    }
  )

  if (!res.ok) throw new Error(`CrossRef returned ${res.status} for DOI: ${doi}`)

  const { message } = await res.json()

  const title: string = message.title?.[0] ?? ""

  const authors: { given?: string; family?: string }[] = message.author ?? []
  let firstAuthor = ""
  if (authors.length > 0) {
    const a = authors[0]
    const initial = a.given ? `${a.given.charAt(0)}.` : ""
    firstAuthor = [initial, a.family].filter(Boolean).join(" ")
    if (authors.length > 1) firstAuthor += " et al."
  }

  const year: number | null =
    message.published?.["date-parts"]?.[0]?.[0] ??
    message["published-print"]?.["date-parts"]?.[0]?.[0] ??
    message["published-online"]?.["date-parts"]?.[0]?.[0] ??
    null

  const href = `https://doi.org/${doi}`

  // Best-effort OG image fetch from the publisher page
  let imageUrl: string | null = null
  try {
    const pageRes = await fetch(href, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
    })
    if (pageRes.ok) {
      const html = await pageRes.text()
      const match =
        html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
      if (match?.[1]) imageUrl = match[1]
    }
  } catch {
    // OG image is best-effort — silently skip on failure
  }

  return { title, firstAuthor, year, href, imageUrl }
}
