import Image from "next/image"
import { getPayload } from "payload"
import config from "@payload-config"
import { SectionLabel } from "@/components/ui/section-label"

export async function Research() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "projects",
    sort: "order",
    limit: 20,
  })

  return (
    <section id="research" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Research</SectionLabel>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
          Active Projects
        </h2>
        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          Our work sits at the intersection of automation, AI, and chemistry,
          building the infrastructure for formulation discovery at scale.
        </p>

        {docs.length === 0 ? (
          <p className="mt-10 font-body text-xl text-grey">No projects yet.</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((project) => {
              const img =
                project.image && typeof project.image === "object"
                  ? (project.image as { url?: string; alt?: string })
                  : null
              const imgSrc = img?.url ?? null
              const alt = img?.alt ?? project.title

              return (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-card ring-1 ring-ink/10"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-light-grey md:aspect-video md:h-auto">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-light-grey" />
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-body text-sm font-medium text-accent">
                      {project.tag}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-semibold text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-2 font-body text-xl leading-9 text-dark-grey">
                      {project.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
