import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Reveal } from "@/components/ui/reveal"
import { ForwardMark } from "@/components/ui/forward-mark"

export async function StudioCta() {
  const t = await getTranslations("studioPage.cta")

  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-48">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("index")}
          </p>
        </Reveal>
        <Reveal variant="mask-up" delay={100}>
          <h2 className="mx-auto mt-8 max-w-4xl font-sans text-[clamp(2.2rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            {t("titleLine1")}
            <em className="font-serif italic">{t("titleAccent")}</em>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("support")}
          </p>
        </Reveal>
        <Reveal variant="fade-up" delay={280}>
          <Link href="/contact" className="cta-primary mt-14">
            {t("action")}
            <ForwardMark className="cta-forward" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}