import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN ?? ""
  if (!token) return NextResponse.json({ ok: false, error: "No BLOB_READ_WRITE_TOKEN" })

  try {
    // Try uploading a tiny 1-pixel PNG directly to Blob
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    )
    const result = await put("debug-test.png", pixel, {
      access: "public",
      token,
      allowOverwrite: true,
      contentType: "image/png",
    })
    return NextResponse.json({ ok: true, url: result.url })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: String(e),
      stack: e instanceof Error ? e.stack?.split("\n").slice(0, 6).join("\n") : undefined,
    })
  }
}
