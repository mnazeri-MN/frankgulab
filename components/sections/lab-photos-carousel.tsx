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
      <div className="mt-5 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] w-72 shrink-0 overflow-hidden rounded-card snap-start lg:w-96"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent px-4 py-3">
              <span className="font-heading text-xl font-semibold text-white">{photo.year}</span>
              {photo.caption && (
                <p className="font-body text-base text-white/70">{photo.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
