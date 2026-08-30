import { ArrowDown, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type FlowProps = {
  steps: string[]
  /** Surface the flow sits on, to pick a legible node border and arrow. */
  surface?: "light" | "dark"
  className?: string
}

/**
 * Editorial system flow: nodes connected by arrows. Horizontal on desktop
 * (with wrap, arrows glued to the following node), vertical on mobile.
 */
export function Flow({ steps, surface = "light", className }: FlowProps) {
  const dark = surface === "dark"

  return (
    <ol
      className={cn(
        "flex flex-col lg:flex-row lg:flex-wrap lg:gap-y-4",
        className
      )}
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-x-2">
          {i > 0 && (
            <ArrowDown
              aria-hidden
              className={cn(
                "size-4 shrink-0 self-center lg:hidden",
                dark ? "text-ivory/40" : "text-muted-foreground"
              )}
              strokeWidth={1.5}
            />
          )}
          {i > 0 && (
            <ArrowRight
              aria-hidden
              className={cn(
                "hidden size-4 shrink-0 self-center lg:inline",
                dark ? "text-ivory/40" : "text-muted-foreground"
              )}
              strokeWidth={1.5}
            />
          )}
          <span
            className={cn(
              "inline-flex border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground",
              dark ? "border-ivory/15" : "border-obsidian/15"
            )}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}