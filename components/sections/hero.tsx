import { getPayload } from "payload"
import config from "@payload-config"
import { HeroSlideshow } from "./hero-slideshow"
import type { HeroSlide } from "./hero-slideshow"

export async function Hero() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "hero-slides",
    sort: "order",
    limit: 20,
  })

  const slides: HeroSlide[] = docs
    .filter((doc) => doc.image && typeof doc.image === "object")
    .map((doc) => {
      const img = doc.image as { url?: string; alt?: string }
      return {
        name: doc.name,
        tagline: doc.tagline,
        imageUrl: img.url ?? "",
        imageAlt: img.alt ?? doc.name,
      }
    })

  return (
    <section className="bg-warm-white px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              University of Toronto
            </p>
            <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
              The Mixture Lab
            </h1>
            <p className="mt-6 max-w-xl font-body text-xl leading-9 text-dark-grey">
              We build the labs that will discover tomorrow&apos;s formulations,
              today.
            </p>
            <p className="mt-4 max-w-lg font-body text-lg leading-8 text-grey">
              Automation, robotics, and machine learning applied to formulation
              science, electrochemistry, and advanced materials research.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#research"
                className="inline-flex h-11 items-center rounded-full bg-ink px-6 font-body text-base font-medium text-white transition-opacity hover:opacity-80"
              >
                View Research
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-full border border-ink/20 px-6 font-body text-base font-medium text-ink transition-colors hover:border-ink/40"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <HeroSlideshow slides={slides} />
        </div>
      </div>
    </section>
  )
}
