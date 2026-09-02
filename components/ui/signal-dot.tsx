import { cn } from "@/lib/utils"

type SignalDotProps = {
  /** sm — inline metadata (5–6px); md — section/title marker (7–9px). */
  size?: "sm" | "md"
  className?: string
}

/**
 * NEXAD brand punctuation: a small static Signal dot used as an editorial
 * marker (important / active / point of focus). Always decorative and
 * STATIC on content pages — the pulse is reserved for the Gateway Forward
 * mark. Never used as a bullet list style.
 */
export function SignalDot({ size = "sm", className }: SignalDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 self-center rounded-full bg-signal",
        size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
        className
      )}
    />
  )
}