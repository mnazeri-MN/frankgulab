import type { Metadata } from "next"
import { Space_Grotesk, Instrument_Sans } from "next/font/google"
import "../globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
})

export const metadata: Metadata = {
  title: "The Mixture Lab — Frank Gu Lab, University of Toronto",
  description:
    "We build the labs that will discover tomorrow's formulations, today. Automation and AI-driven research at the University of Toronto.",
  icons: {
    icon: "/fgl-logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${instrumentSans.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
