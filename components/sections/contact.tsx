import Image from "next/image"
import { Mail, MapPin } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings"
import { SectionLabel } from "@/components/ui/section-label"

export async function Contact() {
  const s = await getSiteSettings()

  const photoUrl = s.contactPhotoUrl ?? "/images/electrolyzer-team.jpg"
  const photoAlt = s.contactPhotoAlt ?? `${s.labName} team`

  return (
    <section id="contact" className="bg-ink px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel light>Contact</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-md font-body text-xl leading-9 text-white/60">
              Whether you&apos;re a prospective student, collaborator, or
              industry partner — we&apos;d love to hear from you.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner bg-white/10">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.1em] text-white/40">
                    Email
                  </p>
                  <a
                    href={`mailto:${s.contactEmail}`}
                    className="mt-1 font-body text-lg text-white transition-opacity hover:opacity-70"
                  >
                    {s.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner bg-white/10">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.1em] text-white/40">
                    Location
                  </p>
                  <p className="mt-1 font-body text-lg text-white">
                    {s.department}
                    <br />
                    {s.institution}
                    <br />
                    {s.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-card">
            <Image
              src={photoUrl}
              alt={photoAlt}
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
