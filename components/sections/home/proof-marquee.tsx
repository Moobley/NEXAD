import { getTranslations } from "next-intl/server"

import { SignalDot } from "@/components/ui/signal-dot"

/**
 * Thin mono proof strip under the header — a rotating set of short, hard
 * claims scrolling in the same register as the capabilities marquee. The
 * first line's leading figure is proof-led and rendered in Signal; the client
 * is deliberately not named (the client gets its due inside its own section).
 * Decorative teaser: aria-hidden.
 */
export async function ProofMarquee() {
  const t = await getTranslations("home.proofMarquee")
  const lines = t.raw("lines") as string[]

  const [lead, ...rest] = (lines[0] ?? "").split(" ")
  const firstTail = rest.join(" ")

  return (
    <div
      aria-hidden
      className="marquee marquee-slow relative z-10 select-none border-b border-obsidian/10"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group">
            {lines.map((line, i) => (
              <span key={i} className="marquee-item">
                <span>
                  {i === 0 ? (
                    <>
                      <span className="text-signal">{lead}</span> {firstTail}
                    </>
                  ) : (
                    line
                  )}
                </span>
                <SignalDot size="sm" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
