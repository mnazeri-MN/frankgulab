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
  return {
    title: `${s.labName} | ${s.piName} Lab, ${s.institution}`,
    description: `${s.missionStatement} ${s.heroSubtitle}`,
    icons: { icon: "/fgl-logo.svg" },
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
