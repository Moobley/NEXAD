import { getTranslations } from "next-intl/server"
import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"

export async function CaseStudyWebsite() {
  const t = await getTranslations("projects.corazon.caseStudy.website")
  const tl = await getTranslations("projects.corazon.caseStudy.labels")

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
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={t("captions.hero")}
                note={tl("mediaNote")}
                tone="light"
                className="aspect-[16/10]"
              />
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <Reveal delay={160}>
                <CaseMedia
                  label={t("captions.menu")}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[4/5]"
                />
              </Reveal>
              <Reveal delay={220}>
                <CaseMedia
                  label={t("captions.product")}
                  note={tl("mediaNote")}
                  tone="light"
                  className="aspect-[4/5] mt-10"
                />
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal delay={120}>
            <CaseMedia
              label={t("captions.booking")}
              note={tl("mediaNote")}
              tone="dark"
              className="aspect-[16/9]"
            />
          </Reveal>
          <Reveal delay={200}>
            <CaseMedia
              label={t("captions.mobile")}
              note={tl("mediaNote")}
              tone="light"
              className="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}