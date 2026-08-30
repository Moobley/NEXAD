import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Reveal } from "@/components/ui/reveal"

export async function CaseStudyHero() {
  const t = await getTranslations("projects.corazon.caseStudy.hero")
  const tm = await getTranslations("projects.corazon.caseStudy.meta")

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <span className="flex items-center gap-4">
              <Image
                src="/projects/corazon/logoCN.webp"
                alt={tm("client")}
                width={700}
                height={201}
                unoptimized
                className="h-5 w-auto"
              />
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
                {tm("client")}
              </span>
            </span>
            <p className="hidden font-mono text-[11px] tracking-[0.25em] text-muted-foreground sm:block">
              {tm("category")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 pb-20 pt-16 md:px-10 lg:grid-cols-12 lg:items-end lg:pb-28">
        <div className="lg:col-span-8">
          <h1 className="font-sans text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.03em]">
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

        <div className="lg:col-span-4 lg:justify-self-end">
          <Reveal trigger="load" variant="fade-up" delay={320}>
            <div className="border-t border-obsidian/10 pt-6">
              <p className="font-sans text-[clamp(4rem,9vw,7.5rem)] font-medium leading-none tracking-[-0.03em]">
                {t("resultAmount")}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("resultLabel")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}