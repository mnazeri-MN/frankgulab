"use client"

import { useEffect, useState } from "react"

type Theme = "warm" | "light" | "dark"

const themes: { id: Theme; label: string }[] = [
  { id: "warm", label: "Warm" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
]

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("warm")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-lg backdrop-blur">
      <span className="px-2 font-body text-xs text-dark-grey">Theme</span>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`rounded-full px-3 py-1.5 font-body text-xs font-medium transition-colors ${
            theme === t.id
              ? "bg-ink text-white"
              : "text-dark-grey hover:text-ink"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
