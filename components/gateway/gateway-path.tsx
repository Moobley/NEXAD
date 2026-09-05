import { cn } from "@/lib/utils"

/**
 * NEXAD Path — the gateway's quiet, identity-bearing background.
 *
 * A near-black surface carries a sparse network of thin geometric lines
 * inspired by the logo's own angles (right angles, the "A" diagonals and the
 * Forward chevron). The horizontal centerline is the path the D travels
 * during the intro: a single signal pulse occasionally runs along it left →
 * right and then disappears, a natural continuation of the wordmark's motion.
 *
 * Fully decorative:
 * - clipped to its container (`overflow-hidden` + `slice` viewBox) so it can
 *   never change scrollWidth/scrollHeight;
 * - no fullscreen scale/transform, no glow wash, no particle field, no grid;
 * - white/ivory lines at very low opacity; brand signal reserved for the pulse.
 */
export function GatewayPath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn("gateway-path block h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Static hairline network — inspired by the logo's angles. */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="gateway-path-lines"
      >
        {/* The D's trajectory baseline, spanning the full width. */}
        <line x1="80" y1="450" x2="1520" y2="450" strokeOpacity="0.1" />
        {/* Right angle (echoes the N/E/X/A upright strokes). */}
        <path d="M120 130 L120 250 L240 250" strokeOpacity="0.07" />
        {/* A-diagonal, top right. */}
        <line x1="1360" y1="150" x2="1460" y2="250" strokeOpacity="0.07" />
        {/* Forward chevron, bottom right. */}
        <path d="M1480 620 L1420 680 L1552 680" strokeOpacity="0.07" />
        {/* A-diagonal, bottom left. */}
        <line x1="140" y1="660" x2="260" y2="760" strokeOpacity="0.07" />
      </g>

      {/* A few nodes at line ends and junctions. */}
      <g fill="currentColor" className="gateway-path-nodes" fillOpacity="0.16">
        <circle cx="240" cy="250" r="3" />
        <circle cx="1460" cy="250" r="3" />
        <circle cx="1552" cy="680" r="3" />
        <circle cx="260" cy="760" r="3" />
        <circle cx="300" cy="450" r="3" />
        <circle cx="1300" cy="450" r="3" />
      </g>

      {/* Occasional signal impulse — travels the trajectory line, then fades. */}
      <path
        pathLength="100"
        className="gateway-pulse"
        d="M80 450 H1520"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
