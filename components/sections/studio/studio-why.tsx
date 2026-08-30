import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

export async function StudioWhy() {
  const t = await getTranslations("studioPage.why")
  const flow = t.raw("flow") as string[]

  return (
    <section className="surface-obsidian">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {t("index")} — {t("eyebrow")}
          </p>
        </Reveal>

        <Reveal variant="mask-up" delay={100}>
          <h2 className="mt-6 max-w-4xl font-sans text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Reveal variant="fade-up" delay={160}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("body")}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={220}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("body2")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <Flow steps={flow} surface="dark" className="mt-12 md:mt-16" />
        </Reveal>

        <Reveal variant="fade-up" delay={300}>
          <p className="mt-10 max-w-2xl font-serif text-xl italic leading-snug md:text-2xl">
            {t("closing")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}