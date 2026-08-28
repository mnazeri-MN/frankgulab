"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"

export type PublicationItem = {
  title: string
  firstAuthor: string
  year: number
  href: string
  imageUrl: string | null
}

const VISIBLE = 3

function PubCard({ pub }: { pub: PublicationItem }) {
  return (
    <a
      href={pub.href || "#"}
      target={pub.href ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-light-grey">
        {pub.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pub.imageUrl}
            alt={pub.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-light-grey">
            <span className="font-body text-sm text-grey">No image</span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-body text-xl font-medium leading-8 text-ink">
            {pub.title}
          </p>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
        </div>
        <p className="mt-3 font-body text-xl text-grey">
          {pub.firstAuthor} · {pub.year}
        </p>
      </div>
    </a>
  )
}

export function PublicationsCarousel({ publications }: { publications: PublicationItem[] }) {
  const [start, setStart] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const max = Math.max(0, publications.length - VISIBLE)

  function advance() {
    setStart((s) => (s >= max ? 0 : s + 1))
  }

  function retreat() {
    setStart((s) => (s <= 0 ? max : s - 1))
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, 5000)
  }

  useEffect(() => {
    if (publications.length <= VISIBLE) return
    timerRef.current = setInterval(advance, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [publications.length])

  function handleDot(i: number) { setStart(i); resetTimer() }
  function handleArrow(dir: "prev" | "next") {
    dir === "next" ? advance() : retreat()
    resetTimer()
  }

  const visible = publications.slice(start, start + VISIBLE)

  return (
    <section id="publications" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Selected Works</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
              Publications
            </h2>
          </div>
          {publications.length > VISIBLE && (
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => handleArrow("prev")}
                aria-label="Previous publications"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleArrow("next")}
                aria-label="Next publications"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          Peer-reviewed research from the Mixture Lab. Click any card to view
          the full publication.
        </p>

        {publications.length === 0 ? (
          <p className="mt-10 font-body text-xl text-grey">No publications yet.</p>
        ) : (
          <>
            <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">
              {visible.map((pub, i) => <PubCard key={i} pub={pub} />)}
            </div>
            <div className="mt-10 md:hidden">
              <PubCard pub={publications[start] ?? publications[0]} />
            </div>
            {publications.length > VISIBLE && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: max + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    aria-label={`Go to publication ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === start ? "w-6 bg-ink" : "w-1.5 bg-light-grey"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
