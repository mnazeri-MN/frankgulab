import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })
  const results: Record<string, unknown> = {}

  // 1. Fix Frank's last name: G -> Gu
  const people = await payload.find({ collection: "people", limit: 100 })
  const frank = people.docs.find(
    (p) => p.preferredFirstName === "Frank" && p.lastInitial === "G"
  )
  if (frank) {
    await payload.update({ collection: "people", id: frank.id, data: { lastInitial: "Gu" } })
    results.frankName = "updated G -> Gu"
  } else {
    results.frankName = "not found or already updated"
  }

  // 2. Fix hero slides with same tagline (orders 3 and 4)
  const slides = await payload.find({ collection: "hero-slides", limit: 20 })
  const order3 = slides.docs.find((s) => s.order === 3)
  const order4 = slides.docs.find((s) => s.order === 4)

  if (order3 && order4 && order3.tagline === order4.tagline) {
    await payload.update({
      collection: "hero-slides",
      id: order3.id,
      data: { tagline: "Precision engineering of small-molecule systems for controlled function and formulation." },
    })
    await payload.update({
      collection: "hero-slides",
      id: order4.id,
      data: { tagline: "Designing structured matter, from emulsions to hydrogels, with programmable physical properties." },
    })
    results.heroSlides = "taglines updated for orders 3 and 4"
  } else if (order3 && order4) {
    results.heroSlides = "slides found but taglines already differ, no change"
  } else {
    results.heroSlides = `orders 3/4 not found (found ${slides.docs.map((s) => s.order).join(",")})`
  }

  // 3. Opportunities: "PhD Students" -> "Grad Students (PhD/MASc)"
  const opps = await payload.find({ collection: "opportunities", limit: 20 })
  const phdOpp = opps.docs.find((o) => o.title === "PhD Students")
  if (phdOpp) {
    await payload.update({
      collection: "opportunities",
      id: phdOpp.id,
      data: { title: "Grad Students (PhD/MASc)" },
    })
    results.opportunities = "PhD Students -> Grad Students (PhD/MASc)"
  } else {
    results.opportunities = "PhD Students entry not found"
  }

  // 4. Add BME to site-settings affiliates
  const settings = await payload.findGlobal({ slug: "site-settings" })
  const existing: { name: string; url: string }[] = (settings.affiliates ?? []) as { name: string; url: string }[]
  const bmeEntry = { name: "Institute of Biomedical Engineering", url: "https://bme.utoronto.ca" }
  const alreadyHasBme = existing.some((a) => a.name === bmeEntry.name)
  if (!alreadyHasBme) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: { affiliates: [...existing, bmeEntry] },
    })
    results.affiliates = "BME added"
  } else {
    results.affiliates = "BME already present"
  }

  // 5. Delete COVID heterogeneity paper (id 12, eLife 2021)
  try {
    await payload.delete({ collection: "publications", id: 12 })
    results.covidPaper = "deleted id:12"
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    results.covidPaper = `delete failed: ${msg}`
  }

  return NextResponse.json({ ok: true, results })
}
