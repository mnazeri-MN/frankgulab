import { getPayload } from "payload"
import config from "@payload-config"
import { getSiteSettings } from "@/lib/site-settings"
import { SectionLabel } from "@/components/ui/section-label"

export async function Opportunities() {
  const [s, payload] = await Promise.all([getSiteSettings(), getPayload({ config })])

  let positions: { title: string; description: string }[] = []
  try {
    const result = await payload.find({ collection: "opportunities", sort: "order", limit: 20 })
    positions = result.docs as unknown as { title: string; description: string }[]
  } catch {
    // table not yet migrated — fall back to empty list
  }

  return (
    <section id="opportunities" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel>Join Us</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
              Opportunities
            </h2>
            <p data-reduced-text="" className="mt-4 font-body text-xl leading-9 text-dark-grey">
              {s.labName} is actively recruiting at all levels. We value
              curiosity, rigour, and the ability to build things that work.
            </p>
            <p data-reduced-text="" className="mt-3 font-body text-xl leading-9 text-dark-grey">
              To apply, send your CV and a brief note about your research
              interests to{" "}
              <a
                href={`mailto:${s.contactEmail}`}
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                {s.contactEmail}
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {positions.map((pos) => (
              <div
                key={pos.title}
                className="rounded-card bg-white p-6 ring-1 ring-ink/10"
              >
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {pos.title}
                </h3>
                <p data-reduced-text="" className="mt-2 font-body text-xl leading-9 text-dark-grey">
                  {pos.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
