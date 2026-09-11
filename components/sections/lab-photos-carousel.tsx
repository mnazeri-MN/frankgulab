export type LabPhoto = {
  url: string
  alt: string
  year: number
  caption?: string
}

export function LabPhotosCarousel({ photos }: { photos: LabPhoto[] }) {
  if (photos.length === 0) return null

  // Duplicate for seamless infinite loop
  const doubled = [...photos, ...photos]
  const duration = photos.length * 7

  return (
    <div className="mt-14 overflow-hidden">
      <style>{`
        @keyframes lab-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .lab-scroll-track {
          animation: lab-scroll ${duration}s linear infinite;
        }
        .lab-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="lab-scroll-track flex gap-4" style={{ width: "max-content" }}>
        {doubled.map((photo, i) => (
          <div
            key={i}
            className="relative w-[min(30rem,100vw-3rem)] shrink-0 overflow-hidden rounded-card lg:w-[42rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt={photo.alt} className="w-full h-auto" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent px-4 py-3">
              <span className="font-heading text-xl font-semibold text-white">{photo.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
