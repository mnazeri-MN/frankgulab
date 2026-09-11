export type LabPhoto = {
  url: string
  alt: string
  year: number
  caption?: string
}

export function LabPhotosCarousel({ photos }: { photos: LabPhoto[] }) {
  if (photos.length === 0) return null

  const sorted = [...photos].sort((a, b) => b.year - a.year)
  const [featured, ...older] = sorted

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-3">
        {/* Featured — most recent */}
        <PhotoCard photo={featured} size="large" />

        {/* Older photos in a row */}
        {older.length > 0 && (
          <div
            className={`grid gap-3 ${older.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {older.map((photo, i) => (
              <PhotoCard key={i} photo={photo} size="small" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function yearLabel(year: number) {
  return `${year}–${year + 1}`
}

function PhotoCard({ photo, size }: { photo: LabPhoto; size: "large" | "small" }) {
  return (
    <div className="relative overflow-hidden rounded-card">
      <div className={`relative ${size === "large" ? "aspect-[3/2] sm:aspect-[3/1]" : "aspect-[3/2] sm:aspect-[16/9]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
        <span
          className={`font-heading font-semibold text-white ${
            size === "large" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {yearLabel(photo.year)}
        </span>
        {photo.caption && (
          <p className="mt-0.5 font-body text-sm text-white/80">{photo.caption}</p>
        )}
      </div>
    </div>
  )
}
