import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { SignalDot } from "@/components/ui/signal-dot"

type Capability = {
  title: string
  body: string
  tags: string
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
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <SignalDot size="sm" />
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

        <ol className="mt-12 border-t border-obsidian/10 md:mt-16">
          {list.map((cap) => (
            <li key={cap.title} className="border-b border-obsidian/10 py-8 last:border-b-0 md:py-10">
              <Reveal variant="fade-up">
                <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-4">
                    <h3 className="font-sans text-2xl font-medium tracking-tight md:text-[1.75rem]">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                      {cap.body}
                    </p>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/70">
                      {cap.tags}
                    </p>
                    {cap.note && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {cap.note}
                      </p>
                    )}
                    {cap.principle && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        <span className="text-foreground/70">{t("principleLabel")} — </span>
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