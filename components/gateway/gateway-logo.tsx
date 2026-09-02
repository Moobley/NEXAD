import { cn } from "@/lib/utils"

/**
 * NEXAD wordmark as inline SVG, faithful to `public/logos/nexad-wordmark-*.svg`.
 *
 * Motion structure (Signal → Forward):
 * - `gateway-nexa`   — N E X A, revealed as one group after the D travels.
 * - `gateway-d-group`— the complete D (ring + Forward mark) as one object so
 *   it can open centered in Signal, then move to its final right-hand slot.
 * - `gateway-forward`— the `▶` cutout; keeps its Signal fill and receives the
 *   idle pulse after the intro.
 *
 * At rest (no animation) the geometry is pixel-identical to the official
 * wordmark, except the Forward cutout is intentionally Signal (the brand's
 * approved interactive detail).
 */
export function GatewayLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 810 180"
      className={cn("gateway-wordmark block h-auto", className)}
      role="img"
      aria-label="NEXAD"
    >
      {/* N E X A — revealed as one word group */}
      <g className="gateway-nexa" fill="currentColor">
        <path d="M55 42h18v96H55z" />
        <path d="M121 42h18v96h-18z" />
        <path d="M64 42h21l45 96h-21z" />
        <path d="M205 42h18v96h-18z" />
        <path d="M205 42h64v16h-64z" />
        <path d="M205 82h54v16h-54z" />
        <path d="M205 122h64v16h-64z" />
        <path d="M334 42h21l62 96h-21z" />
        <path d="M396 42h21l-62 96h-21z" />
        <path d="M465 138 L497 42 H517 L549 138 H529 L507 63 L485 138 Z" />
        <path d="M482 101 H532 V117 H482 Z" />
      </g>

      {/* The complete D — ring + Forward mark move and color together */}
      <g className="gateway-d-group">
        <path
          className="gateway-d-ring"
          fillRule="evenodd"
          d="
            M597 42 H692
            C726 42 747 61 747 90
            C747 119 726 138 692 138
            H597 Z

            M616 59 H689
            C713 59 728 70 728 90
            C728 110 713 121 689 121
            H616 Z
          "
        />
        <path className="gateway-forward" d="M606 78 L630 90 L606 102 Z" />
      </g>

      {/* Occasional faint Signal ring expanding around the Forward mark */}
      <circle
        className="gateway-launch-ring"
        cx="618"
        cy="90"
        r="11"
        fill="none"
        strokeWidth="1"
      />
    </svg>
  )
}