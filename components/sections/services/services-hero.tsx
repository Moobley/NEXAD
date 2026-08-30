import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { AuroraBackground } from "@/components/ui/aurora-background"

export async function ServicesHero() {
  const t = await getTranslations("servicesPage.hero")
  const systemLine = t.raw("systemLine") as string[]

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28">
      <AuroraBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <Reveal trigger="load" variant="fade" delay={0}>
          <div className="flex items-center justify-between border-b border-obsidian/10 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <p className="hidden font-mono text-[11px] tracking-[0.25em] text-muted-foreground sm:block">
              {t("coords")}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-10 md:justify-end md:px-10 md:pb-14">
        <h1 className="max-w-6xl font-sans text-[clamp(2.5rem,6.8vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          <Reveal trigger="load" variant="mask-up" delay={120} as="span" className="block">
            {t("titleLine1")}
          </Reveal>
          <Reveal trigger="load" variant="mask-up" delay={260} as="span" className="block">
            {t("titleLine2Prefix")}
            <em className="font-serif italic">{t("titleLine2Accent")}</em>
          </Reveal>
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Reveal trigger="load" variant="fade-up" delay={420}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("support")}
            </p>
          </Reveal>
          <Reveal trigger="load" variant="fade-up" delay={520}>
            <Link href="/contact" className="cta-primary">
              {t("cta")}
              <ArrowRight className="arrow size-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] border-t border-obsidian/10 px-6 py-5 md:px-10">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {systemLine.map((discipline, i) => (
            <li key={discipline} className="flex items-center gap-x-3">
              {i > 0 && (
                <ArrowRight
                  aria-hidden
                  className="size-3 shrink-0 text-obsidian/30"
                  strokeWidth={1.5}
                />
              )}
              <span>{discipline}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}