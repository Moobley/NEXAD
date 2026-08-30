import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyAcquisition() {
  const t = await getTranslations("projects.corazon.caseStudy.acquisition")
  const channels = t.raw("channels") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
              <p className="mt-8 max-w-md border-t border-obsidian/10 pt-6 font-serif text-xl italic leading-snug md:text-2xl">
                {t("closing")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <CaseMedia
                label={channels.join(" · ")}
                tone="dark"
                className="aspect-[16/10]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_20%,#16161a_0%,#0b0b0d_60%)]"
                >
                  <div className="absolute inset-0 flex items-center justify-center gap-4 px-6 md:gap-8">
                    <span className="inline-flex border border-ivory/25 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/85">
                      {channels[0]}
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-ivory/40" strokeWidth={1.5} />
                    <span className="inline-flex border border-ivory/25 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/85">
                      {channels[1]}
                    </span>
                  </div>
                </div>
              </CaseMedia>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}