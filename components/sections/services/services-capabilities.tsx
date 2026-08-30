import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

type Capability = {
  title: string
  line: string
  description: string
  items: string[]
  note?: string
  principle?: string
}

export async function ServicesCapabilities() {
  const t = await getTranslations("servicesPage.capabilities")
  const list = t.raw("list") as Capability[]

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

        <ol className="mt-16 border-t border-obsidian/10 md:mt-20">
          {list.map((cap, i) => (
            <li key={cap.title} className="border-b border-obsidian/10 py-12 md:py-16">
              <Reveal variant="fade-up">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <h3 className="font-sans text-2xl font-medium tracking-tight md:text-[1.75rem]">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="mt-4 pl-[2.4rem] font-serif text-[1.3rem] italic leading-snug text-foreground md:text-[1.5rem]">
                      {cap.line}
                    </p>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {cap.description}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 font-mono text-xs tracking-[0.04em] text-foreground/80"
                        >
                          <span aria-hidden className="text-muted-foreground">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {cap.note && (
                      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {cap.note}
                      </p>
                    )}
                    {cap.principle && (
                      <p className="mt-6 border-t border-obsidian/10 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="text-foreground">{t("principleLabel")} — </span>
                        {cap.principle}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}