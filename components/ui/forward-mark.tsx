import { cn } from "@/lib/utils"

type ForwardMarkProps = {
  className?: string
}

/**
 * The NEXAD Forward triangle — the internal `▶` cutout of the official
 * Forward D. Geometry normalized to a 24×24 viewBox from the official
 * wordmark subpath `M606 78 L630 90 L606 102 Z` (offset −606, −78).
 * Always decorative inside buttons/links: hidden from the accessibility tree.
 */
export function ForwardMark({ className }: ForwardMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("block", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0 L24 12 L0 24 Z" />
    </svg>
  )
}