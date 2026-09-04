export type LabPhoto = {
  url: string
  alt: string
  year: number
  caption?: string
}

export function LabPhotosCarousel({ photos }: { photos: LabPhoto[] }) {
  if (photos.length === 0) return null

  return (
    <div className="mt-14 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {photos.map((photo, i) => (
        <div
          key={i}
          className="relative w-[min(30rem,100vw-3rem)] shrink-0 overflow-hidden rounded-card snap-start lg:w-[42rem]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent px-4 py-3">
            <span className="font-heading text-xl font-semibold text-white">{photo.year}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
