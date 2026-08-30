import type { Metadata } from "next"
import { Familjen_Grotesk, Geist_Mono, Instrument_Serif } from "next/font/google"

import { cn } from "@/lib/utils"

import "../globals.css"

const grotesk = Familjen_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-grotesk",
  display: "swap",
})

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NEXO — Digital Studio",
  description:
    "Estrategia, marketing, contenido y tecnología trabajando como un único sistema.",
}

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn(
        "font-sans",
        grotesk.variable,
        instrument.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-svh bg-obsidian text-ivory antialiased">{children}</body>
    </html>
  )
}