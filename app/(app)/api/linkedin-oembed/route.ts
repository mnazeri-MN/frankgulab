import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

function og(html: string, prop: string): string | null {
  const a = html.match(new RegExp(`<meta[^>]+property="${prop}"[^>]+content="([^"]*)"`, "i"))
  const b = html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${prop}"`, "i"))
  const raw = (a ?? b)?.[1] ?? null
  return raw ? raw.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"') : null
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://www.linkedin.com/",
    },
  })

  if (!res.ok) return NextResponse.json({ error: `LinkedIn returned ${res.status}` }, { status: 502 })

  const html = await res.text()
  const rawTitle = og(html, "og:title")           // e.g. "#electrolyte #battery | Frank Gu"
  const description = og(html, "og:description")  // the actual post text
  const image = og(html, "og:image")

  // og:title is formatted as "<hashtags/topic> | Author Name"
  const authorName = rawTitle?.includes(" | ") ? rawTitle.split(" | ").pop()?.trim() ?? null : null

  // Use the post text as the title suggestion (first 120 chars)
  const title = description ? description.slice(0, 120).trimEnd() + (description.length > 120 ? "…" : "") : rawTitle

  if (!title && !image) {
    return NextResponse.json({ error: "Could not extract metadata — LinkedIn may be blocking this request" }, { status: 422 })
  }

  return NextResponse.json({ title, author_name: authorName, thumbnail_url: image })
}
