"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail, BookOpen, Linkedin, X } from "lucide-react"

export type Person = {
  displayName: string
  role: string
  photo?: string
  email?: string
  scholar?: string
  linkedin?: string
  lastInitial: string
  bio?: string
}

function PersonCard({ person, interactive = false, bare = false }: { person: Person; interactive?: boolean; bare?: boolean }) {
  return (
    <div className={`h-full flex flex-col ${bare ? "p-0" : `rounded-card bg-white p-5 ring-1 transition-all ${interactive ? "ring-ink/10 hover:ring-ink/25 hover:shadow-md hover:bg-warm-white" : "ring-ink/10"}`}`}>
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-inner bg-light-grey">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.displayName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-3xl font-semibold text-grey">
              {person.displayName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-heading text-xl font-semibold text-ink">
        {person.displayName}
      </h3>
      <p className="mt-0.5 font-body text-base text-dark-grey">{person.role}</p>
      {(person.email || person.scholar || person.linkedin) && (
        <div className="mt-auto pt-3 flex items-center gap-3">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="text-grey transition-colors hover:text-ink"
              aria-label="Email"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {person.scholar && (
            <a
              href={person.scholar}
              className="text-grey transition-colors hover:text-ink"
              aria-label="Google Scholar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              className="text-grey transition-colors hover:text-ink"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function PersonModal({ person, onClose }: { person: Person; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink/60"
      onClick={onClose}
    >
      {/* No bg-white on container — lets each panel sit directly over the backdrop so glass blur works */}
      <div
        className="relative flex flex-col md:flex-row w-full max-w-2xl overflow-hidden rounded-card shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-grey transition-colors hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: glass panel matching navbar, card floats inside */}
        <div className="bg-warm-white/90 backdrop-blur-md md:w-56 md:shrink-0 p-5 border-b border-white/30 md:border-b-0 md:border-r">
          <PersonCard person={person} bare />
        </div>

        {/* Right: bio */}
        <div className="bg-white flex-1 overflow-y-auto p-8 flex flex-col justify-center">
          <p className="font-body text-base leading-relaxed text-dark-grey whitespace-pre-line">
            {person.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export function PeopleGrid({ people }: { people: Person[] }) {
  const [selected, setSelected] = useState<Person | null>(null)

  return (
    <>
      <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {people.map((person, i) => (
          <div
            key={i}
            onClick={() => person.bio ? setSelected(person) : undefined}
            className={person.bio ? "cursor-pointer" : undefined}
          >
            <PersonCard person={person} interactive={!!person.bio} />
          </div>
        ))}
      </div>

      {selected && (
        <PersonModal person={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
