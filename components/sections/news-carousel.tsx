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

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-md"
    >
      <div className="flex max-h-[calc(55vh-12rem)] flex-col overflow-hidden p-4 md:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-body text-xl font-medium leading-8 text-ink">{item.title}</p>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover:text-ink" />
        </div>
        {item.summary && (
          <p className="mt-3 line-clamp-3 font-body text-base leading-7 text-dark-grey">{item.summary}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="font-body text-sm text-grey">{item.source} · {item.date}</p>
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
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-light-grey">
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

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const [start, setStart] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)

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

  const max3 = Math.max(0, items.length - cols)
  const start3 = Math.min(start, max3)
  const visible3 = items.slice(start3, start3 + cols)

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setStart((s) => (s >= max3 ? 0 : s + 1)), 5000)
  }

  useEffect(() => {
    if (items.length <= cols) return
    timerRef.current = setInterval(() => setStart((s) => (s >= max3 ? 0 : s + 1)), 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [items.length, cols, max3])

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null
    if (Math.abs(diff) < 50) return
    if (diff > 0) setStart((s) => (s >= max3 ? 0 : s + 1))
    else setStart((s) => (s <= 0 ? max3 : s - 1))
    resetTimer()
  }

  return (
    <section id="news" className="bg-warm-white px-6 py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionLabel>Press &amp; Updates</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
            News
          </h2>
        </div>
        <p className="mt-4 max-w-2xl font-body text-xl leading-9 text-dark-grey">
          Lab updates, press coverage, and recent highlights from the Mixture Lab.
        </p>
        {items.length === 0 ? (
          <p className="mt-10 font-body text-xl text-grey">No news yet.</p>
        ) : (
          <>
            <div className="mt-10 hidden items-center gap-3 md:flex">
              {items.length > cols && (
                <button onClick={() => { setStart((s) => (s <= 0 ? max3 : s - 1)); resetTimer() }} aria-label="Previous news" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {visible3.map((item, i) => <NewsCard key={i} item={item} />)}
              </div>
              {items.length > cols && (
                <button onClick={() => { setStart((s) => (s >= max3 ? 0 : s + 1)); resetTimer() }} aria-label="Next news" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/40">
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
