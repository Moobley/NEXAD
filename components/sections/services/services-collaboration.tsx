import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function ServicesCollaboration() {
  const t = await getTranslations("servicesPage.collaboration")

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
          </header>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-0">
          <Reveal>
            <article className="border-t border-obsidian/10 pt-8 md:border-r md:pr-12 lg:pr-16">
              <h3 className="font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {t("project.title")}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("project.body")}
              </p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="border-t border-obsidian/10 pt-8 md:pl-12 lg:pl-16">
              <h3 className="font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {t("continuous.title")}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("continuous.body")}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}