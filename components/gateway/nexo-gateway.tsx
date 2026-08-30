"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { GatewayLogo } from "@/components/gateway/gateway-logo"
import { GatewayNetwork } from "@/components/gateway/gateway-network"

const STORAGE_KEY = "nexo_gateway_seen"

const LANGUAGES = [
  { code: "es", href: "./es/", label: "Español" },
  { code: "en", href: "./en/", label: "English" },
  { code: "it", href: "./it/", label: "Italiano" },
]

function detectLanguage(): string {
  if (typeof navigator === "undefined") return "es"
  const list =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language]
  for (const lang of list) {
    const code = (lang || "").toLowerCase()
    if (code.startsWith("es")) return "es"
    if (code.startsWith("en")) return "en"
    if (code.startsWith("it")) return "it"
  }
  return "es"
}

function getSeen(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
  } catch {
    // storage unavailable — the gateway still works with the full intro
  }
}

export function NexoGateway() {
  const [variant, setVariant] = useState<"full" | "short">("full")
  const [suggested, setSuggested] = useState<string>("es")

  useEffect(() => {
    const init = () => {
      const seen = getSeen()
      setVariant(seen ? "short" : "full")
      setSuggested(detectLanguage())
      if (!seen) markSeen()
    }
    init()
  }, [])

  return (
    <main
      className={cn(
        "gateway",
        variant === "full" ? "gateway-intro" : "gateway-short"
      )}
    >
      <div aria-hidden className="gateway-grid absolute inset-0" />
      <div aria-hidden className="gateway-glow absolute inset-0" />
      <div aria-hidden className="noise absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col items-center justify-center px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] md:px-10">
        <div className="gateway-stage relative w-[82vw] lg:w-[54vw] xl:max-w-[52rem]">
          <GatewayNetwork className="gateway-network absolute inset-0 h-full w-full" />
          <GatewayLogo className="gateway-logo-in relative w-full" />
        </div>

        <p className="gateway-descriptor mt-10 max-w-xl text-center font-mono text-[11px] leading-relaxed tracking-[0.28em] text-ivory/55 md:mt-14 md:text-xs">
          STRATEGY · DESIGN · TECHNOLOGY
        </p>

        <nav
          aria-label="Select language"
          className="gateway-langs mt-8 flex items-center justify-center gap-9 md:mt-12 md:gap-14"
        >
          {LANGUAGES.map((lang) => {
            const isSuggested = suggested === lang.code
            return (
              <a
                key={lang.code}
                href={lang.href}
                aria-label={lang.label}
                className={cn(
                  "group relative px-1 py-3 font-sans text-3xl font-medium tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris md:text-4xl",
                  isSuggested
                    ? "text-ivory"
                    : "text-ivory/40 hover:text-ivory/80"
                )}
              >
                {lang.code.toUpperCase()}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-1 -bottom-0.5 h-px bg-iris transition-opacity duration-300",
                    isSuggested
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50"
                  )}
                />
              </a>
            )
          })}
        </nav>
      </div>
    </main>
  )
}