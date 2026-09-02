import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

type Example = {
  label: string
  flow: string[]
  note?: string
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
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("support")}
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-14 md:mt-16 lg:gap-20">
          {examples.map((example, i) => (
            <Reveal key={example.label} variant="fade-up" delay={i * 80}>
              <article>
                <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                  {example.label}
                </p>
                <Flow steps={example.flow} className="mt-5" />
                {example.note && (
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {example.note}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}