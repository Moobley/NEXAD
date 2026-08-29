import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function GranCanaria() {
  const t = await getTranslations("home.granCanaria")

  return (
    <section className="border-t border-obsidian/10">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("index")}
              </p>
            </Reveal>
            <Reveal variant="mask-up" delay={100}>
              <p className="mt-10 font-mono text-[clamp(2rem,6vw,5rem)] tracking-[0.04em] text-foreground">
                {t("coordsLine1")}
                <br />
                {t("coordsLine2")}
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={200}>
              <p className="mt-10 font-sans text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                {t("line1")}
                <br />
                {t("line2")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="fade-up" delay={260}>
              <div className="relative aspect-[4/5] overflow-hidden border border-obsidian/15 bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)]">
                <div className="noise absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-obsidian/25 to-transparent" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-obsidian/10" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-obsidian/60">
                    {t("fieldLabel")}
                  </p>
                  <span className="h-px w-10 bg-obsidian/30" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}