import { cn } from "@/lib/utils"

/**
 * Decorative UI-inspired compositions used as editorial media surfaces for
 * NEXO Lab projects. All content is `aria-hidden` and purely illustrative —
 * never real data, never performance metrics.
 */

/** Time-slot schedule abstraction (dark). */
export function ScheduleUi() {
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00"]
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_20%,#16161a_0%,#0b0b0d_60%)]"
    >
      <div className="absolute inset-x-6 bottom-12 top-6 space-y-2">
        {times.map((time, i) => (
          <div key={time} className="flex items-center gap-4">
            <span className="w-11 font-mono text-[10px] tracking-[0.1em] text-ivory/45">
              {time}
            </span>
            <span
              className={cn(
                "h-6 flex-1 border border-ivory/15",
                i === 1 || i === 3 ? "bg-ivory/20" : "bg-ivory/5"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Booking flow rows abstraction (light). */
export function BookingFlowUi({ labels }: { labels: string[] }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)]"
    >
      <div className="absolute inset-x-6 bottom-12 top-6 flex flex-col gap-3">
        {labels.map((label, i) => (
          <div
            key={label}
            className="flex flex-1 items-center justify-between border border-obsidian/15 px-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-obsidian/60">
              {label}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-obsidian/35">
              0{i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Admin dashboard blocks abstraction (dark). */
export function DashboardUi({ blocks }: { blocks: string[] }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_20%,#16161a_0%,#0b0b0d_60%)]"
    >
      <div className="absolute inset-x-6 bottom-12 top-6 grid grid-cols-2 gap-3">
        {blocks.map((block, i) => (
          <div
            key={block}
            className={cn(
              "flex items-center justify-center border border-ivory/15 px-2 text-center",
              i === 0 && "col-span-2"
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60">
              {block}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}