import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { ForwardMark } from "@/components/ui/forward-mark"
import { cn } from "@/lib/utils"

export async function CaseStudyWebsite() {
  const t = await getTranslations("projects.corazon.caseStudy.website")
  const captions = t.raw("captions") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {t("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {t("body")}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={`https://${t("url")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary mt-12 inline-flex"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  {t("url")}
                </span>
                <ForwardMark className="cta-forward" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia label={captions[0]} tone="light" className="aspect-[16/10]">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)]"
                >
                  <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-obsidian/10 bg-ivory/70 px-4">
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="ml-2 h-4 flex-1 border border-obsidian/10 px-3 py-1 font-mono text-[9px] tracking-[0.15em] text-obsidian/50">
                      {t("url")}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pt-10">
                    <p className="font-serif text-3xl italic text-obsidian/45 md:text-5xl">
                      {captions[0]}
                    </p>
                  </div>
                </div>
              </CaseMedia>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-6 md:gap-8">
              {captions.slice(1, 3).map((caption, i) => (
                <Reveal key={caption} delay={160 + i * 60}>
                  <CaseMedia
                    label={caption}
                    tone="light"
                    watermark={caption}
                    className={cn("aspect-[4/5]", i === 1 && "mt-10")}
                  />
                </Reveal>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 md:gap-8">
              {captions.slice(3).map((caption, i) => (
                <Reveal key={caption} delay={200 + i * 60}>
                  <CaseMedia
                    label={caption}
                    tone={i === 0 ? "dark" : "light"}
                    watermark={caption}
                    className="aspect-[16/9]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}