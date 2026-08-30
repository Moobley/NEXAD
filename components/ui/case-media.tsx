import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type CaseMediaProps = {
  /** Editorial annotation shown under the plate. */
  label: string
  /** Placeholder hint, only shown while no real media is mounted. */
  note?: string
  tone?: "light" | "dark"
  className?: string
  children?: ReactNode
}

/**
 * Editorial media plate for the case study.
 *
 * Renders a bordered, art-directed plate with a small annotation below.
 * Pass `children` (e.g. a real <Image>, the CN logo, or a website capture)
 * to replace the placeholder surface without touching layout.
 */
export function CaseMedia({
  label,
  note,
  tone = "light",
  className,
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
          {note && (
            <p
              className={cn(
                "absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.28em]",
                dark ? "text-ivory/40" : "text-obsidian/40"
              )}
            >
              {note}
            </p>
          )}
        </>
      )}

      <figcaption
        className={cn(
          "absolute bottom-0 inset-x-0 flex items-end justify-between px-6 pb-5"
        )}
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