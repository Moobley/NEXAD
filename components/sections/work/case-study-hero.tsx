import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudyHero() {
  const t = await getTranslations("projects.corazon.caseStudy.hero")
  const tm = await getTranslations("projects.corazon.caseStudy.meta")

  return (
    <section className="pt-24 md:pt-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {tm("client")}
            </span>
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
              {tm("category")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-16 md:px-10 lg:pb-28">
        <h1 className="max-w-4xl font-sans text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" as="span" className="block">
            {t("titleA")}{" "}
            <em className="font-serif italic">{t("titleB")}</em>
          </Reveal>
        </h1>
        <Reveal trigger="load" variant="fade-up" delay={200}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("support")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
