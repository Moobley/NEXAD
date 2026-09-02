import { cn } from "@/lib/utils"

import type { ProjectTone } from "@/content/projects"

const fields: Record<ProjectTone, string> = {
  carbon: "radial-gradient(120% 120% at 18% 0%, #16171a 0%, #0b0c0d 55%)",
  graphite: "radial-gradient(130% 130% at 70% 0%, #2e3033 0%, #0b0c0d 62%)",
}

type ProjectVisualProps = {
  label: string
  tone?: ProjectTone
  /** Surface the visual sits on, to pick a legible border. */
  surface?: "light" | "dark"
  className?: string
}

/**
 * Art-directed placeholder visual. Typography + geometry + subtle grain,
 * never pretending to be real project imagery. Swap for a real screenshot
 * (e.g. <Image>) without touching section layouts.
 */
export function ProjectVisual({
  label,
  tone = "carbon",
  surface = "dark",
  className,
}: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden border",
        surface === "dark" ? "border-ivory/10" : "border-obsidian/15",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: fields[tone] }} />
      <div className="noise absolute inset-0 opacity-[0.18]" />

      <div className="absolute left-6 top-6 h-8 w-px bg-ivory/25" />
      <div className="absolute bottom-6 left-6 h-px w-8 bg-ivory/25" />

      <span className="absolute bottom-6 left-6 font-sans text-xl font-medium tracking-tight text-ivory/85 md:text-2xl">
        {label}
      </span>
    </div>
  )
}