import { getTranslations } from "next-intl/server"
import { ArrowDown, ArrowRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"

export async function StudioMetrics() {
  const t = await getTranslations("studioPage.metrics")
  const flow = t.raw("flow") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <header className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("index")} — {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("body2")}
            </p>
          </header>
        </Reveal>

        <Reveal delay={140} className="mt-16 md:mt-20">
          <ol className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-y-4">
            {flow.map((step, i) => (
              <li key={step} className="flex items-center gap-x-2">
                {i > 0 && (
                  <ArrowDown
                    aria-hidden
                    className="size-4 shrink-0 self-center text-muted-foreground lg:hidden"
                    strokeWidth={1.5}
                  />
                )}
                {i > 0 && (
                  <ArrowRight
                    aria-hidden
                    className="hidden size-4 shrink-0 self-center text-muted-foreground lg:inline"
                    strokeWidth={1.5}
                  />
                )}
                <span className="inline-flex border border-obsidian/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal variant="fade-up" delay={220}>
          <p className="mt-12 max-w-2xl border-t border-obsidian/10 pt-8 font-serif text-2xl italic leading-snug md:text-3xl">
            {t("closing")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}