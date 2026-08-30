import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function StudioApproach() {
  const t = await getTranslations("studioPage.approach")

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
              {t("body")}
            </p>
          </header>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-0">
          <Reveal>
            <article className="border-t border-obsidian/10 pt-8 md:border-r md:pr-12 lg:pr-16">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                {t("new.marker")} · {t("new.label")}
              </p>
              <h3 className="mt-4 max-w-md font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {t("new.title")}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("new.body")}
              </p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="border-t border-obsidian/10 pt-8 md:pl-12 lg:pl-16">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                {t("existing.marker")} · {t("existing.label")}
              </p>
              <h3 className="mt-4 max-w-md font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {t("existing.title")}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("existing.body")}
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-16 max-w-2xl border-t border-obsidian/10 pt-8 font-serif text-2xl italic leading-snug md:mt-20 md:text-3xl">
            {t("closing")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}