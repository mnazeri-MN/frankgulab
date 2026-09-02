import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })

  const endpoint = `https://www.linkedin.com/oembed?url=${encodeURIComponent(url)}&format=json`
  const res = await fetch(endpoint, {
    headers: { "User-Agent": "Mozilla/5.0" },
  })
  if (!res.ok) return NextResponse.json({ error: `LinkedIn returned ${res.status}` }, { status: 502 })
  const data = await res.json()
  return NextResponse.json(data)
}
