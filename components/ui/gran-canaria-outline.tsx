import { cn } from "@/lib/utils"

type GranCanariaOutlineProps = {
  className?: string
}

/**
 * Minimal cartographic outline of Gran Canaria. Outline only — no fill,
 * no detail, no decoration. Rendered with `currentColor` so opacity and
 * tone are controlled by the consumer.
 */
export function GranCanariaOutline({ className }: GranCanariaOutlineProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      className={cn("w-auto", className)}
    >
      <path d="M100 14
        C 136 14 172 32 184 66
        C 192 88 190 102 182 108
        C 176 112 174 120 180 128
        C 186 136 182 148 172 158
        C 160 170 138 182 114 188
        C 90 194 64 190 46 172
        C 28 154 20 130 24 106
        C 28 82 44 60 66 44
        C 82 33 92 20 100 14 Z" />
    </svg>
  )
}