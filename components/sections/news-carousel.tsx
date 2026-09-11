"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Linkedin } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"

export type NewsItem = {
  title: string
  source: string
  date: string
  url: string
  imageUrl: string | null
  summary?: string | null
}

// ─── Variant A: current (image + title left, summary right) ──────────────────

function NewsCardA({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md md:flex"
    >
      <div className="flex flex-col md:w-1/2">
        <div className="relative aspect-video w-full overflow-hidden bg-light-grey md:flex-1 md:aspect-auto">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-light-grey" />
          )}
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-base text-grey">{item.source} · {item.date}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-t border-ink/10 p-4 md:w-1/2 md:border-l md:border-t-0 md:p-5">
        <div>
          {item.summary ? (
            <p data-reduced-text="" className="font-body text-xl leading-9 text-dark-grey">{item.summary}</p>
          ) : (
            <p className="font-body text-xl italic text-grey/50">No summary yet.</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Share on LinkedIn"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            Share
          </a>
        </div>
      </div>
    </a>
  )
}

// ─── Variant B: image top-left, title top-right, summary bottom ───────────────

function NewsCardB({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="flex">
        <div className="relative w-2/3 shrink-0 overflow-hidden bg-light-grey" style={{ aspectRatio: "1/1" }}>
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          ) : (
            <div className="h-full w-full bg-light-grey" />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-3 font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="mt-2 font-body text-xl text-grey">{item.source} · {item.date}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between border-t border-ink/10 p-4 md:p-5">
        <div>
          {item.summary ? (
            <p data-reduced-text="" className="font-body text-xl leading-9 text-dark-grey">{item.summary}</p>
          ) : (
            <p className="font-body text-xl italic text-grey/50">No summary yet.</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Share on LinkedIn"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            Share
          </a>
        </div>
      </div>
    </a>
  )
}

// ─── Variant C: full-width image top half, title cut-out overlay, summary bottom

function NewsCardC({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-light-grey">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full bg-light-grey" />
        )}
        <div className="absolute right-3 top-3 flex max-w-[60%] flex-col gap-1 rounded-lg bg-white/95 p-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-3 font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
          </div>
          <p className="font-body text-base text-grey">{item.source} · {item.date}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between p-4 md:p-5">
        <div>
          {item.summary ? (
            <p data-reduced-text="" className="font-body text-xl leading-9 text-dark-grey">{item.summary}</p>
          ) : (
            <p className="font-body text-xl italic text-grey/50">No summary yet.</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Share on LinkedIn"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            Share
          </a>
        </div>
      </div>
    </a>
  )
}

// ─── Variant D: full-width cropped image, title below, truncated summary, bottom bar ─

function truncateWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= max) return text
  return words.slice(0, max).join(" ") + "…"
}

function NewsCardD({ item }: { item: NewsItem }) {
  const summary = item.summary ? truncateWords(item.summary, 30) : null
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden bg-light-grey">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full bg-light-grey" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
        </div>
        {summary && (
          <p data-reduced-text="" className="mt-3 font-body text-xl leading-9 text-dark-grey">{summary}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="font-body text-base text-grey">{item.source} · {item.date}</p>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Share on LinkedIn"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            Share
          </a>
        </div>
      </div>
    </a>
  )
}

// ─── Variant E: title + summary top, image bottom ────────────────────────────

function NewsCardE({ item }: { item: NewsItem }) {
  const summary = item.summary ? truncateWords(item.summary, 30) : null
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
        </div>
        {summary && (
          <p data-reduced-text="" className="mt-3 font-body text-xl leading-9 text-dark-grey">{summary}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="font-body text-base text-grey">{item.source} · {item.date}</p>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Share on LinkedIn"
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-body text-base text-grey transition-colors hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            Share
          </a>
        </div>
      </div>
      <div className="relative h-48 w-full overflow-hidden bg-light-grey">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full bg-light-grey" />
        )}
      </div>
    </a>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

const VISIBLE = 2

export function NewsCarousel({ items, cardVariant = "a", cardLayout = "carousel" }: { items: NewsItem[]; cardVariant?: "a" | "b" | "c" | "d" | "e"; cardLayout?: "carousel" | "grid3" }) {
  const [start, setStart] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const max = Math.max(0, items.length - VISIBLE)

  function advance() { setStart((s) => (s >= max ? 0 : s + 1)) }
  function retreat() { setStart((s) => (s <= 0 ? max : s - 1)) }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, 5000)
  }

  useEffect(() => {
    if (items.length <= VISIBLE) return
    timerRef.current = setInterval(advance, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [items.length])

  function handleDot(i: number) { setStart(i); resetTimer() }
  function handleArrow(dir: "prev" | "next") {
    dir === "next" ? advance() : retreat()
    resetTimer()
  }

  const [cols, setCols] = useState(3)
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setCols(1)
      else if (window.innerWidth < 1024) setCols(2)
      else setCols(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent, step: number) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null
    if (Math.abs(diff) < 50) return
    if (diff > 0) setStart((s) => Math.min(s + step, max))
    else setStart((s) => Math.max(s - step, 0))
    resetTimer()
  }

  const visible = items.slice(start, start + VISIBLE)
  const NewsCard = cardVariant === "e" ? NewsCardE : cardVariant === "d" ? NewsCardD : cardVariant === "c" ? NewsCardC : cardVariant === "b" ? NewsCardB : NewsCardA

  const max3 = Math.max(0, items.length - cols)
  const start3 = Math.min(start, max3)
  const visible3 = items.slice(start3, start3 + cols)

  if (cardLayout === "grid3") {
    return (
      <section id="news" className="bg-warm-white px-6 py-section lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <SectionLabel>Press &amp; Updates</SectionLabel>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
                News
              </h2>
            </div>
            {items.length > cols && (
              <div className="hidden items-center gap-2 md:flex">
                <button onClick={() => { setStart((s) => Math.max(0, s - cols)); resetTimer() }} aria-label="Previous news" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => { setStart((s) => (s + cols > max3 ? 0 : s + cols)); resetTimer() }} aria-label="Next news" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
            Lab updates, press coverage, and recent highlights from the Mixture Lab.
          </p>
          {items.length === 0 ? (
            <p className="mt-10 font-body text-xl text-grey">No news yet.</p>
          ) : (
            <>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" onTouchStart={onTouchStart} onTouchEnd={(e) => onTouchEnd(e, 1)}>
                {visible3.map((item, i) => <NewsCard key={i} item={item} />)}
              </div>
              {items.length > cols && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  {Array.from({ length: max3 + 1 }).map((_, i) => (
                    <button key={i} onClick={() => { setStart(i); resetTimer() }} aria-label={`Position ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${start3 === i ? "w-6 bg-ink" : "w-1.5 bg-light-grey"}`} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="bg-warm-white px-6 py-section lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Press &amp; Updates</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
              News
            </h2>
          </div>
          {items.length > VISIBLE && (
            <div className="hidden items-center gap-2 md:flex">
              <button onClick={() => handleArrow("prev")} aria-label="Previous news" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => handleArrow("next")} aria-label="Next news" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          Lab updates, press coverage, and recent highlights from the Mixture Lab.
        </p>

        {items.length === 0 ? (
          <p className="mt-10 font-body text-xl text-grey">No news yet.</p>
        ) : (
          <>
            <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2" onTouchStart={onTouchStart} onTouchEnd={(e) => onTouchEnd(e, 1)}>
              {visible.map((item, i) => <NewsCard key={i} item={item} />)}
            </div>
            <div className="mt-10 md:hidden" onTouchStart={onTouchStart} onTouchEnd={(e) => onTouchEnd(e, 1)}>
              <NewsCard item={items[start] ?? items[0]} />
            </div>
            {items.length > VISIBLE && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: max + 1 }).map((_, i) => (
                  <button key={i} onClick={() => handleDot(i)} aria-label={`Go to news item ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === start ? "w-6 bg-ink" : "w-1.5 bg-light-grey"}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
