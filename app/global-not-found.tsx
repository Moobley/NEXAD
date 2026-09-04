import type { Metadata } from "next"
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google"

import { GatewayLogo } from "@/components/gateway/gateway-logo"
import { ForwardMark } from "@/components/ui/forward-mark"
import { cn } from "@/lib/utils"

import "./globals.css"

const grotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

const LOCALES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
]

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const metadata: Metadata = {
  title: "404 — NEXAD",
  description: "The page you are looking for does not exist.",
}

export default function GlobalNotFound() {
  const base = BASE_PATH.replace(/\/+$/, "")

  return (
    <html
      lang="en"
      className={cn("font-sans", grotesk.variable, plexMono.variable)}
    >
      <body className="min-h-svh bg-obsidian text-ivory antialiased">
        <main className="relative flex min-h-svh flex-col overflow-hidden">
          <div aria-hidden className="gateway-grid absolute inset-0" />
          <div aria-hidden className="gateway-glow absolute inset-0" />
          <div aria-hidden className="noise absolute inset-0 opacity-[0.04]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-center px-6 py-24 text-center md:px-10">
            <div className="w-[min(82vw,30rem)]">
              <GatewayLogo className="text-ivory" />
            </div>

            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/55">
              404
            </p>

            <h1 className="mt-4 max-w-2xl font-sans text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              The page you are looking for does not exist.
            </h1>

            <nav
              aria-label="Select language"
              className="mt-12 flex items-center justify-center gap-9 md:gap-14"
            >
              {LOCALES.map((lang) => (
                <a
                  key={lang.code}
                  href={`${base}/${lang.code}/`}
                  aria-label={lang.label}
                  className="group relative px-1 py-3 font-sans text-3xl font-medium tracking-tight text-ivory/40 transition-colors duration-300 hover:text-ivory/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal md:text-4xl"
                >
                  {lang.code.toUpperCase()}
                  <span
                    aria-hidden
                    className="absolute inset-x-1 -bottom-0.5 h-px bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                  />
                </a>
              ))}
            </nav>

            <a href={`${base}/`} className="menu-cta mt-16">
              NEXAD home
              <ForwardMark className="cta-forward" />
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}