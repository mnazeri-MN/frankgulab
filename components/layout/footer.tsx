import { Linkedin, GraduationCap } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings"

const navLinks = ["Research", "People", "Publications", "News", "Opportunities", "Contact"]

export async function Footer() {
  const s = await getSiteSettings()

  return (
    <footer className="bg-ink px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={s.logoUrl ?? "/fgl-logo.svg"}
                alt={`${s.labName} logo`}
                className="h-9 w-auto brightness-0 invert opacity-90"
              />
              <p className="font-heading text-xl font-semibold text-white">
                {s.labName}
              </p>
            </div>
            <p data-reduced-text="" className="mt-2 font-body text-xl text-white/50">
              {s.piName} · {s.institution}
            </p>
            <p data-reduced-text="" className="mt-1 font-body text-xl text-white/40">
              {s.department}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={s.linkedIn}
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={s.googleScholar}
                aria-label="Google Scholar"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Site nav */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-base font-semibold uppercase tracking-[0.1em] text-white/30">
              Navigate
            </p>
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                data-reduced-text=""
                className="font-body text-xl text-white/50 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Affiliated with */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-base font-semibold uppercase tracking-[0.1em] text-white/30">
              Affiliated With
            </p>
            {s.affiliates.map((affiliate) => (
              <a
                key={affiliate.name}
                href={affiliate.url}
                target="_blank"
                rel="noopener noreferrer"
                data-reduced-text=""
                className="font-body text-xl text-white/50 transition-colors hover:text-white"
              >
                {affiliate.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p data-reduced-text="" className="font-body text-xl text-white/30">
            {s.footerTagline}
          </p>
          <p data-reduced-text="" className="font-body text-xl text-white/30">
            © {new Date().getFullYear()} {s.labName}. {s.institution}.
          </p>
        </div>
      </div>
    </footer>
  )
}
