import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"

export async function StudioHero() {
  const t = await getTranslations("studioPage.hero")

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <AuroraBackground intensity="soft" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
              {t("location")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-12 pt-8 md:px-10 md:pb-28 md:pt-16">
        <h1 className="max-w-5xl font-sans text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block">
            <em className="font-serif italic">{t("titleLine2")}</em>
          </Reveal>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <Reveal trigger="load" variant="fade-up" delay={380}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("support")}
            </p>
          </Reveal>
          <Reveal trigger="load" variant="fade-up" delay={480}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link href="/studio#principios" className="cta-primary">
                {t("ctaPrimary")}
                <ArrowRight className="arrow size-4" strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className="cta-secondary">
                {t("ctaSecondary")}
                <ArrowRight className="arrow size-4" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}