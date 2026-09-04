export type LabPhoto = {
  url: string
  alt: string
  year: number
  caption?: string
}

export function LabPhotosCarousel({ photos }: { photos: LabPhoto[] }) {
  if (photos.length === 0) return null

  return (
    <div className="mt-14">
      <h3 className="font-heading text-2xl font-semibold text-ink">Lab Photos</h3>
      <div className="mt-5 flex overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-video w-full shrink-0 overflow-hidden rounded-card snap-start bg-light-grey"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt}
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent px-4 py-3">
              <span className="font-heading text-xl font-semibold text-white">{photo.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
