import { SectionLabel } from "@/components/ui/section-label"

const positions = [
  {
    title: "PhD Students",
    description:
      "We are looking for motivated PhD candidates with backgrounds in chemical engineering, chemistry, materials science, or related fields. Experience with automation, programming, or machine learning is a plus.",
  },
  {
    title: "Postdoctoral Fellows",
    description:
      "Exceptional postdoctoral candidates with a strong publication record and interest in automated discovery are encouraged to reach out directly.",
  },
  {
    title: "Undergraduate Researchers",
    description:
      "Undergraduate students at the University of Toronto interested in gaining research experience are welcome to apply. Positions are available through USRA and direct arrangements.",
  },
]

export function Opportunities() {
  return (
    <section id="opportunities" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel>Join Us</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
              Opportunities
            </h2>
            <p className="mt-4 font-body text-xl leading-9 text-dark-grey">
              The Mixture Lab is actively recruiting at all levels. We value
              curiosity, rigour, and the ability to build things that work.
            </p>
            <p className="mt-3 font-body text-xl leading-9 text-dark-grey">
              To apply, send your CV and a brief note about your research
              interests to{" "}
              <a
                href="mailto:f.gu@utoronto.ca"
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                f.gu@utoronto.ca
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
                <p className="mt-2 font-body text-lg leading-8 text-dark-grey">
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
