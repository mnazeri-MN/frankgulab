import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const BIO = `Frank Gu is a Professor in the Department of Chemical Engineering & Applied Chemistry at the University of Toronto, where he holds an NSERC Senior Industrial Research Chair in Nanotechnology Engineering. He received his PhD from Queen's University and completed postdoctoral training at MIT and Harvard Medical School before joining UofT in 2018.

His research sits at the intersection of nanotechnology, automation, and AI — building self-driving laboratory platforms that navigate complex formulation spaces autonomously, compressing years of experimental iteration into weeks. At the Mixture Lab, these platforms span the full formulation workflow: high-throughput ingredient screening, microstructure characterization, autonomous synthesis, and performance optimization.

Frank's work has driven real-world impact across pharmaceuticals, personal care, agriculture, and water treatment, and has spun out two Canadian companies: MyX Therapeutics (ocular drug delivery) and H2nanO (photocatalytic water treatment).`

export async function GET() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "people",
    where: { preferredFirstName: { contains: "Frank" } },
    limit: 5,
  })

  if (docs.length === 0) {
    return NextResponse.json({ error: "No record matching 'Frank' found" }, { status: 404 })
  }

  const frank = docs[0]
  await payload.update({ collection: "people", id: frank.id, data: { bio: BIO } as never })

  return NextResponse.json({ ok: true, updated: frank.preferredFirstName })
}
