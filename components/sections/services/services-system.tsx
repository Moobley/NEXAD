import { getTranslations } from "next-intl/server"
import { ArrowDown, ArrowRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"

type Example = {
  marker: string
  label: string
  objective: string
  flow: string[]
  support: string
}

export async function ServicesSystem() {
  const t = await getTranslations("servicesPage.system")
  const examples = t.raw("examples") as Example[]

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
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("support")}
            </p>
          </header>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-20 lg:gap-20">
          {examples.map((example, i) => (
            <Reveal key={example.marker} variant="fade-up" delay={i * 80}>
              <article className="grid gap-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                  <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {example.marker} — {example.label}
                  </p>
                  <h3 className="mt-4 max-w-sm font-sans text-3xl font-medium tracking-tight md:text-4xl">
                    {example.objective}
                  </h3>
                </div>

                <div className="lg:col-span-8">
                  <ol className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-y-4">
                    {example.flow.map((step, j) => (
                      <li key={step} className="flex items-center gap-x-2">
                        {j > 0 && (
                          <ArrowDown
                            aria-hidden
                            className="size-4 shrink-0 self-center text-muted-foreground lg:hidden"
                            strokeWidth={1.5}
                          />
                        )}
                        {j > 0 && (
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

                  <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {example.support}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}