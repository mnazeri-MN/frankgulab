"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import type { SiteSettingsData } from "@/lib/site-settings"

const links = [
  { href: "#research", label: "Research" },
  { href: "#people", label: "People" },
  { href: "#publications", label: "Publications" },
  { href: "#news", label: "News" },
  { href: "#blog", label: "Blog" },
  { href: "#opportunities", label: "Opportunities" },
  { href: "#contact", label: "Contact" },
]

export function NavbarInner({ s }: { s: Pick<SiteSettingsData, "logoUrl" | "labName" | "piName" | "institution"> }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const prefix = isHome ? "" : "/"

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-warm-white/90 backdrop-blur">
      <nav data-reduced-nav="" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <a href={isHome ? "#" : "/"} className="flex items-center gap-3">
          <img src={s.logoUrl ?? "/fgl-logo.svg"} alt={`${s.labName} logo`} className="h-9 w-auto" />
          <div className="flex flex-col leading-tight md:hidden lg:flex">
            <span data-reduced-text="" className="font-heading text-xl font-semibold text-ink">
              {s.labName}
            </span>
            <span data-reduced-text="" className="font-body text-xl text-dark-grey min-[1152px]:hidden">
              {s.piName}
            </span>
            <span data-reduced-text="" className="hidden font-body text-xl text-dark-grey min-[1152px]:block">
              {s.piName} · {s.institution}
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={prefix + link.href}
              data-reduced-text=""
              className="font-body text-xl text-dark-grey transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={prefix + link.href}
                className="font-heading text-2xl font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
