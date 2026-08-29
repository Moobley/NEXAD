import { type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface AuroraBlob {
  /** Blob color. Use soft, low-saturation pastels. */
  color: string
  /** Center position, in % of the container (0–100). */
  x: number
  y: number
  /** Blob diameter in px. Large sizes read as soft washes of light. */
  size: number
  opacity?: number
  /** Animation cycle duration in seconds. Shorter = more visible motion. */
  driftDuration?: number
  /** Negative delay to desynchronise blobs at load. */
  driftDelay?: number
}

interface AuroraBackgroundProps {
  className?: string
  /** Base canvas colour. Defaults to the page's own ivory background token. */
  baseColor?: string
  /** Blob composition. Override to re-tune colours, sizes, positions. */
  blobs?: AuroraBlob[]
  /** Blur applied to each blob, in px. 60–100 keeps Firefox cheap. */
  blur?: number
}

const DEFAULT_BLOBS: AuroraBlob[] = [
  {
    color: "#c8d6f0",
    x: 18,
    y: 22,
    size: 820,
    opacity: 0.6,
    driftDuration: 14,
    driftDelay: 0,
  },
  {
    color: "#c3e2e4",
    x: 82,
    y: 26,
    size: 800,
    opacity: 0.55,
    driftDuration: 18,
    driftDelay: -5,
  },
  {
    color: "#d8d0ee",
    x: 22,
    y: 76,
    size: 860,
    opacity: 0.6,
    driftDuration: 16,
    driftDelay: -9,
  },
  {
    color: "#f1ddd6",
    x: 80,
    y: 74,
    size: 720,
    opacity: 0.42,
    driftDuration: 21,
    driftDelay: -3,
  },
]

/**
 * Soft, light aurora background: large blurred pastel blobs visibly traveling
 * over the page's ivory canvas. Pure CSS — no JavaScript, no pointer tracking.
 *
 * Performance model:
 * - The gradient + `filter: blur()` lives on a static "paint" layer that is
 *   rasterized once. Motion happens on the unfiltered wrapper above it using
 *   `transform: translate3d(...) scale(...) rotate(...)` only, so the blur is
 *   never re-run.
 * - Each blob follows its own multi-step keyframe path with a different
 *   duration and delay, so the motion is organic and never synchronized.
 *   Disabled entirely under `prefers-reduced-motion`.
 */
export function AuroraBackground({
  className,
  baseColor = "var(--background)",
  blobs = DEFAULT_BLOBS,
  blur = 80,
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "aurora absolute inset-0 z-0 overflow-hidden pointer-events-none",
        className
      )}
      style={
        {
          backgroundColor: baseColor,
          "--aurora-blur": `${blur}px`,
        } as CSSProperties
      }
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={cn("aurora-blob", `aurora-blob-${i + 1}`)}
          style={
            {
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              marginLeft: `${-blob.size / 2}px`,
              marginTop: `${-blob.size / 2}px`,
              "--blob-color": blob.color,
              "--blob-opacity": String(blob.opacity ?? 0.6),
              "--blob-dur": `${blob.driftDuration ?? 16}s`,
              "--blob-del": `${blob.driftDelay ?? 0}s`,
            } as CSSProperties
          }
        >
          <div className="aurora-blob-paint" />
        </div>
      ))}
      <div className="aurora-noise" />
    </div>
  )
}