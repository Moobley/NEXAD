import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function StudioOrigin() {
  const t = await getTranslations("studioPage.origin")

  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-44">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("index")} — {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-10 max-w-5xl font-sans text-[clamp(2rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          <Reveal variant="mask-up">
            <span className="block">{t("line1")}</span>
          </Reveal>
          <Reveal variant="mask-up" delay={140}>
            <span className="block">
              <em className="font-serif italic">{t("accent")}</em>
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal variant="fade-up" delay={200}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("body")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={260}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("body2")}
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade-up" delay={320}>
          <p className="mt-14 max-w-xl font-serif text-2xl italic leading-snug md:text-3xl">
            {t("closing")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}