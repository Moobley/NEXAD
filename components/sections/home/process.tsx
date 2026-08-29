import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/ui/reveal"

export async function Process() {
  const t = await getTranslations("home.process")
  const steps = t.raw("steps") as { title: string; description: string }[]

  return (
    <section className="border-t border-obsidian/10">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t("index")}
                </p>
                <h2 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-6xl">
                  {t("title")}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-obsidian/10">
              {steps.map((step, i) => (
                <li key={i} className="border-b border-obsidian/10 py-10 md:py-12">
                  <Reveal variant="fade-up">
                    <div className="flex gap-7">
                      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-sans text-2xl font-medium tracking-tight md:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}