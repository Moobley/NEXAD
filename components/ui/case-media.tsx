import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type CaseMediaProps = {
  /** Editorial annotation shown under the plate. */
  label: string
  tone?: "light" | "dark"
  className?: string
  /** Big typographic word rendered inside the editorial surface. */
  watermark?: string
  /** Real media (e.g. an <Image>) replaces the decorative surface entirely. */
  children?: ReactNode
}

/**
 * Editorial media plate for projects.
 *
 * Renders a bordered, art-directed surface (gradient, grain, registration
 * marks, optional typographic watermark) with an annotation below. Pass
 * `children` — e.g. a real <Image> — to swap in real media without touching
 * layout.
 */
export function CaseMedia({
  label,
  tone = "light",
  className,
  watermark,
  children,
}: CaseMediaProps) {
  const dark = tone === "dark"

  return (
    <figure
      className={cn(
        "relative overflow-hidden border",
        dark ? "border-ivory/10" : "border-obsidian/15",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: dark
                ? "radial-gradient(120% 120% at 70% 20%, #16161a 0%, #0b0b0d 60%)"
                : "radial-gradient(130% 130% at 70% 15%, #e7e3d6 0%, #f2efe8 48%, #d8d2c3 100%)",
            }}
          />
          <div aria-hidden className="noise absolute inset-0 opacity-40" />
          <div
            aria-hidden
            className="absolute left-6 top-6 h-8 w-px bg-current opacity-25"
          />
          <div
            aria-hidden
            className="absolute bottom-6 left-6 h-px w-8 bg-current opacity-25"
          />
          {watermark && (
            <p
              aria-hidden
              className={cn(
                "absolute inset-0 flex items-center justify-center p-6 text-center font-sans text-2xl font-medium tracking-tight md:text-4xl",
                dark ? "text-ivory/50" : "text-obsidian/45"
              )}
            >
              {watermark}
            </p>
          )}
        </>
      )}

      <figcaption
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-5"
      >
        <p
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.3em]",
            dark ? "text-ivory/70" : "text-obsidian/60"
          )}
        >
          {label}
        </p>
        <span
          aria-hidden
          className={cn(
            "mb-1 h-px w-8",
            dark ? "bg-ivory/30" : "bg-obsidian/30"
          )}
        />
      </figcaption>
    </figure>
  )
}