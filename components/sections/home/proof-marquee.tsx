import { getTranslations } from "next-intl/server"

import { SignalDot } from "@/components/ui/signal-dot"

const REPEATS = 4

/**
 * Thin mono proof strip under the header — the single real, approved result
 * (+49,1% average revenue · Corazón Napoletano) scrolling horizontally
 * in the same register as the capabilities marquee. Decorative teaser: the
 * same figure is rendered as text in the Corazón section, so this strip is
 * aria-hidden.
 */
export async function ProofMarquee() {
  const tc = await getTranslations("projects.corazon")

  const result = tc("resultAmount")
  const resultLabel = tc("resultLabel")
  const client = tc("title")

  return (
    <div aria-hidden className="marquee marquee-slow select-none border-b border-obsidian/10">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group">
            {Array.from({ length: REPEATS }, (_, i) => (
              <span key={i} className="marquee-item">
                <span>
                  <span className="text-signal">{result}</span>{" "}
                  {resultLabel} — {client}
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
