import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"
import { Flow } from "@/components/ui/flow"

export async function CaseStudyApproach() {
  const tc = await getTranslations("projects.corazon.caseStudy.context")
  const ts = await getTranslations("projects.corazon.caseStudy.system")
  const flow = ts.raw("flow") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {tc("eyebrow")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="mask-up">
              <h2 className="font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                {tc("heading")}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Reveal variant="fade-up" delay={120}>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {tc("body")}
                </p>
              </Reveal>
              <Reveal variant="fade-up" delay={180}>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {tc("body2")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-obsidian/10 pt-10 md:mt-20 md:pt-12">
          <Reveal>
            <p className="max-w-2xl font-serif text-xl italic leading-snug md:text-2xl">
              {ts("title")}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {ts("support")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Flow steps={flow} className="mt-8 md:mt-10" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
