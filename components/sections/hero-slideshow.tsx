"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export type HeroSlide = {
  name: string
  tagline: string
  imageUrl: string
  imageAlt: string
}

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[2/1] overflow-hidden rounded-card bg-light-grey lg:aspect-[4/3]">
        {slides.map((s, i) => (
          <div
            key={s.name}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.imageUrl}
              alt={s.imageAlt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
              <p className="font-heading text-xl font-semibold text-white">{s.name}</p>
              <p className="mt-0.5 font-body text-xl text-white/70">{s.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-ink" : "w-1.5 bg-light-grey"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
