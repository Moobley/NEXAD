import { cn } from "@/lib/utils"

interface AuroraBackgroundProps {
  className?: string
  /** Base canvas colour. Defaults to the page's own ivory background token. */
  baseColor?: string
  /**
   * Layer opacity variant. One visual family, quieter on internal pages:
   * `full` (default, homepage), `soft` (Services/Studio), `quiet` (Work/Contact).
   */
  intensity?: "full" | "soft" | "quiet"
}

/**
 * Soft, light aurora background: large pastel washes of light slowly crossing
 * the page's ivory canvas.
 *
 * Performance model:
 * - Exactly TWO DOM layers, each a single node whose `background` holds two
 *   `radial-gradient()` sources. Softness comes from the gradient color stops
 *   (fading to transparent) — there is NO `filter: blur()`, so there are no
 *   blurred surfaces to rasterize or composite.
 * - Layers are sized in % of the hero and rasterized once; the only animated
 *   property is `transform: translate3d(...)`. No layout properties, opacity,
 *   or background are touched per frame.
 * - Pure CSS: no JavaScript, no React state, no pointer tracking. Motion is
 *   disabled under `prefers-reduced-motion`, leaving the static gradients.
 */
export function AuroraBackground({
  className,
  baseColor = "var(--background)",
  intensity = "full",
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      data-intensity={intensity === "full" ? undefined : intensity}
      className={cn(
        "aurora absolute inset-0 z-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{
        backgroundColor: baseColor,
        maskImage:
          "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
      }}
    >
      <div className="aurora-layer aurora-layer-a" />
      <div className="aurora-layer aurora-layer-b" />
    </div>
  )
}