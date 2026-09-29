import type { Metadata } from "next"
import { Space_Grotesk, Instrument_Sans } from "next/font/google"
import { getSiteSettings } from "@/lib/site-settings"
import "../globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
})

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  const title = `${s.labName} | ${s.piName} Lab, ${s.institution}`
  const description = `${s.missionStatement} ${s.heroSubtitle}`
  return {
    title,
    description,
    icons: { icon: "/fgl-logo.svg" },
    openGraph: {
      title,
      description,
      siteName: s.labName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${instrumentSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
