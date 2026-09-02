import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function StudioNetwork() {
  const t = await getTranslations("studioPage.network")
  const examples = t.raw("examples") as string[]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-5xl">
                  {t("title")}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("body")}
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
                {examples.join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}