import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: "users", where: { email: { equals: "frank@frankgulab.com" } } })
  if (existing.docs.length > 0) {
    return NextResponse.json({ ok: false, message: "User already exists" })
  }
  await payload.create({
    collection: "users",
    data: { email: "frank@frankgulab.com", password: "%ZT86cs27$SimJ", name: "Frank Gu" },
  })
  return NextResponse.json({ ok: true, message: "Admin user created" })
}
