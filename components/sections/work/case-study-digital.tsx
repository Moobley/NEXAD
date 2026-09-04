import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { CaseMedia } from "@/components/ui/case-media"
import { ForwardMark } from "@/components/ui/forward-mark"

export async function CaseStudyDigital() {
  const tw = await getTranslations("projects.corazon.caseStudy.website")
  const ta = await getTranslations("projects.corazon.caseStudy.acquisition")
  const channels = ta.raw("channels") as string[]
  const captions = tw.raw("captions") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-sans text-4xl font-medium tracking-tight md:text-6xl">
                {tw("heading")}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                {tw("body")}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={`https://${tw("url")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary mt-10 inline-flex"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  {tw("url")}
                </span>
                <ForwardMark className="cta-forward" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CaseMedia
                label={captions[0]}
                tone="light"
                className="aspect-[16/10]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(130%_130%_at_70%_15%,#e7e3d6_0%,#f2efe8_48%,#d8d2c3_100%)]"
                >
                  <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-obsidian/10 bg-ivory/70 px-4">
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="h-2 w-2 rounded-full bg-obsidian/20" />
                    <span className="ml-2 h-4 flex-1 border border-obsidian/10 px-3 py-1 font-mono text-[9px] tracking-[0.15em] text-obsidian/50">
                      {tw("url")}
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

            <Reveal delay={160}>
              <CaseMedia
                label={captions[1]}
                tone="light"
                watermark={captions[1]}
                className="mt-6 aspect-[3/4] max-w-sm"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-t border-obsidian/10 pt-12 md:mt-28 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {ta("eyebrow")}
                </p>
                <h3 className="mt-3 font-sans text-3xl font-medium tracking-tight md:text-4xl">
                  {ta("heading")}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                  {ta("body")}
                </p>
                <p className="mt-8 max-w-md font-serif text-xl italic leading-snug md:text-2xl">
                  {ta("closing")}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:self-end">
              <Reveal delay={120}>
                <div className="flex flex-wrap items-center gap-3">
                  {channels.map((channel) => (
                    <span
                      key={channel}
                      className="inline-flex border border-obsidian/15 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
