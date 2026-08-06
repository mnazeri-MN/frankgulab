import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

const POSITIONS = [
  {
    title: "PhD Students",
    description:
      "We are looking for motivated PhD candidates with backgrounds in chemical engineering, chemistry, materials science, or related fields. Experience with automation, programming, or machine learning is a plus.",
    order: 1,
  },
  {
    title: "Postdoctoral Fellows",
    description:
      "Exceptional postdoctoral candidates with a strong publication record and interest in automated discovery are encouraged to reach out directly.",
    order: 2,
  },
  {
    title: "Undergraduate Researchers",
    description:
      "Undergraduate students at the University of Toronto interested in gaining research experience are welcome to apply. Positions are available through USRA and direct arrangements.",
    order: 3,
  },
]

export async function GET() {
  const payload = await getPayload({ config })
  const log: string[] = []

  for (const pos of POSITIONS) {
    await payload.create({ collection: "opportunities", data: pos })
    log.push(`Created: ${pos.title}`)
  }

  return NextResponse.json({ ok: true, log })
}
