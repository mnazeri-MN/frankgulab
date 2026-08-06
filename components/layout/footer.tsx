import { Linkedin, GraduationCap } from "lucide-react"

const navLinks = ["Research", "People", "Publications", "News", "Opportunities", "Contact"]

const institutionalLinks = [
  { label: "University of Toronto", href: "https://www.utoronto.ca" },
  {
    label: "Chemical Engineering & Applied Chemistry",
    href: "https://www.chem-eng.utoronto.ca",
  },
  {
    label: "Acceleration Consortium",
    href: "https://acceleration.utoronto.ca",
  },
]

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/fgl-logo.svg" alt="The Mixture Lab logo" className="h-9 w-auto brightness-0 invert opacity-90" />
              <p className="font-heading text-lg font-semibold text-white">
                The Mixture Lab
              </p>
            </div>
            <p className="mt-2 font-body text-base text-white/50">
              Frank Gu · University of Toronto
            </p>
            <p className="mt-1 font-body text-base text-white/40">
              Department of Chemical Engineering
              <br />
              and Applied Chemistry
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://linkedin.com/company/frank-gu-lab"
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://scholar.google.co.in/citations?user=nZYyToUAAAAJ&hl=en"
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
                className="font-body text-base text-white/50 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Institutional links */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-base font-semibold uppercase tracking-[0.1em] text-white/30">
              Affiliated With
            </p>
            {institutionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-base text-white/30">
            Funded by NSERC and CIHR.
          </p>
          <p className="font-body text-base text-white/30">
            © {new Date().getFullYear()} The Mixture Lab. University of Toronto.
          </p>
        </div>
      </div>
    </footer>
  )
}
