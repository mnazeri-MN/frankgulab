"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { href: "#research", label: "Research" },
  { href: "#people", label: "People" },
  { href: "#publications", label: "Publications" },
  { href: "#news", label: "News" },
  { href: "#opportunities", label: "Opportunities" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-warm-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <a href="#" className="flex items-center gap-3">
          <img src="/fgl-logo.svg" alt="The Mixture Lab logo" className="h-9 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-base font-semibold text-ink">
              The Mixture Lab
            </span>
            <span className="font-body text-base text-dark-grey">
              Frank Gu · University of Toronto
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-base text-dark-grey transition-colors hover:text-ink"
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
                href={link.href}
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
