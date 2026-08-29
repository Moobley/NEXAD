import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"

export async function FinalCta() {
  const t = await getTranslations("home.cta")

  return (
    <section className="surface-obsidian border-t border-ivory/10">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-48">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("index")}
          </p>
        </Reveal>
        <Reveal variant="mask-up" delay={100}>
          <h2 className="mx-auto mt-8 max-w-4xl font-sans text-[clamp(2.2rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            {t("titlePrefix")}
            <em className="font-serif italic">{t("titleAccent")}</em>
            {t("titleSuffix")}
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={240}>
          <Link href="/contact" className="cta-primary mt-14">
            {t("action")}
            <ArrowRight className="arrow size-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}